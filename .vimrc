execute pathogen#infect()
set nocompatible      " 我们使用的是vim不是vi
syntax on             " 启用语法高亮
filetype on           " 启用文件类型检查
filetype indent on    " 启用文件类型缩进
filetype plugin on    " 启用指定文件类型插
set autoread " 设置当文件被改动时自动载入

"Ctags相关设置
set tags=tags
set autochdir
"设置自动触发滚动的行数
set scrolloff=6
"设定搜索即定位
set incsearch
"设定默认可以使用退格键
set backspace=indent,eol,start
set mouse=a
set expandtab
set tabstop=2
set shiftwidth=2
set nu
set mouse=a
"设定搜索时不区分大小写
set ignorecase
colorscheme darkblue

imap kk <ESC>

" CtrlP 插件配置选项
let g:ctrlp_map = '<c-p>'

"vim-ruby execute
map <F5> :!ruby % <CR>
vmap <c-c> "+y
"****************************************************************
"vim-trailing-whitespace
map <leader><space> :FixWhitespace<cr>
"****************************************************************
"closetag配置
let g:closetag_html_style=1

"****************************************************************
"syntastic配置
set statusline+=%#warningmsg#
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*
let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 0
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0
let g:syntastic_ruby_checkers = ['mri']
let g:syntastic_ruby_mri_exec = '/Users/Douya/.rbenv/versions/2.2.3/bin/ruby'
let g:syntastic_javascript_checkers = ['eslint', 'jshint']

"****************************************************************

"****************************************************************
"Track the engine.
"Plugin 'SirVer/ultisnips'

" Snippets are separated from the engine. Add this if you want them:
"Plugin 'honza/vim-snippets'

" Trigger configuration. Do not use <tab> if you use
"https://github.com/Valloric/YouCompleteMe.
let g:UltiSnipsExpandTrigger="<tab>"
let g:UltiSnipsJumpForwardTrigger="<c-b>"
let g:UltiSnipsJumpBackwardTrigger="<c-z>"

" If you want :UltiSnipsEdit to split your window.
let g:UltiSnipsEditSplit="vertical"
"****************************************************************




"****************************************************************
"autocmd vimenter * NERDTree
autocmd StdinReadPre * let s:std_in=1
autocmd VimEnter * if argc() == 0 && !exists("s:std_in") | NERDTree | endif
"close vim if the only window left open is a NERDTree
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTreeType") && b:NERDTreeType == "primary") | q | endif
"nerdTee窗口宽度
let NERDTreeWinSize = 20
"****************************************************************

"设置Tagbar启动快捷键
nmap <F8> :TagbarToggle<CR>



"****************************************************************
"设置打开CtrlSF的快捷键为ctrl+f
nmap     <C-f> <Plug>CtrlSFPrompt
"ss......................适用于normal模式，搜索当前光标所在的单词
nmap ss :CtrlSF <C-R><C-W><CR>
"ss......................适用于visual模式，搜索当前选中的文字
vnoremap ss y:CtrlSF <C-R>"<CR>
"设置默认搜索根目录为工程根目录
let g:ctrlsf_default_root = 'project'
"设置默认启用正则表达式
let g:ctrlsf_regex_pattern = 1
"defines where CtrlSf places its window. Possible values are left, right, top "and bottom. If nothing specified, the default value is left
let g:ctrlsf_position = 'bottom'
"****************************************************************
"vim-surround设置
let g:surround_45 = "<%- \r %>"
let g:surround_61 = "<%= \r %>"


"****************************************************************
" airline设置
set laststatus=2
" 使用powerline打过补丁的字体
let g:airline_powerline_fonts = 1
" 开启tabline
let g:airline#extensions#tabline#enabled = 1
" tabline中当前buffer两端的分隔字符
let g:airline#extensions#tabline#left_sep = ' '
" tabline中未激活buffer两端的分隔字符
let g:airline#extensions#tabline#left_alt_sep = '|'
" tabline中buffer显示编号
let g:airline#extensions#tabline#buffer_nr_show = 1
" 映射切换buffer的键位
nnoremap [b :bp<CR>
nnoremap ]b :bn<CR>
"让airline显示颜色
set t_Co=256
"****************************************************************



"##############################################################
"以下是vundle配置
"##############################################################
set nocompatible              " be iMproved, required
filetype off                  " required

"set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')

" let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'

" The following are examples of different formats supported.
" Keep Plugin commands between vundle#begin/end.
" plugin on GitHub repo
"#f.vim'#######################################################
"########################################################
"bling/vim-airline
Plugin 'bling/vim-airline'

Bundle 'dyng/ctrlsf.vim'
Plugin 'scrooloose/syntastic'
Plugin 'rking/ag.vim'
"majutsushi/tagbar
Plugin 'https://github.com/majutsushi/tagbar.git'

Plugin 'Yggdroot/indentLine'
"CtrlP
Plugin 'https://github.com/kien/ctrlp.vim.git'
"vim-snippets
Plugin 'MarcWeber/vim-addon-mw-utils'
Plugin 'tomtom/tlib_vim'
Plugin 'SirVer/ultisnips'
Plugin 'honza/vim-snippets'
"NERD Tree
Plugin 'https://github.com/scrooloose/nerdtree.git'
"slim-template/vim-slim
Bundle 'slim-template/vim-slim.git'
"tpope/vim-rails
Plugin 'tpope/vim-rails'

Bundle 'vim-ruby/vim-ruby'
"tpope/vim-endwise
Plugin 'https://github.com/tpope/vim-endwise.git'
"scrooloose/nerdcommenter快速注释插件
Plugin 'https://github.com/scrooloose/nerdcommenter.git'
"tpope/vim-surround
Plugin 'tpope/vim-surround'
"terryma/vim-multiple-cursors
Plugin 'terryma/vim-multiple-cursors'

Bundle 'vim-scripts/matchit.zip'
Bundle 'Valloric/MatchTagAlways'
Bundle 'docunext/closetag.vim'
Bundle 'bronson/vim-trailing-whitespace'

"#########################################################
"#########################################################
" All of your Plugins must be added before the following line
call vundle#end()            " required
filetype plugin indent on    " required
" To ignore plugin indent changes, instead use:
"filetype plugin on
"
" Brief help
" :PluginList       - lists configured plugins
" :PluginInstall    - installs plugins; append `!` to update or just :PluginUpdate
" :PluginSearch foo - searches for foo; append `!` to refresh local cache
" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal
"
" see :h vundle for more details or wiki for FAQ
" Put your non-Plugin stuff after this line
"##############################################################

execute pathogen#infect()
