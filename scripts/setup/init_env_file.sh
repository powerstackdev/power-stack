#-------------------------- Helper Functions --------------------------------
. ./scripts/misc/globals.sh


copy_env_file

secret=$(openssl rand -hex 20)

update_env_file "GATSBY_DRUPAL_HOST" "http://backend.${VIRTUAL_HOST}"
update_env_file "GATSBY_HOST" "http://frontend.${VIRTUAL_HOST}"
update_env_file "GATSBY_CLIENT_SECRET" "${secret}"