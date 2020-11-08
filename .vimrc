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
"设定搜索时不区分大小写
set ignorecase
"colorscheme darkblue
colorscheme molokai
"colorscheme falcon
"set cursorline
"hi CursorLine term=bold cterm=bold guibg=Grey40
hi CursorLine gui=underline cterm=underline ctermfg=None

" 自动换行时不自动添加注释, see :help fo-table
set formatoptions-=ro

" replace-paste yanked text in vim without yanking the deleted lines
vnoremap p "_dP

"*****************************************************
"css 自动补全设置
:imap <tab> <c-x><c-o>
autocmd FileType css set omnifunc=csscomplete#CompleteCSS
"*****************************************************

"set cursorline
"hi CursorLine term=bold cterm=bold guibg=Grey40
"set cursorcolumn
"hi CursorColumn term=bold cterm=bold guibg=Grey40

"*****************************************************
"设定macvim默认字体
"set guifont=Droid\ Sans\ Mono\ for\ Powerline:h16
set guifont=Knack\ Regular\ Nerd\ Font\ Complete:h16
"设定菜单语言
set encoding=utf-8
set langmenu=zh_CN.UTF-8
"*****************************************************

"let g:rehash256 = 1
""启用html格式化插件,见:help xml-plugin
"filetype plugin on

"imap kk <ESC>

