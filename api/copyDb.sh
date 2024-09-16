#!/bin/bash

for DIRNAME in ~/.gramps/grampsdb/*; do
    DBNAME=$(cat "$DIRNAME/name.txt");
    if [ "$DBNAME" == "Example" ]; then
        echo "Found: $DBNAME in $DIRNAME"; 
        cp -v $DIRNAME/* ./db/
    fi
done
