
# script to compile popx todomvc web app and start serving it

echo "compiling todomvc.popx"

node /root/dev/apps/popx/compiler/popx.js -xco js src/todomvc.popx
# node-debug --nodejs --harmony /root/dev/apps/popx/compiler/popx.js -xco js src/todomvc.popx


# http-server . -p 1999 -o -r
