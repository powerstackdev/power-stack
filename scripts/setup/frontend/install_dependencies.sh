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

# With node_modules being a volume, yarn will fail with "EBUSY: resource busy or locked, rmdir
# '/var/www/frontend/node_modules'" until next version is released https://github.com/yarnpkg/berry/issues/4172
# temporary fix is to set from sources rather than be pinned to 3.2.0
# fin exec yarn set version from sources


time yarn
