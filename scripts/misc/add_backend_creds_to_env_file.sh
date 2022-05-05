#! /bin/bash
. ./scripts/misc/globals.sh

cd "${PROJECT_ROOT}/backend/starters/${BACKEND_STARTER}"

update_env_file "GATSBY_CLIENT_ID" $(drush eval "echo \Drupal::entityTypeManager()->getStorage('consumer')->load(2)->uuid->value;")
update_env_file "GATSBY_DRUPAL_KEY" $(drush eval "echo \Drupal::entityTypeManager()->getStorage('user')->load(2)->api_key->value;")