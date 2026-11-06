#!/usr/bin/env bash
# Build the site with a style picker.
#
# culina-site writes pages that link one stylesheet and cannot host a
# picker, so this wraps it: build, copy the generator's four sheets next
# to the pages, and add a script that swaps the sheet. The sheets come
# from the culina checkout, so they never drift from the generator.
#
#   CULINA=~/Projects/recipe-dsl scripts/build-site.sh [out-dir]
#
# CULINA is a kitlaan/culina checkout (CI uses ./.culina-src: hidden, so
# culina-site does not publish the tool's own test recipes); out-dir is
# public.
set -euo pipefail

CULINA="${CULINA:-.culina-src}"
OUT="${1:-public}"

cargo build --release --manifest-path "$CULINA/Cargo.toml" -p culina-site
"$CULINA/target/release/culina-site" --in . --out "$OUT"

mkdir -p "$OUT/static/styles"
cp "$CULINA"/crates/culina-site/css/*.css "$OUT/static/styles/"

# The generator emits </head> once per page, right after the stylesheet link.
for page in "$OUT"/*.html; do
  perl -pi -e 's|</head>|<script src="static/style-switcher.js"></script>\n</head>|' "$page"
done
