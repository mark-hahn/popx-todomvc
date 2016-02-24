
echo "compiling todomvc.popx"
popx -xco js src/todomvc.popx

http-server . -p 1999 -o -r
