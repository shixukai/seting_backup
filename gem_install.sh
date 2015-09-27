#! /bin/bash
set -v on

#添加淘宝源
gem sources --remove https://rubygems.org/
gem sources -a https://ruby.taobao.org/
#添加拼写检查包
gem install scss_lint
gem install ruby-lint
gem install awesome_print
gem install bundler
bundle config mirror.https://rubygems.org https://ruby.taobao.org
