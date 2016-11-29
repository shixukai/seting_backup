"execute pathogen#infect()
set nocompatible      " 我们使用的是vim不是vi
syntax on             " 启用语法高亮
filetype on           " 启用文件类型检查
filetype indent on    " 启用文件类型缩进
filetype plugin on    " 启用指定文件类型插
set autoread " 设置当文件被改动时自动载入
set autoindent
"Ctags相关设置
set tags=tags
"set autochdir
"设置自动触发滚动的行数
set scrolloff=6
"设定搜索即定位
set incsearch
set hlsearch
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
"colorscheme darkblue
colorscheme molokai

"set cursorline
"hi CursorLine term=bold cterm=bold guibg=Grey40
"set cursorcolumn
"hi CursorColumn term=bold cterm=bold guibg=Grey40

"*****************************************************
"设定macvim默认字体
set guifont=Droid\ Sans\ Mono\ for\ Powerline:h12
"设定菜单语言
set langmenu=zh_CN.UTF-8
"*****************************************************

let g:rehash256 = 1
"启用html格式化插件,见:help xml-plugin
filetype plugin on

imap kk <ESC>

" CtrlP 插件配置选项
let g:ctrlp_map = '<c-p>'
set wildignore+=*/tmp/*,*.so,*.swp,*.zip     " MacOSX/Linux"
set wildignore+=vendor/rails/**
set wildignore+=vendor/cache/**
set wildignore+=public/static/spm_modules/**
set wildignore+=public/static/node_modules/**
let g:ctrlp_custom_ignore = '\v[\/]\.(git|hg|svn)$'
let g:ctrlp_use_caching = 0
let g:ctrlp_user_command = 'ag %s -l --nocolor -g ""'
set grepprg=ag\ --nogroup\ --nocolor

"vim-ruby execute
"map <F5> :!ruby % <CR>
:let mapleader = ","

nmap <silent> <leader>ee :e $MYVIMRC<CR>
nmap <silent> <leader>so :so $MYVIMRC<CR>
nnoremap <silent> <Leader>+ :exe "resize " . (winheight(0) * 3/2)<CR>
nnoremap <silent> <Leader>- :exe "resize " . (winheight(0) * 2/3)<CR>
nnoremap <silent> <Leader>< :exe "vertical resize " . (winwidth(0) * 3/2)<CR>
nnoremap <silent> <Leader>> :exe "vertical resize " . (winwidth(0) * 2/3)<CR>
vmap <C-c> "+y
map <Leader>p "+p
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
let g:syntastic_javascript_checkers = ['eslint']

"****************************************************************
"easymotion 配置
"****************************************************************
let g:EasyMotion_smartcase = 1
"let g:EasyMotion_startofline = 0 " keep cursor colum when JK motion
map <Leader><leader>h <Plug>(easymotion-linebackward)
map <Leader><Leader>j <Plug>(easymotion-j)
map <Leader><Leader>k <Plug>(easymotion-k)
map <Leader><leader>l <Plug>(easymotion-lineforward)
" 重复上一次操作, 类似repeat插件, 很强大
map <Leader><leader>. <Plug>(easymotion-repeat)

"****************************************************************
<<<<<<< .merge_file_U8Ii2k
""Track the engine.
""Plugin 'SirVer/ultisnips'

"" Snippets are separated from the engine. Add this if you want them:
""Plugin 'honza/vim-snippets'

"" Trigger configuration. Do not use <tab> if you use
""https://github.com/Valloric/YouCompleteMe.
"let g:UltiSnipsExpandTrigger="<tab>"
"let g:UltiSnipsJumpForwardTrigger="<c-b>"
"let g:UltiSnipsJumpBackwardTrigger="<c-z>"

"" If you want :UltiSnipsEdit to split your window.
"let g:UltiSnipsEditSplit="vertical"
=======
"
"****************************************************************
"
"****************************************************************
"
"****************************************************************
"Vim will look for a tags file in the directory of the current file first, then in the current directory, then up and up until it reaches $HOME.
"in shell: $ctags -R --exclude=node_modules --exclude=.meteor --exclude='packages/*/.build/'
set tags=./tags,tags;$HOME
autocmd BufWritePost,FileWritePost *.js silent! !jsctags . &
"****************************************************************

>>>>>>> .merge_file_Pv1OXx
"****************************************************************
"jsx
let g:jsx_ext_required = 0
"****************************************************************

function! CopyProjectFileName()
  let @*= expand("%")
  echo expand("%")
endfunction

function! CopyFileName()
  let @*= expand("%:p")
  echo expand("%:p")
endfunction

map <Leader>fs :call CopyFileName()<CR>
map <Leader>fl :call CopyProjectFileName()<CR>

"****************************************************************
"autocmd vimenter * NERDTree
map <Leader>n :NERDTreeToggle<CR>
map <leader>r :NERDTreeFind<cr>
autocmd StdinReadPre * let s:std_in=1
autocmd VimEnter * if argc() == 0 && !exists("s:std_in") | NERDTree | endif
"默认光标在右侧文件编辑区
autocmd VimEnter * wincmd w
"close vim if the only window left open is a NERDTree
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTreeType") && b:NERDTreeType == "primary") | q | endif
"nerdTee窗口宽度
let NERDTreeWinSize = 20
" NERDTress File highlighting
function! NERDTreeHighlightFile(extension, fg, bg, guifg, guibg)
  exec 'autocmd filetype nerdtree highlight ' . a:extension .' ctermbg='. a:bg .' ctermfg='. a:fg .' guibg='. a:guibg .' guifg='. a:guifg
  exec 'autocmd filetype nerdtree syn match ' . a:extension .' #^\s\+.*'. a:extension .'$#'
endfunction

call NERDTreeHighlightFile('jade', 'green', 'none', 'green', '#151515')
call NERDTreeHighlightFile('ini', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('md', 'blue', 'none', '#3366FF', '#151515')
call NERDTreeHighlightFile('yml', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('config', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('conf', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('json', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('html', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('styl', 'cyan', 'none', 'cyan', '#151515')
call NERDTreeHighlightFile('css', 'cyan', 'none', 'cyan', '#151515')
call NERDTreeHighlightFile('coffee', 'Red', 'none', 'red', '#151515')
call NERDTreeHighlightFile('js', 'Red', 'none', '#ffa500', '#151515')
call NERDTreeHighlightFile('php', 'Magenta', 'none', '#ff00ff', '#151515')
"****************************************************************

"设置Tagbar启动快捷键
nmap <F8> :TagbarToggle<CR>



"****************************************************************
"设置打开CtrlSF的快捷键为ctrl+f
nmap ,f <Plug>CtrlSFPrompt
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
"Syntax highlighting and indenting for JSX
Bundle 'vim-scripts/matchit.zip'
Bundle 'Valloric/MatchTagAlways'
Bundle 'docunext/closetag.vim'
Bundle 'bronson/vim-trailing-whitespace'
Plugin 'flazz/vim-colorschemes'
Plugin 'easymotion/vim-easymotion'
"符号自动补全,  :help delimitMate for detailed information.
Bundle 'Raimondi/delimitMate'
Bundle 'mxw/vim-jsx'
Plugin 'pangloss/vim-javascript'
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

"execute pathogen#infect()

set suffixesadd+=.js
