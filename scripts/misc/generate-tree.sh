#! /bin/bash

# Generate a tree for all directories and subdirectories of the current location 4 levels deep. This excludes
# node_modules, vendor and public directories from the list.

# Check that the command exists first before running as it's not included on MacOS by default.  Mac users install with
# `brew install tree`
if ! command -v tree &> /dev/null
then
    echo "The tree command could not be found.  Please install tree and try again."
    exit
fi

tree -L 4 -d -I 'node_modules|vendor|public|coverage'
