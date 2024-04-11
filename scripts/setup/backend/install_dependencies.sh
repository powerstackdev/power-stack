#!/usr/bin/env bash

#: exec_target = cli

## Initialize CMS codebase
##
## Usage: fin cms/code-init

# Abort if anything fails
set -e

cd "${PROJECT_ROOT}/backend/starters/${BACKEND_STARTER}"

time composer install --ignore-platform-reqs --no-interaction --prefer-dist