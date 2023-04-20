#!/bin/bash -xe

if [[ -z ${DOCKOLITH_VERSION} ]]; then
  export DOCKOLITH_VERSION="1.6.1-g8372d0d"
fi

# Yarn "add" always modifies package.json https://github.com/yarnpkg/yarn/issues/1743
# Make a backup of package.json and restore it after install
# NOTE: export YARN_REGISTRY as env var when running locally
# YARN_REGISTRY={internalRegistry} yarn add @okta/dockolith@1.6.1 -WD --no-lockfile
cp package.json package.json.bak
YARN_REGISTRY=https://artifacts.aue1e.internal/artifactory/api/npm/npm-okta-master yarn add -DW --no-lockfile @okta/dockolith@$DOCKOLITH_VERSION
mv package.json.bak package.json



