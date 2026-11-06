# Recipebox

Recipes, as a dataflow graph — a collection in the
[Culina](https://github.com/kitlaan/culina) format. One `.culina` file per
recipe, in `recipes/`; photos live in `static/photos/<recipe>/`, and
collection policy lives in `.culina.toml`. Browse them on the site:
<https://kitlaan.github.io/recipebox/>.

A page's URL is its file name, so moving a recipe between directories keeps
its link; renaming the file changes it.

Every push to `main` builds the site with `culina-site` and publishes it to
GitHub Pages. Each page has a style picker (recipe card, inline
measurements, parallel tracks, index card) and a layout picker (the card,
or the recipe as a Cooking For Engineers grid, straight or slanted); the
choices are saved in the browser. `scripts/build-site.sh` builds it, from a
culina checkout:

```
CULINA=/path/to/culina scripts/build-site.sh public
```

The picker is a script in `static/` plus the generator's own sheets, copied
next to the pages at build time, so the sheets always match the generator.

Keep recipes canonical: `culinafmt -l recipes/*.culina` lists files whose form
differs; drop `-l` to rewrite them in place.

## License

The recipes and photos are © Ted Lin, licensed
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Recipes adapted
from other sources credit them in their `>> source:` lines; the license
covers only what is original here. See [LICENSE](LICENSE).

The grid's font, Atkinson Hyperlegible Next (`static/fonts/`), is not
covered by that license: it is under the SIL Open Font License, in
`static/fonts/AtkinsonHyperlegibleNext-OFL.txt`.
