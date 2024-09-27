#!/bin/bash

DB_NAME="${1:-$DEFAULTVALUE}"

for DIRNAME in ~/.gramps/grampsdb/*; do
    DB_IN_DIR=$(cat "$DIRNAME/name.txt");
    if [ "$DB_IN_DIR" == "$DB_NAME" ]; then
        echo "Found: $DBNAME in $DIRNAME"; 
        mkdir -p ./db/$DB_NAME
        cp -v $DIRNAME/* ./db/$DB_NAME/
    fi
done
