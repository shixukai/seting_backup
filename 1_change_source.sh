#! /bin/bash
set -v on

Cur_dir=$(pwd)
sudo cp /etc/apt/sources.list /etc/apt/sources.list_backup
sudo cp -fi $Cur_dir/sources.list /etc/apt/
sudo apt-get update
