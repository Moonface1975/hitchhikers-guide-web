"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { WORLD_ROOMS, type WorldRoom } from "./world-data";

const BRIDGE_CHANNEL = "hhgg:bridge";
const SHARE_URL = "https://example.invalid/"; // filled in once the edition is actually deployed

type Phase = "cover" | "brief" | "game";
type Mode = "classic" | "guided";
type InputKind = "line" | "char";

const DIRECTION_LABELS: Record<string, string> = {
  NORTH: "North", NORTHEAST: "Northeast", NE: "Northeast", EAST: "East",
  SOUTHEAST: "Southeast", SE: "Southeast", SOUTH: "South", SOUTHWEST: "Southwest",
  SW: "Southwest", WEST: "West", NORTHWEST: "Northwest", NW: "Northwest",
  UP: "Up", DOWN: "Down", IN: "In", OUT: "Out", LAND: "Land",
};
const DIRECTION_ARROWS: Record<string, string> = {
  NORTH: "↑", NE: "↗", NORTHEAST: "↗", EAST: "→", SE: "↘", SOUTHEAST: "↘",
  SOUTH: "↓", SW: "↙", SOUTHWEST: "↙", WEST: "←", NW: "↖", NORTHWEST: "↖",
  UP: "⤒", DOWN: "⤓", IN: "↳", OUT: "↰", LAND: "⛁",
};
const DIRECTION_ORDER = ["NORTH", "NORTHEAST", "NE", "EAST", "SOUTHEAST", "SE", "SOUTH", "SOUTHWEST", "SW", "WEST", "NORTHWEST", "NW", "UP", "DOWN", "IN", "OUT", "LAND"];

const ROOMS_BY_NAME = new Map(WORLD_ROOMS.map((room) => [room.name.toLowerCase(), room]));

const detectRoom = (statusText: string): WorldRoom | null => {
  const label = statusText
    .split("\n")
    .map((line) => line.trim())
    .find(Boolean)
    ?.split(/\s{2,}|\t/)[0]
    ?.trim()
    .toLowerCase();
  if (!label) return null;
  return (
    ROOMS_BY_NAME.get(label) ??
    WORLD_ROOMS.find((room) => label.startsWith(room.name.toLowerCase())) ??
    WORLD_ROOMS.find((room) => room.name.toLowerCase().startsWith(label)) ??
    null
  );
};

