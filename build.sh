#!/bin/sh

# Cài LibreOffice
apt-get update && apt-get install -y libreoffice

# Cài dependencies
yarn install --frozen-lockfile

# Chạy server
yarn start
