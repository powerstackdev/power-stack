#!/usr/bin/env bash
##
#source /var/www/.docksal/docksal.env
#source /var/www/.docksal/docksal-local.env
##
### Docker volumes are mounted as root:root by default, so we have to fix permissions on them
sudo chown $(id -u):$(id -g) "/var" || true

sudo chown -R $(id -u):$(id -g) "/var/www/backend/starters/${BACKEND_STARTER}/vendor" || true
sudo chown -R $(id -u):$(id -g) /var/www/frontend/node_modules || true
sudo chown -R $(id -u):$(id -g) "/var/www/frontend/starters/${FRONTEND_STARTER}/.cache" || true

sudo chown $(id -u):$(id -g) "/var/www/docs" || true
sudo chown -R $(id -u):$(id -g) "/var/www/docs/.cache" || true
sudo chown -R $(id -u):$(id -g) "/var/www/docs/node_modules" || true
