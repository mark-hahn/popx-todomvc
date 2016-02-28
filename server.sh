
# echo "compile todomvc with debug"
# node-debug --nodejs --harmony /root/dev/apps/popx/compiler/popx.js -co js src/todomvc.popx

# echo "compile todomvc and run in node with no debug"
# node /root/dev/apps/popx/compiler/popx.js -co js src/todomvc.popx
# node --harmony /root/dev/apps/popx-todomvc/js/todomvc.js
 
echo "compile todomvc and run in node with debug"
node /root/dev/apps/popx/compiler/popx.js -co js src/todomvc.popx
node-debug --nodejs --harmony /root/dev/apps/popx-todomvc/js/todomvc.js

# echo "compile todomvc into bundle with debug"
# node-debug --nodejs --harmony \
# /root/dev/apps/popx/compiler/popx.js -o js -bmp js/bundle.js src/todomvc.popx

# echo "compile todomvc into bundle and run in browser"
# node /root/dev/apps/popx/compiler/popx.js -o js -bmp js/bundle.js src/todomvc.popx
# http-server . -p 1999 -o -r

