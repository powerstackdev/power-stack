#!/usr/bin/env bash

#: exec_target = cli

## Initialize CMS codebase
##
## Usage: fin cms/code-init

# Abort if anything fails
set -e

cd "$PROJECT_ROOT/backend"

# Install dependencies
time composer install
#time composer install --no-dev --ignore-platform-reqs --no-interaction --prefer-dist
time composer workspace powerstack/$BACKEND_STARTER update --ignore-platform-reqs --no-interaction --prefer-dist
