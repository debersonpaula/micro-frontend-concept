#!/bin/bash

OUTDIR="../dist/template-config"
mkdir -p $OUTDIR
cp "index.js" "$OUTDIR/index.js"
cp "webpackConfigFactory.js" "$OUTDIR/webpackConfigFactory.js"
cp "package.json" "$OUTDIR/package.json"