"" CtrlP 插件配置选项
"let g:ctrlp_map = '<c-p>'
"let g:ctrlp_cmd = 'CtrlP'
"let g:ctrlp_max_files = 0
"let g:ctrlp_max_depth= 40
"let g:ctrlp_match_current_file = 1
"let g:ctrlp_by_filename=1
"let g:ctrlp_regexp = 1
"let g:ctrlp_follow_symlinks=1
"let g:ctrlp_working_path_mode='ra'
"" set wildignore+=*/tmp/*,*.so,*.swp,*.zip     " MacOSX/Linux"
"set wildignore+=*/tmp/*,*.so,*.swp,*.zip,*/vendor/*,*/\.git/*
"set wildignore+=vendor/rails/**
"set wildignore+=vendor/cache/**
"set wildignore+=public/static/spm_modules/**
"set wildignore+=public/static/node_modules/**
"set wildignore+=node_modules/**
"set wildignore+=test/**
"set wildignore+=build/**
""let g:ctrlp_custom_ignore = '\v[\/]\.(git|hg|svn)$'
""
"let g:ctrlp_custom_ignore = {
    "\ 'dir':  '\v[\/]\.(git|hg|svn|rvm)$',
    "\ 'file': '\v\.(exe|so|dll|zip|tar|tar.gz|pyc)$',
    "\ }
""let g:ctrlp_show_hidden = 1
"if executable('ag')
  "" Use Ag over Grep
  "set grepprg=ag\ --nogroup\ --nocolor
  "" Use ag in CtrlP for listing files.
  "let g:ctrlp_user_command = 'ag --hidden --ignore .git %s -l --nocolor -g ""'
  "" Ag is fast enough that CtrlP doesn't need to cache
  "let g:ctrlp_use_caching = 1
"endif

"*****************************************************

"vim make
"map <F5> :!make ll% <CR>
map <F5> :!make all <CR>

:map j gj
:map k gk

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
let target_buffer = 1
while target_buffer <= 99
  execute "nnoremap " . target_buffer . "gb :" . target_buffer . "b\<CR>"
  let target_buffer += 1
endwhile

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

map <Leader>cfs :call CopyFileName()<CR>
map <Leader>cfl :call CopyProjectFileName()<CR>

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
"function! NERDTreeHighlightFile(extension, fg, bg, guifg, guibg)
  "exec 'autocmd filetype nerdtree highlight ' . a:extension .' ctermbg='. a:bg .' ctermfg='. a:fg .' guibg='. a:guibg .' guifg='. a:guifg
  "exec 'autocmd filetype nerdtree syn match ' . a:extension .' #^\s\+.*'. a:extension .'$#'
"endfunction
let NERDTreeShowHidden=1
let NERDTreeNodeDelimiter = "\t"

"call NERDTreeHighlightFile('jade', 'green', 'none', 'green', '#151515')
"call NERDTreeHighlightFile('ini', 'yellow', 'none', 'yellow', '#151515')
"call NERDTreeHighlightFile('md', 'blue', 'none', '#3366FF', '#151515')
"call NERDTreeHighlightFile('yml', 'yellow', 'none', 'yellow', '#151515')
"call NERDTreeHighlightFile('config', 'yellow', 'none', 'yellow', '#151515')
"call NERDTreeHighlightFile('conf', 'yellow', 'none', 'yellow', '#151515')
"call NERDTreeHighlightFile('json', 'yellow', 'none', 'yellow', '#151515')
"ghtcall NERDTreeHighlightFile('html', 'yellow', 'none', 'yellow', '#151515')
"call NERDTreeHighlightFile('styl', 'cyan', 'none', 'cyan', '#151515')
"call NERDTreeHighlightFile('css', 'cyan', 'none', 'cyan', '#151515')
"call NERDTreeHighlightFile('coffee', 'Red', 'none', 'red', '#151515')
"call NERDTreeHighlightFile('js', 'Red', 'none', '#ffa500', '#151515')
"call NERDTreeHighlightFile('php', 'Magenta', 'none', '#ff00ff', '#151515')
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
let g:ctrlsf_search_mode = 'async'
"****************************************************************
"vim-surround设置
let g:surround_45 = "<%- \r %>"
let g:surround_61 = "<%= \r %>"

"****************************************************************
" vim-cpp-enhanced-highlight
let g:cpp_class_scope_highlight = 1
let g:cpp_member_variable_highlight = 1
let g:cpp_class_decl_highlight = 1
let g:cpp_experimental_simple_template_highlight = 1
let g:cpp_concepts_highlight = 1
let g:cpp_no_function_highlight = 1

"****************************************************************
" YouCompleteMe
let g:ycm_show_diagnostics_ui = 1
let g:ycm_server_log_level = 'info'
let g:ycm_min_num_identifier_candidate_chars = 1
let g:ycm_collect_identifiers_from_comments_and_strings = 1
let g:ycm_complete_in_strings = 1
let g:ycm_key_invoke_completion = '<c-z>'
let g:ycm_add_preview_to_completeopt = 1
let g:ycm_autoclose_preview_window_after_insertion = 1
let g:ycm_autoclose_preview_window_after_completion = 0
let g:ycm_auto_trigger = 1
let g:ycm_min_num_of_chars_for_completion = 0
set completeopt=menu,menuone

noremap <c-z> <NOP>

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
let g:airline_highlighting_cache=1

"****************************************************************
" w0rp/ale
" show status :ALEInfo
let g:ale_lint_on_save = 1
let g:ale_lint_on_enter = 0
let g:ale_set_highlights = 1
let g:ale_linters = {
      \'jsx': ['stylelint', 'eslint'],
      \'scss': ['sasslint', 'scsslint'],
      \'cpp': ['clangtidy'],
      \}
      "\'cpp': ['gcc', 'clang', 'cppcheck'],
      ""\'cpp': ['clangcheck', 'clangtidy', 'cppcheck'],
let g:ale_c_build_dir_names = ['build', 'release']
let g:ale_linter_aliases = {'jsx': 'css'}
let g:airline#extensions#ale#enabled = 1
let g:ale_c_gcc_options = '-Wall -O2 -std=c99'
let g:ale_cpp_gcc_options = '-Wall -O2 -std=c++11'
let g:ale_cpp_gcc_options = '-Wall -O2 -std=c++17'
"let g:ale_c_cppcheck_options = ''
"let g:ale_cpp_cppcheck_options = ''

set concealcursor=inv
let g:clang_snippets = 1
set completeopt=menu,longest
let g:clang_complete_optional_args_in_snippets = 1
let g:clang_trailing_placeholder = 1
let g:ale_c_parse_makefile = 1
let g:ale_lint_on_text_changed = 'normal'
let g:ale_lint_on_insert_leave = 1

"****************************************************************
" vim-expand-region
"map K <Plug>(expand_region_expand)
"map J <Plug>(expand_region_shrink)

"****************************************************************
let g:rainbow_active = 1

let g:rainbow_load_separately = [
    \ [ '*' , [['(', ')'], ['\[', '\]'], ['{', '}']] ],
    \ [ '*.tex' , [['(', ')'], ['\[', '\]']] ],
    \ [ '*.cpp' , [['(', ')'], ['\[', '\]'], ['{', '}']] ],
    \ [ '*.{html,htm}' , [['(', ')'], ['\[', '\]'], ['{', '}'], ['<\a[^>]*>', '</[^>]*>']] ],
    \ ]

let g:rainbow_guifgs = ['RoyalBlue3', 'DarkOrange3', 'DarkOrchid3', 'FireBrick']
let g:rainbow_ctermfgs = ['lightblue', 'lightgreen', 'yellow', 'red', 'magenta']

"****************************************************************
" don't show the help in normal mode
let g:Lf_HideHelp = 1
let g:Lf_UseCache = 0
let g:Lf_UseVersionControlTool = 0
let g:Lf_IgnoreCurrentBufferName = 1
" popup mode
let g:Lf_WindowPosition = 'popup'
let g:Lf_PreviewInPopup = 1
let g:Lf_StlSeparator = { 'left': "\ue0b0", 'right': "\ue0b2", 'font': "DejaVu Sans Mono for Powerline" }
let g:Lf_PreviewResult = {'Function': 0, 'BufTag': 0 }

let g:Lf_ShortcutF = "<leader>ff"
noremap <leader>fb :<C-U><C-R>=printf("Leaderf buffer %s", "")<CR><CR>
noremap <leader>fm :<C-U><C-R>=printf("Leaderf mru %s", "")<CR><CR>
noremap <leader>ft :<C-U><C-R>=printf("Leaderf bufTag %s", "")<CR><CR>
noremap <leader>fl :<C-U><C-R>=printf("Leaderf line %s", "")<CR><CR>

""noremap <C-B> :<C-U><C-R>=printf("Leaderf! rg --current-buffer -e %s ", expand("<cword>"))<CR>
""noremap <C-F> :<C-U><C-R>=printf("Leaderf! rg -e %s ", expand("<cword>"))<CR>
"" search visually selected text literally
"xnoremap gf :<C-U><C-R>=printf("Leaderf! rg -F -e %s ", leaderf#Rg#visual())<CR>
"noremap go :<C-U>Leaderf! rg --recall<CR>

"" should use `Leaderf gtags --update` first
"let g:Lf_GtagsAutoGenerate = 0
"let g:Lf_Gtagslabel = 'native-pygments'
"noremap <leader>fr :<C-U><C-R>=printf("Leaderf! gtags -r %s --auto-jump", expand("<cword>"))<CR><CR>
"noremap <leader>fd :<C-U><C-R>=printf("Leaderf! gtags -d %s --auto-jump", expand("<cword>"))<CR><CR>
"noremap <leader>fo :<C-U><C-R>=printf("Leaderf! gtags --recall %s", "")<CR><CR>
"noremap <leader>fn :<C-U><C-R>=printf("Leaderf gtags --next %s", "")<CR><CR>
"noremap <leader>fp :<C-U><C-R>=printf("Leaderf gtags --previous %s", "")<CR><CR>

"##############################################################
set nocompatible              " be iMproved, required
filetype off                  " required

" Specify a directory for plugins
" - For Neovim: ~/.local/share/nvim/plugged
" - Avoid using standard Vim directory names like 'plugin'
call plug#begin('~/.vim/plugged')
"########################################################
"bling/vim-airline
Plug 'bling/vim-airline'

"Plug 'octol/vim-cpp-enhanced-highlight'

Plug 'dyng/ctrlsf.vim'
"Plug 'scrooloose/syntastic'
Plug 'rking/ag.vim'
"majutsushi/tagbar
Plug 'majutsushi/tagbar'

Plug 'Yggdroot/indentLine'

"CtrlP
"Plug 'https://github.com/kien/ctrlp.vim.git'
"vim-snippets

"NERD Tree
Plug 'https://github.com/scrooloose/nerdtree.git'
"tpope/vim-rails
"Plug 'tpope/vim-rails'

Plug 'Valloric/YouCompleteMe'
Plug 'rdnetto/YCM-Generator', { 'branch': 'stable' }


"Plug 'vim-ruby/vim-ruby'
"tpope/vim-endwise
"Plug 'terryma/vim-expand-region'
"Plug 'https://github.com/tpope/vim-endwise.git'
"scrooloose/nerdcommenter快速注释插件
Plug 'https://github.com/scrooloose/nerdcommenter.git'
"tpope/vim-surround
Plug 'tpope/vim-surround'
"terryma/vim-multiple-cursors
Plug 'terryma/vim-multiple-cursors'
"Syntax highlighting and indenting for JSX
Plug 'vim-scripts/matchit.zip'
Plug 'Valloric/MatchTagAlways'
Plug 'docunext/closetag.vim'
Plug 'bronson/vim-trailing-whitespace'
Plug 'flazz/vim-colorschemes'
Plug 'easymotion/vim-easymotion'
Plug 'ap/vim-css-color'
"符号自动补全,  :help delimitMate for detailed information.
Plug 'Raimondi/delimitMate'
Plug 'mxw/vim-jsx'
Plug 'pangloss/vim-javascript'
Plug 'w0rp/ale'
Plug 'tiagofumo/vim-nerdtree-syntax-highlight'
" plugin icon
Plug 'ryanoasis/vim-devicons'

" colorscheme
Plug 'fenetikm/falcon'

Plug 'frazrepo/vim-rainbow'

Plug 'Yggdroot/LeaderF', { 'do': './install.sh' }

" Initialize plugin system
" ===============================================================
"PlugInstall [name ...] [#threads]	Install plugins
"PlugUpdate [name ...] [#threads]	Install or update plugins
"PlugClean[!]	Remove unused directories (bang version will clean without prompt)
"PlugUpgrade	Upgrade vim-plug itself
"PlugStatus	Check the status of plugins
"PlugDiff	Examine changes from the previous update and the pending changes
"PlugSnapshot[!] [output path]	Generate script for restoring the current snapshot of the plugins
call plug#end()

"##############################################################
"vim-nerdtree-syntax-highlight
let g:NERDTreeHighlightFolders = 1 " enables folder icon highlighting using exact match
let g:NERDTreeHighlightFoldersFullName = 1 " highlights the folder name
let g:NERDTreeFileExtensionHighlightFullName = 1
let g:NERDTreeExactMatchHighlightFullName = 1
let g:NERDTreePatternMatchHighlightFullName = 1
"Disable uncommon file extensions highlighting (this is a good idea if you are experiencing lag when scrolling)
let g:NERDTreeLimitedSyntax = 1
"##############################################################
" vim-devicons
let g:webdevicons_enable = 1
let g:webdevicons_enable_unite = 1
let g:webdevicons_enable_nerdtree = 1
let g:webdevicons_enable_vimfiler = 1
let g:webdevicons_enable_airline_tabline = 1
let g:webdevicons_enable_airline_statusline = 1
let g:DevIconsEnableFoldersOpenClose = 1
let g:webdevicons_enable_ctrlp = 1
" whether or not to show the nerdtree brackets around flags
let g:webdevicons_conceal_nerdtree_brackets = 1
"let g:WebDevIconsNerdTreeGitPluginForceVAlign = 1
"let g:WebDevIconsUnicodeGlyphDoubleWidth = 1
let g:WebDevIconsNerdTreeAfterGlyphPadding = ' '
let g:WebDevIconsUnicodeDecorateFolderNodes = 1
"##############################################################

set suffixesadd+=.js
