#! /bin/bash
set -v on

#添加淘宝源
gem sources --remove https://rubygems.org/
gem sources --remove https://rubygems.org/
#添加拼写检查包
gem install scss_lint
gem install ruby-lint
bundle config mirror.https://rubygems.org https://ruby.taobao.org
