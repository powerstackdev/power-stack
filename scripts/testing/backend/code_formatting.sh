#! /bin/bash

phpcbf \
    --standard="Drupal,DrupalPractice" -n \
    --extensions="php,module,inc,install,test,profile,theme" \
    --ignore="*.features.*,*.pages*.inc,*vendor/*" \
    backend/packages

phpcs \
    --standard="Drupal,DrupalPractice" -n \
    --extensions="php,module,inc,install,test,profile,theme" \
    --ignore="*.features.*,*.pages*.inc,*vendor/*" \
    backend/packages
