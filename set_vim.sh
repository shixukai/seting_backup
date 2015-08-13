#! /bin/bash
set -v on

#设定vim配置文件链接
Cur_dir=$(pwd)
ln -sf $Cur_dir/.vimrc ~/.vimrc
ln -sf $Cur_dir/colors ~/.vim/colors
