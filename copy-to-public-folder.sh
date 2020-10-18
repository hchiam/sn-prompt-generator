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

bash weakly_obfuscate_functions.sh
bash weakly_obfuscate_ids.sh

# prepend comment:
cat <(echo "// Remember: God is watching. Clear conscience?") minified-script.js > temp.js
mv temp.js minified-script.js
rm public/temp.js

# copy "regular" files into the public folder:
cp *.* public

# clean up unnecessary files:
rm public/copy-to-public-folder.sh
rm public/weakly_obfuscate_functions.sh
rm public/weakly_obfuscate_ids.sh
rm public/README.md
rm public/script.js
rm public/style.css
rm public/reminder.txt

echo
echo "Done."
echo
