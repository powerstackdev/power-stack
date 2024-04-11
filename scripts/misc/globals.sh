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

title () {
    local step="$1"
  	local text="$2"

    br
    echo -e "${green_bg} ${step} ${NC}${green} ${text}... ${NC}"
    br
}

subtitle () {
  	local text="$1"

  	br
  	echo_green "${text}..."
    br
}

# copy_env_file()
# {

#   local source="${PROJECT_ROOT}/.docksal/settings/.env"
#   local dest="${PROJECT_ROOT}/.env"

#   echo "Copying ${source} to ${dest}..."

# 	if [[ ! -f $dest ]]; then
# 		cp $source $dest
# 	else
# 		echo "${dest} already in place. Creating backup first..."
# 		mv $dest $dest.old
# 		cp $source $dest
# 	fi
# }

update_env_file() {
  local key="$1"
  local value="$2"

  fin config set --env=local "${key}=${value}"
}

