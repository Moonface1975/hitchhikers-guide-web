// Builds app/world-data.ts from the preserved ZIL source under source/.
// This only powers the optional Guided-mode navigation hints; the canonical
// game logic lives entirely in the original story file and is untouched.
import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const sourceDir = new URL("../source/", import.meta.url);
const outputFile = new URL("../app/world-data.ts", import.meta.url);
const sourcePath = fileURLToPath(sourceDir);
const directionPattern = "NORTHEAST|NORTHWEST|SOUTHEAST|SOUTHWEST|NORTH|SOUTH|EAST|WEST|NE|NW|SE|SW|UP|DOWN|IN|OUT|LAND";

const files = (await readdir(sourcePath)).filter((name) => name.endsWith(".zil")).sort();

const stripLineComments = (text) => text.split(/\r?\n/).map((line) => {
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"' && line[index - 1] !== "\\") quoted = !quoted;
    if (character === ";" && !quoted) return line.slice(0, index);
  }
  return line;
}).join("\n");

const parserWords = (body, property) => {
  const raw = new RegExp(`\\(${property}\\s+([^)]+)\\)`).exec(body)?.[1] ?? "";
  return raw.split(/\s+/)
    .map((word) => word.replace(/\\'/g, "'").toLowerCase())
    .filter((word) => /^[a-z0-9][a-z0-9'-]*$/.test(word));
};

const sourceFiles = await Promise.all(files.map(async (file) => ({
  file,
  source: stripLineComments(await readFile(join(sourcePath, file), "utf8")),
})));
const allSource = sourceFiles.map(({ source }) => source).join("\n\n");

const routineBodies = new Map();
for (const match of allSource.matchAll(/<ROUTINE\s+([A-Z0-9-]+)([\s\S]*?)(?=\r?\n\r?\n<(?:ROUTINE|OBJECT|ROOM|GLOBAL|CONSTANT|SYNTAX|VERB|DIRECTIONS)\b|$)/g)) {
  routineBodies.set(match[1], match[2]);
}

const rooms = [];
const objects = [];

for (const { source } of sourceFiles) {
  const roomPattern = /<ROOM\s+([A-Z0-9-]+)([\s\S]*?)>\r?\n(?=\r?\n|\f|$)/g;
  for (const match of source.matchAll(roomPattern)) {
    const [, id, body] = match;
    const name = /\(DESC\s+"([^"]+)"\)/.exec(body)?.[1];
    if (!name || id === "DARK") continue; // pseudo-room used while the light is out, not a real location

    const exits = {};
    const exitPattern = new RegExp(`\\((${directionPattern})\\s+TO\\s+([A-Z0-9-]+)`, "g");
    for (const exit of body.matchAll(exitPattern)) exits[exit[1]] = exit[2];

    const perPattern = new RegExp(`\\((${directionPattern})\\s+PER\\s+([A-Z0-9-]+)`, "g");
    const perExits = [...body.matchAll(perPattern)].map((exit) => ({ direction: exit[1], routine: exit[2] }));

    const globals = /\(GLOBAL\s+([^)]+)\)/.exec(body)?.[1]
      .split(/\s+/)
      .filter((word) => /^[A-Z][A-Z0-9-]*$/.test(word)) ?? [];

    rooms.push({ id, name, exits, perExits, globals });
  }

  const objectPattern = /<OBJECT\s+([A-Z0-9-]+)([\s\S]*?)>\r?\n(?=\r?\n|\f|$)/g;
  for (const match of source.matchAll(objectPattern)) {
    const [, id, body] = match;
    const name = /\(DESC\s+"([^"]+)"\)/.exec(body)?.[1];
    if (!name || name === "it" || name.length < 2) continue;
    const action = /\(ACTION\s+([A-Z0-9-]+)\)/.exec(body)?.[1] ?? null;
    if (action === "GLOBAL-ROOM-F") continue; // pseudo-object standing in for the room itself
    const initialLocation = /\(LOC\s+([A-Z0-9-]+)\)/.exec(body)?.[1] ?? null;
    const flags = /\(FLAGS\s+([^)]+)\)/.exec(body)?.[1].trim().split(/\s+/).filter(Boolean) ?? [];
    const synonyms = parserWords(body, "SYNONYM");
    const adjectives = parserWords(body, "ADJECTIVE");
    objects.push({ id, name, initialLocation, flags, synonyms, adjectives, action });
  }
}

