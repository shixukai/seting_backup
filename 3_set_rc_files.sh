#! /bin/bash
set -v on

#设定vim配置文件链接
Cur_dir=$(pwd)
rm -rf ~/.aprc
ln -sf $Cur_dir/.aprc ~/.aprc
rm -rf ~/.vimrc
ln -sf $Cur_dir/.vimrc ~/.vimrc
rm -rf ~/.pryrc
ln -sf $Cur_dir/.pryrc ~/.pryrc
rm -rf ~/.vim/colors
ln -sf $Cur_dir/colors ~/.vim/colors
rm -rf ~/.config/terminator
ln -sf $Cur_dir/.config/terminator ~/.config/terminator
rm -rf ~/.tigrc
ln -sf $Cur_dir/.tigrc ~/.tigrc
rm -rf ~/.zshrc
ln -sf $Cur_dir/.zshrc ~/.zshrc
rm -rf ~/.zprofile
ln -sf $Cur_dir/.zprofile ~/.zprofile

#通过Vundle安装vim插件
vim +PluginInstall +qall
