#!/bin/bash

set -e

# Install
yarn install

# Depcheck
yarn run depcheck

# Lint
yarn run prettier

# Test
yarn run test

# Build
BUILD_VERSION=test yarn dist