// Resolve a PER-routine exit to a destination room when the routine body
// names exactly one known room id — good enough for a navigation hint;
// ambiguous or stateful exits (locked doors, mazes) are left unresolved
// and simply submit the direction word without a preview.
const roomIds = new Set(rooms.map((room) => room.id));
const resolvedDestination = (routine) => {
  const body = routineBodies.get(routine) ?? "";
  const candidates = [...body.matchAll(/,([A-Z][A-Z0-9-]+)/g)]
    .map((match) => match[1])
    .filter((id) => roomIds.has(id));
  const unique = [...new Set(candidates)];
  return unique.length === 1 ? unique[0] : null;
};

const commandNounFor = (name, synonyms) => {
  const displayWords = name.toLowerCase().match(/[a-z0-9']+/g) ?? [];
  const candidates = synonyms.flatMap((synonym) => {
    const displayWord = displayWords.find((word) => word === synonym || word.startsWith(synonym));
    return displayWord ? [displayWord] : [];
  });
  return [...new Set(candidates)].sort((a, b) => b.length - a.length)[0]
    ?? synonyms.sort((a, b) => b.length - a.length)[0]
    ?? name.toLowerCase();
};

const objectsById = new Map(objects.map((object) => [object.id, object]));

const normalizedRooms = rooms
  .map((room) => {
    const exits = {};
    for (const [direction, targetId] of Object.entries(room.exits)) {
      exits[direction] = { targetId, target: objectsById.get(targetId)?.name ?? rooms.find((r) => r.id === targetId)?.name ?? null };
    }
    for (const { direction, routine } of room.perExits) {
      if (exits[direction]) continue;
      const targetId = resolvedDestination(routine);
      exits[direction] = { targetId, target: targetId ? rooms.find((r) => r.id === targetId)?.name ?? null : null };
    }
    const notableIds = new Set([
      ...objects.filter((object) => object.initialLocation === room.id).map((object) => object.id),
      ...room.globals.filter((id) => objectsById.has(id)),
    ]);
    const seenNames = new Set();
    const notableObjects = [...notableIds]
      .map((id) => objectsById.get(id))
      .filter((object) => object && !object.flags.includes("INVISIBLE"))
      .filter((object) => {
        const key = object.name.toLowerCase();
        if (seenNames.has(key)) return false;
        seenNames.add(key);
        return true;
      })
      .map((object) => ({ id: object.id, name: object.name, commandNoun: commandNounFor(object.name, object.synonyms) }));
    return { id: room.id, name: room.name, exits, notableObjects };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const output = `// Generated from the preserved ZIL source by scripts/extract-world.mjs.\n` +
  `// Do not edit by hand; the original story file remains the sole source of truth for gameplay.\n\n` +
  `export type WorldExit = { targetId: string | null; target: string | null };\n` +
  `export type WorldNotableObject = { id: string; name: string; commandNoun: string };\n` +
  `export type WorldRoom = { id: string; name: string; exits: Record<string, WorldExit>; notableObjects: WorldNotableObject[] };\n\n` +
  `export const WORLD_ROOMS: WorldRoom[] = ${JSON.stringify(normalizedRooms, null, 2)};\n`;

await writeFile(outputFile, output, "utf8");
console.log(`Extracted ${normalizedRooms.length} named rooms from ${files.length} source files to ${fileURLToPath(outputFile)}`);
