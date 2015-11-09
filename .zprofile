alias vi='vim'
alias fuwu='lsof -Pni4 | grep LISTEN'

function setproxy() {
  export {http,https,ftp}_proxy='http://127.0.0.1:8016'
}

function unsetproxy() {
  unset {http,https,ftp}_proxy
}
