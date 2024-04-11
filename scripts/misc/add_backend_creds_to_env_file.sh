#! /bin/bash
. ./scripts/misc/globals.sh

cd "${PROJECT_ROOT}/backend/starters/${BACKEND_STARTER}"

update_env_file "DRUPAL_CLIENT_ID" $(vendor/bin/drush eval "echo \Drupal::entityTypeManager()->getStorage('consumer')->load(2)->uuid->value;")