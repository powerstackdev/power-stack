#! /bin/bash
. ./scripts/misc/globals.sh
. ./scripts/setup/setup.sh

#-------------------------- Execution --------------------------------

# Cleanup all exiting instances
title "Cleaning" "Cleaning up any old instances"
fin project rm -f

#if [ $(uname -s) == 'Darwin' ];  then
#  title "FS" "Syncing MacOS files on mutagen"
#  fin mutagen stop
#  project_root=$(get_fin_variable "PROJECT_ROOT")
#  cd "${project_root//\"/}" || { echo "Cannot start"; exit 1; }
#
#  if [ -z $new_project ]; then
#    fin "$1"
#  fi
#
#  mutagen project start
#fi

# Initialize the codebases and download dependencies.
title "STEP 1" "Initializing codebase"

# Using "fin docker-compose run cli <command>" to run a one off command using the cli service config
# This way, we can run cli commands BEFORE starting the whole stack (which may fail without dependencies installed first)

# Setup the .env file
subtitle " * Globals"
./scripts/setup/init_env_file.sh

subtitle " * Fixing perms"
fin docker-compose run --rm cli bash -lc /var/www/scripts/setup/startup.sh

# Download and install backend dependencies
subtitle " * Backend codebase"
fin docker-compose run --rm cli bash -lc /var/www/scripts/setup/backend/install_dependencies.sh

# Download and install frontend dependencies
subtitle " * Frontend codebase"
fin docker-compose run --rm cli bash -lc /var/www/scripts/setup/frontend/install_dependencies.sh

# Download and install docs dependencies
subtitle " * Docs codebase"
fin docker-compose run --rm cli bash -lc /var/www/scripts/setup/docs/install_dependencies.sh

# Power up stack for the first time
title "STEP 2" "Initializing stack"
fin project start


# Upgrade global Drupal coder
title "STEP 3" "Upgrading global drupal/coder"
fin exec "cd /home/docker/.composer && composer update --with-dependencies drupal/coder"

# Install Drupal
title "STEP 4" "Installing CMS"
fin exec "/var/www/scripts/setup/backend/install_cms.sh"

# Configuring frontend to link to newly provisioned backend environment
title "STEP 5" "Linking environments"
fin project restart frontend

# All done! show the urls.
title "DONE!" "Completed all initialization steps"
echo -e "Dashboard: ${yellow} http://${VIRTUAL_HOST}${NC}"
br
echo -e "Backend: ${yellow}http://backend.${VIRTUAL_HOST}${NC}"
echo -e "Frontend: ${yellow}http://frontend.${VIRTUAL_HOST}${NC}"
echo -e "Docs: ${yellow}http://docs.${VIRTUAL_HOST}${NC}"
br
open "http://${VIRTUAL_HOST}"
#-------------------------- END: Execution --------------------------------