# Recipebox

Recipes, as a dataflow graph — a collection in the
[Culina](https://github.com/kitlaan/culina) format. One `.culina` file per
recipe; collection policy lives in `.culina.toml`.

Every push to `main` builds the site with `culina-site` and publishes it to
GitHub Pages. Each page has a style picker (recipe card, inline
measurements, parallel tracks, index card); the choice is saved in the
browser. `scripts/build-site.sh` builds it, from a culina checkout:

```
CULINA=/path/to/culina scripts/build-site.sh public
```

The picker is a script in `static/` plus the generator's own sheets, copied
next to the pages at build time, so the sheets always match the generator.

Keep recipes canonical: `culinafmt -l *.culina` lists files whose form
differs; drop `-l` to rewrite them in place.

## License

The recipes and photos are © Ted Lin, licensed
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Recipes adapted
from other sources credit them in their `>> source:` lines; the license
covers only what is original here. See [LICENSE](LICENSE).
