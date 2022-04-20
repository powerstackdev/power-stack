#! /bin/bash

if ! command -v tree &> /dev/null
then
    echo "The tree command could not be found.  Please install tree and try again."
    exit
fi

cd ../
tree -L 4 -d -I 'node_modules|vendor|public'