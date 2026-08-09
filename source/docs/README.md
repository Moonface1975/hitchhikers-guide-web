# Source provenance

The `.zil` files in this directory are copied unmodified from
[historicalsource/hitchhikersguide-gold](https://github.com/historicalsource/hitchhikersguide-gold),
a preservation archive of the Infocom development-system snapshot for *The
Hitchhiker's Guide to the Galaxy* (Solid Gold Edition). Per that repository's
README, the source was contributed anonymously and represents a snapshot of
the Infocom drive at time of shutdown; it is preserved for education,
discussion, and historical research and is not under an open license.

`scripts/extract-world.mjs` (in the project root) parses this source only to
build a room/exit/object index used for the optional Guided-mode navigation
hints in the web wrapper. It does not alter, recompile, or reinterpret the
game itself — the playable story is the original compiled Z-machine file
(`nhitch.zip` in the source repository, Z-machine version 5, serial 871119),
vendored here as `public/hhgg-gold-s871119.z5`, and it runs untouched in the
Parchment interpreter.
