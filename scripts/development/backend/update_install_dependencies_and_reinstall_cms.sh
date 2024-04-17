#!/usr/bin/env bash
. ./scripts/misc/globals.sh
. ./scripts/misc/startup.sh

subtitle "Reinstalling CMS"

title "Step 1" "Updating and installing Composer dependencies"

# Installing composer dependencies
fin exec ./scripts/development/backend/update_dependencies.sh
fin exec ./scripts/setup/backend/install_dependencies.sh

title "Step 2" "Reinstalling codebase"
fin exec ./scripts/setup/backend/install_cms.sh