#! /bin/bash

yarn --cwd frontend run prettier packages -w
yarn --cwd frontend run eslint --fix packages
