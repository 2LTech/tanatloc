#!/bin/bash

set -e

echo "Update hotfix"

## Submodules
submodules() {
    cd tanatloc && git pull && .github/submodules.sh && cd -
}

## Check
check() {
    rm -f yarn.lock
    ./.github/workflows/node.local.sh
}

## Update
update() {
    git add .
    git commit -m"update"
    git push
}

submodules
check
update
