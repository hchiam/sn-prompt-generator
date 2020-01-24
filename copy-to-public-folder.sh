#!/bin/bash

# to run this file in CLI: bash copy-to-public-folder.sh

echo
echo "Please wait."

# create public folder if it doesn't exist already
if ! [ -e public ]
then
  mkdir public
fi

# empty public folder if it has anything in it:
if [[ -e public/* ]]
then
  rm public/*
fi

# check if npm is installed:
if ! [ -x "$(command -v npm)" ]; then
  echo
  echo "Please install npm for minify to work."
  echo
else
  # install minify if unavailable:
  if ! [ -x "$(command -v minify)" ]; then npm i minify; fi

  # minify code:
  minify script.js > minified-script.js
  minify style.css > minified-style.css
fi

# copy "regular" files into the public folder:
cp *.* public
rm public/copy-to-public-folder.sh
rm public/README.md
rm public/script.js
rm public/style.css

echo
echo "Done."
echo