export default function GuideEdition() {
  const [phase, setPhase] = useState<Phase>("cover");
  const [mode, setMode] = useState<Mode>("guided");
  const [playerReady, setPlayerReady] = useState(false);
  const [acceptsInput, setAcceptsInput] = useState(false);
  const [inputKind, setInputKind] = useState<InputKind>("line");
  const [statusText, setStatusText] = useState("");
  const [room, setRoom] = useState<WorldRoom | null>(null);
  const [commandValue, setCommandValue] = useState("");
  const [helpOpen, setHelpOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const commandInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const savedMode = localStorage.getItem("hhgg:mode");
      if (savedMode === "classic" || savedMode === "guided") setMode(savedMode);
      setReduceMotion(localStorage.getItem("hhgg:reduce-motion") === "true");
      setHighContrast(localStorage.getItem("hhgg:contrast") === "true");
    } catch {
      /* localStorage may be unavailable; defaults are fine */
    }
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data;
      if (!data || data.channel !== BRIDGE_CHANNEL) return;
      if (data.type === "ready") {
        setPlayerReady(true);
        return;
      }
      if (data.type === "transcript") {
        const nextStatus = typeof data.statusText === "string" ? data.statusText : "";
        setStatusText(nextStatus);
        setRoom(detectRoom(nextStatus));
        setInputKind(data.inputKind === "char" ? "char" : "line");
        setAcceptsInput(Boolean(data.acceptsInput));
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    if (!playerReady) return;
    iframeRef.current?.contentWindow?.postMessage(
      { channel: BRIDGE_CHANNEL, type: "preferences", readingMode: "serif", highContrast, reduceMotion },
      window.location.origin,
    );
  }, [playerReady, highContrast, reduceMotion]);

  const postCommand = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || !iframeRef.current?.contentWindow) return;
    setAcceptsInput(false);
    iframeRef.current.contentWindow.postMessage({ channel: BRIDGE_CHANNEL, type: "command", command: trimmed }, window.location.origin);
    setCommandValue("");
    window.setTimeout(() => commandInputRef.current?.focus(), 120);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    postCommand(commandValue);
  };

  const draftCommand = (value: string) => {
    setCommandValue(value);
    commandInputRef.current?.focus();
  };

  const beginGame = (chosenMode: Mode) => {
    setMode(chosenMode);
    try {
      localStorage.setItem("hhgg:mode", chosenMode);
    } catch {
      /* optional */
    }
    setPhase("game");
  };

  const exits = useMemo(() => {
    if (!room) return [];
    return DIRECTION_ORDER.filter((direction) => room.exits[direction]).map((direction) => ({
      direction,
      label: DIRECTION_LABELS[direction] ?? direction,
      arrow: DIRECTION_ARROWS[direction] ?? "•",
      command: direction.toLowerCase(),
    }));
  }, [room]);

  return (
    <main className={`edition${reduceMotion ? " reduce-motion" : ""}${highContrast ? " high-contrast" : ""}`}>
      {phase === "cover" && <CoverScreen onContinue={() => setPhase("brief")} />}
      {phase === "brief" && <BriefScreen mode={mode} onBegin={beginGame} onBack={() => setPhase("cover")} />}

      {phase === "game" && (
        <div className="game-shell">
          <header className="game-header">
            <div className="game-header-title">
              <span className="wordmark">THE HITCHHIKER&rsquo;S GUIDE TO THE GALAXY</span>
              <span className="wordmark-sub">Solid Gold Edition &middot; {mode === "classic" ? "Classic" : "Guided"} mode</span>
            </div>
            <div className="game-header-actions">
              <button type="button" onClick={() => setMode((current) => (current === "classic" ? "guided" : "classic"))}>
                Switch to {mode === "classic" ? "Guided" : "Classic"}
              </button>
              <button type="button" onClick={() => setHelpOpen(true)}>Help</button>
              <button type="button" onClick={() => setAboutOpen(true)}>About</button>
            </div>
          </header>

          <div className={`game-body${mode === "guided" ? " with-sidebar" : ""}`}>
            <div className="story-frame-wrap">
              <iframe
                ref={iframeRef}
                className="story-frame"
                src="/player.html"
                title="The Hitchhiker's Guide to the Galaxy — original story player"
                sandbox="allow-scripts allow-same-origin allow-downloads allow-modals"
              />
            </div>

            {mode === "guided" && (
              <aside className="guided-sidebar">
                <section className="sidebar-section">
                  <h2>Where you are</h2>
                  <p className="current-room">{room?.name ?? (playerReady ? "Reading the signal…" : "Receiving…")}</p>
                </section>

                <section className="sidebar-section">
                  <h2>Exits</h2>
                  {exits.length ? (
                    <div className="exit-grid">
                      {exits.map((exit) => (
                        <button
                          key={exit.direction}
                          type="button"
                          className="exit-button"
                          disabled={!acceptsInput}
                          onClick={() => postCommand(exit.command)}
                          title={room?.exits[exit.direction]?.target ?? undefined}
                        >
                          <span className="exit-arrow" aria-hidden="true">{exit.arrow}</span>
                          <span>{exit.label}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="sidebar-note">No obvious exits catalogued for this spot &mdash; try a direction anyway, or LOOK.</p>
                  )}
                </section>

                <section className="sidebar-section">
                  <h2>Worth a look</h2>
                  {room?.notableObjects.length ? (
                    <div className="chip-row">
                      {room.notableObjects.slice(0, 10).map((object) => (
                        <button key={object.id} type="button" className="chip" onClick={() => draftCommand(`examine ${object.commandNoun}`)}>
                          {object.name}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="sidebar-note">Nothing catalogued yet. LOOK around.</p>
                  )}
                </section>

                <section className="sidebar-section quick-actions">
                  <button type="button" disabled={!acceptsInput} onClick={() => postCommand("look")}>Look</button>
                  <button type="button" disabled={!acceptsInput} onClick={() => postCommand("inventory")}>Inventory</button>
                </section>

                <form className="sidebar-command" onSubmit={handleSubmit}>
                  <label htmlFor="command-input">Command</label>
                  <div className="sidebar-command-row">
                    <input
                      id="command-input"
                      ref={commandInputRef}
                      type="text"
                      value={commandValue}
                      onChange={(event) => setCommandValue(event.target.value)}
                      placeholder={inputKind === "char" ? "Press any key…" : "Type a command…"}
                      autoComplete="off"
                      spellCheck={false}
                    />
                    <button type="submit" disabled={!acceptsInput || !commandValue.trim()}>Send</button>
                  </div>
                  <p className="sidebar-note">A suggestion fills this box but never sends itself &mdash; edit it, then press Send.</p>
                </form>
              </aside>
            )}
          </div>
        </div>
      )}

      {helpOpen && <HelpOverlay mode={mode} onClose={() => setHelpOpen(false)} />}
      {aboutOpen && (
        <AboutOverlay
          onClose={() => setAboutOpen(false)}
          reduceMotion={reduceMotion}
          highContrast={highContrast}
          onReduceMotionChange={(value) => {
            setReduceMotion(value);
            try { localStorage.setItem("hhgg:reduce-motion", String(value)); } catch { /* optional */ }
          }}
          onHighContrastChange={(value) => {
            setHighContrast(value);
            try { localStorage.setItem("hhgg:contrast", String(value)); } catch { /* optional */ }
          }}
        />
      )}
    </main>
  );
}

function CoverScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <section className="cover">
      <div className="cover-panel">
        <p className="cover-eyebrow">A SUB-ETHA SENS-O-MATIC TRANSMISSION</p>
        <h1 className="cover-title">
          THE HITCHHIKER&rsquo;S
          <br />
          GUIDE TO THE GALAXY
        </h1>
        <p className="cover-subtitle">Interactive novel &middot; Solid Gold Edition &middot; Serial 871119</p>
        <div className="dont-panic">DON&rsquo;T PANIC</div>
        <p className="cover-blurb">
          Your house is about to be demolished. So, in a manner of speaking, is your planet.
          A modern browser edition of the 1984 Infocom interactive novel, presented complete
          and unabridged, exactly as originally released.
        </p>
        <button type="button" className="cover-continue" onClick={onContinue}>
          Pick up the towel →
        </button>
      </div>
    </section>
  );
}

function BriefScreen({ mode, onBegin, onBack }: { mode: Mode; onBegin: (mode: Mode) => void; onBack: () => void }) {
  const [selected, setSelected] = useState<Mode>(mode);
  return (
    <section className="brief">
      <div className="brief-panel">
        <h2>How would you like to play?</h2>
        <div className="mode-choices">
          <button type="button" className={`mode-choice${selected === "classic" ? " selected" : ""}`} onClick={() => setSelected("classic")}>
            <strong>Classic</strong>
            <span>The original command line. Type everything, exactly like 1984.</span>
          </button>
          <button type="button" className={`mode-choice${selected === "guided" ? " selected" : ""}`} onClick={() => setSelected("guided")}>
            <strong>Guided</strong>
            <span>Clickable exits and one editable suggestion. The command line is still there if you want it.</span>
          </button>
        </div>
        <ul className="brief-tips">
          <li>LOOK repeats your surroundings; INVENTORY lists what you carry.</li>
          <li>The parser rewards short, plain commands: EXAMINE TOWEL, TAKE PHONE, PRESS BUTTON.</li>
          <li>Nothing you do here is undone for you &mdash; every command reaches the real, unmodified 1984 game.</li>
        </ul>
        <div className="brief-actions">
          <button type="button" className="brief-back" onClick={onBack}>Back</button>
          <button type="button" className="brief-begin" onClick={() => onBegin(selected)}>Begin &middot; {selected === "classic" ? "Classic" : "Guided"} →</button>
        </div>
      </div>
    </section>
  );
}

function HelpOverlay({ mode, onClose }: { mode: Mode; onClose: () => void }) {
  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="Help">
      <div className="overlay-panel">
        <button type="button" className="overlay-close" onClick={onClose} aria-label="Close help">×</button>
        <h2>Help</h2>
        <p>This is the complete, unmodified 1984 story file, running in the Parchment interpreter. Nothing about the puzzles, prose, or parser has changed.</p>
        <ul>
          <li><strong>LOOK</strong> repeats the description of where you are.</li>
          <li><strong>INVENTORY</strong> (or I) lists what you&rsquo;re carrying.</li>
          <li><strong>EXAMINE [thing]</strong> (or X) looks closely at something.</li>
          <li>Directions: NORTH, SOUTH, EAST, WEST, NE, NW, SE, SW, UP, DOWN, IN, OUT.</li>
          <li><strong>SAVE</strong> and <strong>RESTORE</strong> work normally; the interpreter also autosaves your position in this browser.</li>
        </ul>
        {mode === "guided" && (
          <p>In Guided mode, the sidebar shows the exits and notable objects the original source actually defines for your current room. Clicking an object drafts a command into the box below &mdash; it won&rsquo;t be sent until you press Send, so edit it freely.</p>
        )}
        <p className="overlay-note">Stuck? The real game is famously, deliberately brutal in places. That is faithful to the original &mdash; there are no hints wired in here.</p>
      </div>
    </div>
  );
}

function AboutOverlay({
  onClose,
  reduceMotion,
  highContrast,
  onReduceMotionChange,
  onHighContrastChange,
}: {
  onClose: () => void;
  reduceMotion: boolean;
  highContrast: boolean;
  onReduceMotionChange: (value: boolean) => void;
  onHighContrastChange: (value: boolean) => void;
}) {
  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="About this edition">
      <div className="overlay-panel">
        <button type="button" className="overlay-close" onClick={onClose} aria-label="Close about">×</button>
        <h2>About this edition</h2>
        <p>
          Written by Douglas Adams and Steve Meretzky, published by Infocom in 1984. This is the
          Solid Gold Edition release (serial 871119), preserved from the historical ZIL source
          archive. The story file, parser, and prose are untouched &mdash; this page is only a
          modern wrapper around the original interpreter.
        </p>
        <p>
          The browser interpreter is <a href="https://github.com/curiousdannii/parchment" target="_blank" rel="noreferrer">Parchment</a>,
          by Dannii Willis and contributors. Historical source preserved by{" "}
          <a href="https://github.com/historicalsource/hitchhikersguide-gold" target="_blank" rel="noreferrer">historicalsource</a>.
        </p>
        <div className="overlay-toggles">
          <label>
            <input type="checkbox" checked={reduceMotion} onChange={(event) => onReduceMotionChange(event.target.checked)} />
            Reduce motion
          </label>
          <label>
            <input type="checkbox" checked={highContrast} onChange={(event) => onHighContrastChange(event.target.checked)} />
            High contrast
          </label>
        </div>
        <p className="overlay-note">
          <a href={SHARE_URL}>{SHARE_URL.replace("https://", "")}</a>
        </p>
      </div>
    </div>
  );
}
