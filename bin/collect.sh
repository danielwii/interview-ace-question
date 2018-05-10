#!/usr/bin/env bash

set +ex

mkdir -p static
rm -f static/*

cp node_modules/bulma/css/bulma.css static/bulma.css

exit 0
