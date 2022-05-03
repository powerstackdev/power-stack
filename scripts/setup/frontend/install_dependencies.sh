#!/usr/bin/env bash

#: exec_target = cli

## Initialize frontend codebase
##
## Usage: fin fe/code-init
## In case of any errors during this command execution try to stop gatsby
## container first:
## fin stop api

# Abort if anything fails
set -e

cd "$PROJECT_ROOT/frontend"

# Install dependencies
# Using "npm ci" instead of "npm install" here to avoid unintentional package-lock.json updates
# time npm ci
# With node_modules being a volume, npm ci will fail with "EBUSY: resource busy or locked, rmdir '/var/www/frontend/node_modules'"
# Stick with npm install the time being...
time yarn
