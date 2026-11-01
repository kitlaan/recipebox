# Recipebox

Recipes, as a dataflow graph — a collection in the
[Culina](https://github.com/kitlaan/culina) format. One `.culina` file per
recipe; collection policy lives in `.culina.toml`.

Every push to `main` builds the site with `culina-site` and publishes it to
GitHub Pages. The same site, built locally:

```
cargo install --git https://github.com/kitlaan/culina culinafmt culina-site
culina-site --in . --out public
```

From a culina checkout instead (tool development), no install needed:

```
cargo run -p culina-site -- --in /path/to/recipebox --out public
```

Keep recipes canonical: `culinafmt -l *.culina` lists files whose form
differs; drop `-l` to rewrite them in place.
