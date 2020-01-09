#!/bin/bash

# to run this file in CLI: bash copy-to-public-folder.sh

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

# copy "regular" files into the public folder:
cp *.* public
rm public/copy-to-public-folder.sh
rm public/README.md
rm public/script.js
rm public/style.css
