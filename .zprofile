alias fuwu='lsof -Pni4 | grep LISTEN'

function unsetproxy() {
  unset {http,https,ftp}_proxy
}

function de() {
  cmd="$@"
  docker-compose exec dev bash -lc "$cmd"
}

alias dr='docker run --rm -it -v `pwd`:`pwd` -w `pwd`'
