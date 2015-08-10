#! /bin/bash
set -v on

#安装Chrome
cd ~
if [ ! -f "google-chrome-stable_current_amd64.deb" ]; then
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb
else
echo 安装包已存在,开始安装
sudo dpkg -i google-chrome-stable_current_amd64.deb
fi

#安装基础包
sudo apt-get install autoconf automake bison build-essential curl exuberant-ctags git-core libreadline6 libreadline6-dev libreadline-dev libsqlite3-0 libsqlite3-dev libssl-dev libyaml-dev libc6-dev libncurses5-dev libtool libxml2-dev libxslt1-dev openssl sqlite3 subversion zlib1g zlib1g-dev software-properties-common imagemagick libmagickwand-dev libpcre3-dev libcurl4-openssl-dev wget htop iftop python-pycurl libpq-dev node.js

sudo apt-get update
sudo apt-get install git
sudo apt-get install ack-grep
sudo apt-get install zsh
sudo apt-get install vim-syntastic

#安装pathogen
mkdir -p ~/.vim/autoload ~/.vim/bundle && \
curl -LSso ~/.vim/autoload/pathogen.vim https://tpo.pe/pathogen.vim
#安装vundle
cd ~/.vim/bundle
git clone https://github.com/gmarik/Vundle.vim.git ~/.vim/bundle/Vundle.vim


#airline字体安装及设置
cd ~/.vim/bundle
git clone https://github.com/powerline/fonts.git
cd fonts
./install.sh
cd ~
wget https://github.com/powerline/powerline/raw/develop/font/PowerlineSymbols.otf
wget https://github.com/powerline/powerline/raw/develop/font/10-powerline-symbols.conf
mv PowerlineSymbols.otf ~/.fonts/
fc-cache -vf ~/.fonts/
mkdir -p ~/.config/fontconfig/conf.d/
mv 10-powerline-symbols.conf ~/.config/fontconfig/conf.d/
fc-cache -vf ~/.fonts/

#安装rbenv及配置
git clone https://github.com/sstephenson/rbenv.git ~/.rbenv
git clone https://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build

#安装oh-my-zsh
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
#设置oh-my-zsh为默认shell
chsh -s /bin/zsh

