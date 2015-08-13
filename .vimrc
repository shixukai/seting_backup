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
set expandtab
set tabstop=2
set shiftwidth=2
set nu
"设定搜索时不区分大小写
set ignorecase
colorscheme molokai
let g:molokai_original = 1
let g:rehash256 = 1

imap kk <ESC>

" CtrlP 插件配置选项
let g:ctrlp_map = '<c-p>'                  

"vim-ruby execute 
map <F5> :!ruby % <CR>
map <F4> :!rspec <CR>

"autocmd vimenter * NERDTree 
autocmd StdinReadPre * let s:std_in=1  
autocmd VimEnter * if argc() == 0 && !exists("s:std_in") | NERDTree | endif 
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTreeType") && b:NERDTreeType == "primary") | q | endif "close vim if the only window left open is a NERDTree

"nerdTee窗口宽度
let NERDTreeWinSize = 20


"设置Tagbar启动快捷键
nmap <F8> :TagbarToggle<CR>

"defines where CtrlSf places its window. Possible values are left, right, top
"and bottom. If nothing specified, the default value is left
let g:ctrlsf_position = 'bottom'

"设置打开CtrlSF的快捷键为ctrl+f
nmap     <C-f> <Plug>CtrlSFPrompt
"ss......................适用于normal模式，搜索当前光标所在的单词
nmap ss :CtrlSF <C-R><C-W><CR>
"ss......................适用于visual模式，搜索当前选中的文字
vnoremap ss y:CtrlSF <C-R>"<CR>

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
Plugin 'gmarik/Vundle.vim'

" The following are examples of different formats supported.
" Keep Plugin commands between vundle#begin/end.
" plugin on GitHub repo
"#f.vim'#######################################################
"########################################################
"bling/vim-airline
Plugin 'bling/vim-airline'

Bundle 'dyng/ctrlsf.vim'

Plugin 'mileszs/ack.vim'
"majutsushi/tagbar
Plugin 'https://github.com/majutsushi/tagbar.git'

Plugin 'Yggdroot/indentLine'
"CtrlP
Plugin 'https://github.com/kien/ctrlp.vim.git'
"vim-snippets
Plugin 'MarcWeber/vim-addon-mw-utils'
Plugin 'tomtom/tlib_vim'
Plugin 'garbas/vim-snipmate'
Plugin 'honza/vim-snippets'
"NERD Tree
Plugin 'https://github.com/scrooloose/nerdtree.git'
"slim-template/vim-slim
Bundle 'slim-template/vim-slim.git'

Bundle 'vim-ruby/vim-ruby'


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


execute pathogen#infect()
