#!/usr/bin/env bash

. ./scripts/misc/globals.sh

#: exec_target = cli

## Initialize/reinstall CMS
##
## Usage: fin cms/init

# Abort if anything fails
set -e

#-------------------------- Settings --------------------------------

# PROJECT_ROOT and DOCROOT are set as env variables in cli
SITE_DIRECTORY="default"
SITE_PATH="${PROJECT_ROOT}/backend/starters/${BACKEND_STARTER}"
DOCROOT_PATH="${SITE_PATH}/${DOCROOT}"
SITEDIR_PATH="${DOCROOT_PATH}/sites/${SITE_DIRECTORY}"

#-------------------------- END: Settings --------------------------------

#-------------------------- Helper functions --------------------------------

# Copy a settings file.
# Skips if the destination file already exists.
# @param $1 source file
# @param $2 destination file
copy_settings_file()
{
	local source="$1"
	local dest="$2"

	if [[ ! -f $dest ]]; then
		echo "Copying ${dest}..."
		cp $source $dest
	else
		echo "${dest} already in place."
	fi
}

#-------------------------- END: Helper functions --------------------------------

#-------------------------- Functions --------------------------------

# Initialize local settings files
init_settings ()
{
	# drupal-composer/drupal-project creates settings.php from default.settings.php.
	# Since we supply our own settings.php below, we have to drop the default file first.
	# TODO: Uncomment the local config (settings.local.php) include section in settings.php inline instead.
	# That'a the only change we need in the stock settings.php

	subtitle "Copying settings.php"

	rm -f "${SITEDIR_PATH}/settings.php"
	copy_settings_file "${PROJECT_ROOT}/.docksal/settings/settings.php" "${SITEDIR_PATH}/settings.php"
	copy_settings_file "${PROJECT_ROOT}/.docksal/settings/settings.local.php" "${SITEDIR_PATH}/settings.local.php"

}

# Create a key file
# Skips if the destination file already exists.
# @param $1 destination file
create_oauth_keys()
{
	local dest="$1"

  subtitle "Creating pub/private keys"

	if [ -f "${dest}/private.key" -a -f "${dest}/public.key" ]; then
    echo "Keys at ${dest} are already in place."
	else
	  chmod 755 "${dest}"

	  echo "Generating keys at ${dest}..."
    openssl genrsa -out "${dest}/private.key" 2048
    openssl rsa -in "${dest}/private.key" -pubout > "${dest}/public.key"

    echo "Locking down permissions on keys at ${dest}..."
    chmod 600 "${dest}/private.key"
    chmod 600 "${dest}/public.key"
	fi

}


# Fix file/folder permissions
fix_permissions ()
{
  subtitle "Making site directory writable"

	chmod 755 "${SITEDIR_PATH}"
}

# Install site
site_install ()
{
	cd "$DOCROOT_PATH"

  subtitle "Installing Drupal"
	# We disable email sending here so site-install does not return an error
	# Credit: https://www.drupal.org/project/phpconfig/issues/1826652#comment-12071700
	drush site-install powerstack_profile -y \
		install_configure_form.enable_update_status_module=NULL \
		--site-name="Power Stack ${BACKEND_STARTER} Starter"
}

#-------------------------- END: Functions --------------------------------

#-------------------------- Execution --------------------------------

# Project initialization steps
fix_permissions
init_settings
create_oauth_keys "${SITE_PATH}/keys"
time site_install

login_link=$(cd "$DOCROOT_PATH" && drush uli)

echo -e "${yellow}Drupal admin login:${NC} ${login_link}"

#-------------------------- END: Execution --------------------------------
