#-------------------------- Helper Functions --------------------------------
. ./scripts/misc/globals.sh

secret=$(openssl rand -hex 20)
preview_secret=$(openssl rand -hex 20)
revalidate_secret=$(openssl rand -hex 20)

update_env_file "NEXT_DRUPAL_HOST" "http://backend.${VIRTUAL_HOST}"
update_env_file "NEXT_IMAGE_DOMAIN" "http://backend.${VIRTUAL_HOST}"
update_env_file "NEXT_HOST" "http://frontend.${VIRTUAL_HOST}"
update_env_file "DRUPAL_CLIENT_SECRET" "${secret}"
update_env_file "DRUPAL_PREVIEW_SECRET" "${prewview_secret}"
update_env_file "NEXT_REVALIDATE_SECRET" "${revalidate_secret}"
update_env_file "DRUPAL_CLIENT_ID" "next"