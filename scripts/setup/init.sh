#! /bin/bash
. ./scripts/misc/globals.sh
. ./scripts/setup/setup.sh

#-------------------------- Execution --------------------------------

# Cleanup
fin project rm -f

# Code
echo -e "${green_bg} Step 1 ${NC}${green} Initializing codebase...${NC}"
# Using "fin docker-compose run cli <command>" to run a one off command using the cli service config
# This way, we can run cli commands BEFORE starting the whole stack (which may fail without dependencies installed first)
echo -e "${green} * CMS codebase...${NC}"
fin docker-compose run --rm cli bash -lc /var/www/scripts/setup/backend/install_dependencies.sh
echo -e "${green} * Frontend codebase...${NC}"
fin docker-compose run --rm cli bash -lc /var/www/scripts/setup/frontend/install_dependencies.sh
echo -e "${green} * Docs codebase...${NC}"
fin docker-compose run --rm cli bash -lc /var/www/scripts/setup/docs/install_dependencies.sh

# Stack
echo -e "${green_bg} Step 2 ${NC}${green} Initializing stack...${NC}"
fin project start

# CMS
echo -e "${green_bg} Step 3 ${NC}${green} Installing CMS...${NC}"
fin docker-compose run --rm cli bash -lc /var/www/scripts/setup/backend/install_cms.sh

echo -e "${green_bg} DONE! ${NC}${green} Completed all initialization steps.${NC}"

br

echo -e "Dashboard: ${yellow} http://${VIRTUAL_HOST}${NC}"

br

echo -e "Backend: ${yellow}http://backend.${VIRTUAL_HOST}${NC}"
echo -e "Frontend: ${yellow}http://frontend.${VIRTUAL_HOST}${NC}"
echo -e "Docs: ${yellow}http://docs.${VIRTUAL_HOST}${NC}"

br

open "http://${VIRTUAL_HOST}"
#-------------------------- END: Execution --------------------------------