// Generated from the preserved ZIL source by scripts/extract-world.mjs.
// Do not edit by hand; the original story file remains the sole source of truth for gameplay.

export type WorldExit = { targetId: string | null; target: string | null };
export type WorldNotableObject = { id: string; name: string; commandNoun: string };
export type WorldRoom = { id: string; name: string; exits: Record<string, WorldExit>; notableObjects: WorldNotableObject[] };

export const WORLD_ROOMS: WorldRoom[] = [
  {
    "id": "ACCESS-SPACE",
    "name": "Access Space",
    "exits": {
      "OUT": {
        "targetId": "HATCHWAY",
        "target": "Hatchway"
      },
      "WEST": {
        "targetId": "HATCHWAY",
        "target": "Hatchway"
      }
    },
    "notableObjects": [
      {
        "id": "MESH",
        "name": "mesh",
        "commandNoun": "mesh"
      },
      {
        "id": "HEART-OF-GOLD",
        "name": "the Heart of Gold",
        "commandNoun": "heart"
      }
    ]
  },
  {
    "id": "AIRLOCK",
    "name": "Airlock",
    "exits": {
      "WEST": {
        "targetId": "HOLD",
        "target": "Vogon Hold"
      },
      "EAST": {
        "targetId": "HOLD",
        "target": "Vogon Hold"
      }
    },
    "notableObjects": [
      {
        "id": "VOGON-INNER-DOOR",
        "name": "inner door",
        "commandNoun": "door"
      },
      {
        "id": "VOGON-OUTER-DOOR",
        "name": "outer door",
        "commandNoun": "door"
      },
      {
        "id": "AIRLOCK-OBJECT",
        "name": "airlock",
        "commandNoun": "airlock"
      },
      {
        "id": "FLEET",
        "name": "fleet of Vogon Constructor ships",
        "commandNoun": "fleet"
      }
    ]
  },
  {
    "id": "BACK-OF-HOUSE",
    "name": "Back of House",
    "exits": {
      "SE": {
        "targetId": "FRONT-OF-HOUSE",
        "target": "Front of House"
      },
      "SW": {
        "targetId": "FRONT-OF-HOUSE",
        "target": "Front of House"
      }
    },
    "notableObjects": [
      {
        "id": "BIRDS",
        "name": "bird",
        "commandNoun": "bird"
      },
      {
        "id": "HOME",
        "name": "your home",
        "commandNoun": "home"
      },
      {
        "id": "THIRD-PLANET",
        "name": "third planet",
        "commandNoun": "planet"
      },
      {
        "id": "RUBBLE",
        "name": "pile of rubble",
        "commandNoun": "rubble"
      },
      {
        "id": "TREE",
        "name": "tree",
        "commandNoun": "tree"
      }
    ]
  },
  {
    "id": "OUTER-LAIR",
    "name": "Beast's Outer Lair",
    "exits": {
      "WEST": {
        "targetId": "LAIR",
        "target": "Lair"
      }
    },
    "notableObjects": [
      {
        "id": "BONES",
        "name": "bone",
        "commandNoun": "bone"
      },
      {
        "id": "MEMORIAL",
        "name": "sandstone memorial",
        "commandNoun": "memorial"
      },
      {
        "id": "STONE",
        "name": "sharp stone",
        "commandNoun": "stone"
      },
      {
        "id": "LAIR-OBJECT",
        "name": "lair",
        "commandNoun": "lair"
      }
    ]
  },
  {
    "id": "BEDROOM",
    "name": "Bedroom",
    "exits": {
      "SOUTH": {
        "targetId": "FRONT-PORCH",
        "target": "Front Porch"
      },
      "OUT": {
        "targetId": "FRONT-PORCH",
        "target": "Front Porch"
      },
      "DOWN": {
        "targetId": "FRONT-PORCH",
        "target": "Front Porch"
      }
    },
    "notableObjects": [
      {
        "id": "PHONE",
        "name": "telephone",
        "commandNoun": "telephone"
      },
      {
        "id": "BED",
        "name": "bed",
        "commandNoun": "bed"
      },
      {
        "id": "CURTAINS",
        "name": "your curtains",
        "commandNoun": "curtains"
      },
      {
        "id": "GOWN",
        "name": "your gown",
        "commandNoun": "gown"
      },
      {
        "id": "TOOTHBRUSH",
        "name": "toothbrush",
        "commandNoun": "toothbrush"
      },
      {
        "id": "SCREWDRIVER",
        "name": "flathead screwdriver",
        "commandNoun": "screwdriver"
      },
      {
        "id": "NAME",
        "name": "name",
        "commandNoun": "name"
      },
      {
        "id": "HOME",
        "name": "your home",
        "commandNoun": "home"
      },
      {
        "id": "WINDOW",
        "name": "window",
        "commandNoun": "window"
      },
      {
        "id": "STAIRS",
        "name": "stairs",
        "commandNoun": "stairs"
      },
      {
        "id": "BEDROOM-DOOR",
        "name": "door",
        "commandNoun": "door"
      },
      {
        "id": "THIRD-PLANET",
        "name": "third planet",
        "commandNoun": "planet"
      },
      {
        "id": "WATER",
        "name": "water",
        "commandNoun": "water"
      }
    ]
  },
  {
    "id": "BRIDGE",
    "name": "Bridge",
    "exits": {
      "DOWN": {
        "targetId": "FORE-CORRIDOR",
        "target": "Corridor, Fore End"
      },
      "WEST": {
        "targetId": null,
        "target": null
      }
    },
    "notableObjects": [
      {
        "id": "PINCER",
        "name": "molecular hyperwave pincer",
        "commandNoun": "pincer"
      },
      {
        "id": "SAUNA",
        "name": "sauna",
        "commandNoun": "sauna"
      },
      {
        "id": "EDDIE",
        "name": "Eddie (the shipboard computer)",
        "commandNoun": "computer"
      },
      {
        "id": "LARGE-RECEPTACLE",
        "name": "large receptacle",
        "commandNoun": "receptacle"
      },
      {
        "id": "ZAPHOD",
        "name": "Zaphod Beeblebrox",
        "commandNoun": "beeblebrox"
      },
      {
        "id": "TRILLIAN",
        "name": "Trillian",
        "commandNoun": "trillian"
      },
      {
        "id": "STAIRS",
        "name": "stairs",
        "commandNoun": "stairs"
      },
      {
        "id": "CONTROLS",
        "name": "the controls",
        "commandNoun": "controls"
      },
      {
        "id": "HEART-OF-GOLD",
        "name": "the Heart of Gold",
        "commandNoun": "heart"
      },
      {
        "id": "PEOPLE",
        "name": "people",
        "commandNoun": "people"
      }
    ]
  },
  {
    "id": "CAPTAINS-QUARTERS",
    "name": "Captain's Quarters",
    "exits": {},
    "notableObjects": [
      {
        "id": "STRAPS",
        "name": "strap",
        "commandNoun": "strap"
      },
      {
        "id": "POETRY-APPRECIATION-CHAIR",
        "name": "poetry appreciation chair",
        "commandNoun": "chair"
      },
      {
        "id": "VOGON-CAPTAIN",
        "name": "Vogon Captain",
        "commandNoun": "captain"
      },
      {
        "id": "POETRY",
        "name": "Vogon poetry",
        "commandNoun": "poetry"
      },
      {
        "id": "FLEET",
        "name": "fleet of Vogon Constructor ships",
        "commandNoun": "fleet"
      },
      {
        "id": "WEAPON",
        "name": "weapon",
        "commandNoun": "weapon"
      }
    ]
  },
  {
    "id": "AFT-CORRIDOR",
    "name": "Corridor, Aft End",
    "exits": {
      "NORTH": {
        "targetId": "FORE-CORRIDOR",
        "target": "Corridor, Fore End"
      },
      "WEST": {
        "targetId": "PANTRY",
        "target": "Marvin's Pantry"
      },
      "DOWN": {
        "targetId": "HATCHWAY",
        "target": "Hatchway"
      },
      "SOUTH": {
        "targetId": "ENGINE-ROOM",
        "target": "Engine Room"
      }
    },
    "notableObjects": [
      {
        "id": "STAIRS",
        "name": "stairs",
        "commandNoun": "stairs"
      },
      {
        "id": "HEART-OF-GOLD",
        "name": "the Heart of Gold",
        "commandNoun": "heart"
      }
    ]
  },
  {
    "id": "FORE-CORRIDOR",
    "name": "Corridor, Fore End",
    "exits": {
      "UP": {
        "targetId": "BRIDGE",
        "target": "Bridge"
      },
      "NORTH": {
        "targetId": "ENTRY-BAY",
        "target": "Entry Bay Number Two"
      },
      "WEST": {
        "targetId": "GALLEY",
        "target": "Galley"
      },
      "SOUTH": {
        "targetId": "AFT-CORRIDOR",
        "target": "Corridor, Aft End"
      }
    },
    "notableObjects": [
      {
        "id": "STAIRS",
        "name": "stairs",
        "commandNoun": "stairs"
      },
      {
        "id": "HEART-OF-GOLD",
        "name": "the Heart of Gold",
        "commandNoun": "heart"
      }
    ]
  },
  {
    "id": "COUNTRY-LANE",
    "name": "Country Lane",
    "exits": {
      "NORTH": {
        "targetId": "FRONT-OF-HOUSE",
        "target": "Front of House"
      },
      "WEST": {
        "targetId": "PUB",
        "target": "Pub"
      },
      "IN": {
        "targetId": "PUB",
        "target": "Pub"
      }
    },
    "notableObjects": [
      {
        "id": "HOME",
        "name": "your home",
        "commandNoun": "home"
      },
      {
        "id": "PUB-OBJECT",
        "name": "Pub",
        "commandNoun": "pub"
      },
      {
        "id": "THIRD-PLANET",
        "name": "third planet",
        "commandNoun": "planet"
      },
      {
        "id": "TREE",
        "name": "tree",
        "commandNoun": "tree"
      }
    ]
  },
  {
    "id": "DAIS",
    "name": "Dais",
    "exits": {
      "EAST": {
        "targetId": null,
        "target": null
      },
      "IN": {
        "targetId": null,
        "target": null
      },
      "OUT": {
        "targetId": null,
        "target": null
      }
    },
    "notableObjects": [
      {
        "id": "BANNER",
        "name": "banner",
        "commandNoun": "banner"
      },
      {
        "id": "HEART-OF-GOLD",
        "name": "the Heart of Gold",
        "commandNoun": "heart"
      },
      {
        "id": "PLATFORM",
        "name": "Dais",
        "commandNoun": "dais"
      },
      {
        "id": "CROWD",
        "name": "crowd",
        "commandNoun": "crowd"
      }
    ]
  },
  {
    "id": "DINING-ROOM",
    "name": "Dining Room",
    "exits": {
      "SOUTH": {
        "targetId": "KITCHEN",
        "target": "Kitchen"
      },
      "EAST": {
        "targetId": "LIVING-ROOM",
        "target": "Living Room"
      }
    },
    "notableObjects": [
      {
        "id": "APARTMENT",
        "name": "apartment",
        "commandNoun": "apartment"
      },
      {
        "id": "WILD-PARTY",
        "name": "party",
        "commandNoun": "party"
      }
    ]
  },
  {
    "id": "ENGINE-ROOM",
    "name": "Engine Room",
    "exits": {
      "NORTH": {
        "targetId": "AFT-CORRIDOR",
        "target": "Corridor, Aft End"
      },
      "OUT": {
        "targetId": "AFT-CORRIDOR",
        "target": "Corridor, Aft End"
      }
    },
    "notableObjects": [
      {
        "id": "HEART-OF-GOLD",
        "name": "the Heart of Gold",
        "commandNoun": "heart"
      }
    ]
  },
  {
    "id": "ENTRY-BAY",
    "name": "Entry Bay Number Two",
    "exits": {
      "SOUTH": {
        "targetId": "FORE-CORRIDOR",
        "target": "Corridor, Fore End"
      }
    },
    "notableObjects": [
      {
        "id": "SALES-BROCHURE",
        "name": "sales brochure",
        "commandNoun": "brochure"
      },
      {
        "id": "HEART-OF-GOLD",
        "name": "the Heart of Gold",
        "commandNoun": "heart"
      }
    ]
  },
  {
    "id": "FRONT-OF-HOUSE",
    "name": "Front of House",
    "exits": {
      "SOUTH": {
        "targetId": "COUNTRY-LANE",
        "target": "Country Lane"
      },
      "NE": {
        "targetId": "BACK-OF-HOUSE",
        "target": "Back of House"
      },
      "NW": {
        "targetId": "BACK-OF-HOUSE",
        "target": "Back of House"
      },
      "NORTH": {
        "targetId": "FRONT-PORCH",
        "target": "Front Porch"
      }
    },
    "notableObjects": [
      {
        "id": "BULLDOZER-DRIVER",
        "name": "bulldozer driver",
        "commandNoun": "driver"
      },
      {
        "id": "PROSSER",
        "name": "Mr. Prosser",
        "commandNoun": "prosser"
      },
      {
        "id": "HOME",
        "name": "your home",
        "commandNoun": "home"
      },
      {
        "id": "THIRD-PLANET",
        "name": "third planet",
        "commandNoun": "planet"
      },
      {
        "id": "RUBBLE",
        "name": "pile of rubble",
        "commandNoun": "rubble"
      },
      {
        "id": "TREE",
        "name": "tree",
        "commandNoun": "tree"
      }
    ]
  },
  {
    "id": "FRONT-PORCH",
    "name": "Front Porch",
    "exits": {
      "UP": {
        "targetId": "BEDROOM",
        "target": "Bedroom"
      },
      "NORTH": {
        "targetId": "BEDROOM",
        "target": "Bedroom"
      },
      "SOUTH": {
        "targetId": "FRONT-OF-HOUSE",
        "target": "Front of House"
      },
      "OUT": {
        "targetId": "FRONT-OF-HOUSE",
        "target": "Front of House"
      }
    },
    "notableObjects": [
      {
        "id": "DOORMAT",
        "name": "doormat",
        "commandNoun": "doormat"
      },
      {
        "id": "MAIL",
        "name": "loose pile of junk mail",
        "commandNoun": "mail"
      },
      {
        "id": "HOME",
        "name": "your home",
        "commandNoun": "home"
      },
      {
        "id": "STAIRS",
        "name": "stairs",
        "commandNoun": "stairs"
      },
      {
        "id": "THIRD-PLANET",
        "name": "third planet",
        "commandNoun": "planet"
      },
      {
        "id": "BEDROOM-DOOR",
        "name": "door",
        "commandNoun": "door"
      }
    ]
  },
  {
    "id": "GALLEY",
    "name": "Galley",
    "exits": {
      "EAST": {
        "targetId": "FORE-CORRIDOR",
        "target": "Corridor, Fore End"
      },
      "OUT": {
        "targetId": "FORE-CORRIDOR",
        "target": "Corridor, Fore End"
      }
    },
    "notableObjects": [
      {
        "id": "NUTRIMAT",
        "name": "Nutrimat",
        "commandNoun": "nutrimat"
      },
      {
        "id": "PAD",
        "name": "touch-sensitive pad",
        "commandNoun": "pad"
      },
      {
        "id": "SLOT",
        "name": "slot",
        "commandNoun": "slot"
      },
      {
        "id": "INTERFACE-BOX",
        "name": "shipping carton",
        "commandNoun": "carton"
      },
      {
        "id": "HEART-OF-GOLD",
        "name": "the Heart of Gold",
        "commandNoun": "heart"
      }
    ]
  },
  {
    "id": "HATCHWAY",
    "name": "Hatchway",
    "exits": {
      "UP": {
        "targetId": "AFT-CORRIDOR",
        "target": "Corridor, Aft End"
      },
      "DOWN": {
        "targetId": "RAMP",
        "target": "Ramp"
      },
      "OUT": {
        "targetId": "RAMP",
        "target": "Ramp"
      },
      "EAST": {
        "targetId": "ACCESS-SPACE",
        "target": "Access Space"
      }
    },
    "notableObjects": [
      {
        "id": "STAIRS",
        "name": "stairs",
        "commandNoun": "stairs"
      },
      {
        "id": "HEART-OF-GOLD",
        "name": "the Heart of Gold",
        "commandNoun": "heart"
      }
    ]
  },
  {
    "id": "INNER-LAIR",
    "name": "Inner Lair",
    "exits": {
      "NE": {
        "targetId": "LAIR",
        "target": "Lair"
      }
    },
    "notableObjects": [
      {
        "id": "SKELETON",
        "name": "skeleton",
        "commandNoun": "skeleton"
      },
      {
        "id": "NUT-COM-INTERFACE",
        "name": "Nutrimat/Computer Interface",
        "commandNoun": "interface"
      },
      {
        "id": "LAIR-OBJECT",
        "name": "lair",
        "commandNoun": "lair"
      }
    ]
  },
  {
    "id": "INSIDE-WHALE",
    "name": "Inside the Sperm Whale",
    "exits": {},
    "notableObjects": [
      {
        "id": "FLOWERPOT",
        "name": "flowerpot",
        "commandNoun": "flowerpot"
      },
      {
        "id": "WHALE-OBJECT",
        "name": "innard of a whale",
        "commandNoun": "innard"
      }
    ]
  },
  {
    "id": "KITCHEN",
    "name": "Kitchen",
    "exits": {
      "NORTH": {
        "targetId": "DINING-ROOM",
        "target": "Dining Room"
      },
      "NE": {
        "targetId": "LIVING-ROOM",
        "target": "Living Room"
      }
    },
    "notableObjects": [
      {
        "id": "APARTMENT",
        "name": "apartment",
        "commandNoun": "apartment"
      },
      {
        "id": "WILD-PARTY",
        "name": "party",
        "commandNoun": "party"
      }
    ]
  },
  {
    "id": "LAIR",
    "name": "Lair",
    "exits": {
      "EAST": {
        "targetId": "OUTER-LAIR",
        "target": "Beast's Outer Lair"
      },
      "SW": {
        "targetId": "INNER-LAIR",
        "target": "Inner Lair"
      }
    },
    "notableObjects": [
      {
        "id": "BEAST",
        "name": "Ravenous Bugblatter Beast of Traal",
        "commandNoun": "beast"
      },
      {
        "id": "LAIR-OBJECT",
        "name": "lair",
        "commandNoun": "lair"
      }
    ]
  },
  {
    "id": "LIVING-ROOM",
    "name": "Living Room",
    "exits": {
      "WEST": {
        "targetId": "DINING-ROOM",
        "target": "Dining Room"
      },
      "SW": {
        "targetId": "KITCHEN",
        "target": "Kitchen"
      },
      "SOUTH": {
        "targetId": null,
        "target": null
      }
    },
    "notableObjects": [
      {
        "id": "APARTMENT-DOOR",
        "name": "door",
        "commandNoun": "door"
      },
      {
        "id": "HOSTESS",
        "name": "hostess",
        "commandNoun": "hostess"
      },
      {
        "id": "APARTMENT",
        "name": "apartment",
        "commandNoun": "apartment"
      },
      {
        "id": "WILD-PARTY",
        "name": "party",
        "commandNoun": "party"
      }
    ]
  },
  {
    "id": "PANTRY",
    "name": "Marvin's Pantry",
    "exits": {
      "EAST": {
        "targetId": "AFT-CORRIDOR",
        "target": "Corridor, Aft End"
      },
      "OUT": {
        "targetId": "AFT-CORRIDOR",
        "target": "Corridor, Aft End"
      }
    },
    "notableObjects": [
      {
        "id": "CHISEL",
        "name": "thermo-fusion chisel",
        "commandNoun": "chisel"
      },
      {
        "id": "MARVIN",
        "name": "Marvin",
        "commandNoun": "marvin"
      },
      {
        "id": "HEART-OF-GOLD",
        "name": "the Heart of Gold",
        "commandNoun": "heart"
      }
    ]
  },
  {
    "id": "MAZE",
    "name": "Maze",
    "exits": {
      "NORTH": {
        "targetId": null,
        "target": null
      },
      "NE": {
        "targetId": null,
        "target": null
      },
      "EAST": {
        "targetId": null,
        "target": null
      },
      "SE": {
        "targetId": null,
        "target": null
      },
      "SOUTH": {
        "targetId": null,
        "target": null
      },
      "SW": {
        "targetId": null,
        "target": null
      },
      "WEST": {
        "targetId": null,
        "target": null
      },
      "NW": {
        "targetId": null,
        "target": null
      },
      "UP": {
        "targetId": null,
        "target": null
      },
      "DOWN": {
        "targetId": null,
        "target": null
      },
      "IN": {
        "targetId": null,
        "target": null
      },
      "OUT": {
        "targetId": null,
        "target": null
      }
    },
    "notableObjects": [
      {
        "id": "SYNAPSE",
        "name": "synapse",
        "commandNoun": "synapse"
      }
    ]
  },
  {
    "id": "SPEEDBOAT",
    "name": "Presidential Speedboat",
    "exits": {
      "NORTH": {
        "targetId": "DAIS",
        "target": "Dais"
      },
      "OUT": {
        "targetId": "DAIS",
        "target": "Dais"
      }
    },
    "notableObjects": [
      {
        "id": "BOAT-OBJECT",
        "name": "speedboat",
        "commandNoun": "speedboat"
      },
      {
        "id": "PILOT-SEAT",
        "name": "pilot seat",
        "commandNoun": "seat"
      },
      {
        "id": "TOOLBOX",
        "name": "tool box",
        "commandNoun": "box"
      },
      {
        "id": "AUTOPILOT-BUTTON",
        "name": "autopilot button",
        "commandNoun": "autopilot"
      },
      {
        "id": "CHANNEL",
        "name": "narrow channel",
        "commandNoun": "channel"
      },
      {
        "id": "SPIRE",
        "name": "rocky spire",
        "commandNoun": "spire"
      },
      {
        "id": "CLIFF",
        "name": "towering cliffs",
        "commandNoun": "cliffs"
      },
      {
        "id": "CONTROLS",
        "name": "the controls",
        "commandNoun": "controls"
      },
      {
        "id": "PLATFORM",
        "name": "Dais",
        "commandNoun": "dais"
      },
      {
        "id": "CROWD",
        "name": "crowd",
        "commandNoun": "crowd"
      },
      {
        "id": "WATER",
        "name": "water",
        "commandNoun": "water"
      }
    ]
  },
  {
    "id": "PUB",
    "name": "Pub",
    "exits": {
      "EAST": {
        "targetId": "COUNTRY-LANE",
        "target": "Country Lane"
      },
      "OUT": {
        "targetId": "COUNTRY-LANE",
        "target": "Country Lane"
      }
    },
    "notableObjects": [
      {
        "id": "BAR",
        "name": "bar",
        "commandNoun": "bar"
      },
      {
        "id": "PUB-SHELF",
        "name": "shelf of items",
        "commandNoun": "shelf"
      },
      {
        "id": "MUSIC",
        "name": "music",
        "commandNoun": "music"
      },
      {
        "id": "JUKEBOX",
        "name": "jukebox",
        "commandNoun": "jukebox"
      },
      {
        "id": "BARMAN",
        "name": "barman",
        "commandNoun": "barman"
      },
      {
        "id": "BEER",
        "name": "lots of beer",
        "commandNoun": "lots"
      },
      {
        "id": "PEANUTS",
        "name": "peanuts",
        "commandNoun": "peanuts"
      },
      {
        "id": "SANDWICH",
        "name": "cheese sandwich",
        "commandNoun": "sandwich"
      },
      {
        "id": "PUB-OBJECT",
        "name": "Pub",
        "commandNoun": "pub"
      },
      {
        "id": "WINDOW",
        "name": "window",
        "commandNoun": "window"
      },
      {
        "id": "THIRD-PLANET",
        "name": "third planet",
        "commandNoun": "planet"
      },
      {
        "id": "PEOPLE",
        "name": "people",
        "commandNoun": "people"
      }
    ]
  },
  {
    "id": "RAMP",
    "name": "Ramp",
    "exits": {},
    "notableObjects": []
  },
  {
    "id": "HOLD",
    "name": "Vogon Hold",
    "exits": {
      "EAST": {
        "targetId": "AIRLOCK",
        "target": "Airlock"
      }
    },
    "notableObjects": [
      {
        "id": "DISPENSER",
        "name": "babel fish dispenser",
        "commandNoun": "dispenser"
      },
      {
        "id": "DISPENSER-BUTTON",
        "name": "dispenser button",
        "commandNoun": "button"
      },
      {
        "id": "FISH-HOLE",
        "name": "small hole",
        "commandNoun": "hole"
      },
      {
        "id": "HOOK",
        "name": "metal hook",
        "commandNoun": "hook"
      },
      {
        "id": "DRAIN",
        "name": "drain",
        "commandNoun": "drain"
      },
      {
        "id": "ROBOT-PANEL",
        "name": "tiny robot panel",
        "commandNoun": "panel"
      },
      {
        "id": "GLASS-CASE",
        "name": "glass case",
        "commandNoun": "glass"
      },
      {
        "id": "KEYBOARD",
        "name": "keyboard",
        "commandNoun": "keyboard"
      },
      {
        "id": "CASE-SWITCH",
        "name": "switch",
        "commandNoun": "switch"
      },
      {
        "id": "VOGON-CORRIDOR-DOOR",
        "name": "corridor door",
        "commandNoun": "door"
      },
      {
        "id": "VOGON-INNER-DOOR",
        "name": "inner door",
        "commandNoun": "door"
      },
      {
        "id": "AIRLOCK-OBJECT",
        "name": "airlock",
        "commandNoun": "airlock"
      },
      {
        "id": "FLEET",
        "name": "fleet of Vogon Constructor ships",
        "commandNoun": "fleet"
      },
      {
        "id": "WEAPON",
        "name": "weapon",
        "commandNoun": "weapon"
      }
    ]
  },
  {
    "id": "WAR-CHAMBER",
    "name": "War Chamber",
    "exits": {},
    "notableObjects": [
      {
        "id": "AWL",
        "name": "ultra-plasmic vacuum awl",
        "commandNoun": "awl"
      },
      {
        "id": "MICROSCOPIC-FLEET",
        "name": "battle fleet",
        "commandNoun": "fleet"
      },
      {
        "id": "CANOPY",
        "name": "domed canopy",
        "commandNoun": "canopy"
      },
      {
        "id": "VLHURG",
        "name": "Vl'Hurg leader",
        "commandNoun": "vl'hurg"
      },
      {
        "id": "GGUGVUNT",
        "name": "G'Gugvunt leader",
        "commandNoun": "g'gugvunt"
      },
      {
        "id": "OTHER-PLANETS",
        "name": "other planets",
        "commandNoun": "planets"
      }
    ]
  }
];
