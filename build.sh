#!/bin/bash

# Cập nhật gói
apt-get update && apt-get install -y libreoffice

# Kiểm tra cài đặt
libreoffice --version
