#! /bin/bash

# Console colors
red='\033[0;31m'
green='\033[0;32m'
green_bg='\033[1;97;42m'
yellow='\033[1;33m'
NC='\033[0m'

echo_red () { echo -e "${red}$1${NC}"; }
echo_green () { echo -e "${green}$1${NC}"; }
echo_green_bg () { echo -e "${green_bg}$1${NC}"; }
echo_yellow () { echo -e "${yellow}$1${NC}"; }

br () { printf "\n"; }

if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi


if [ ! -z "$BUILD_VARS" ]
then
  echo $BUILD_VARS | base64 -d > ./.env
fi



