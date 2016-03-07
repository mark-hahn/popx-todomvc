
set -e

# echo "compile todomvc.popx with no debug"
# node --harmony /root/dev/apps/popx/compiler/popx.js -co js src/todomvc.popx

# echo "compile todomvc.popx with debug"
# node-debug --nodejs --harmony /root/dev/apps/popx/compiler/popx.js -co js src/todomvc.popx

# echo "compile todomvc.popx and run in node with no debug"
# node /root/dev/apps/popx/compiler/popx.js -co js src/todomvc.popx
# node --harmony /root/dev/apps/popx-todomvc/js/todomvc.js
 
# echo "compile todomvc.popx and run in node with debug"
# node /root/dev/apps/popx/compiler/popx.js -co js src/todomvc.popx
# node-debug --nodejs --harmony /root/dev/apps/popx-todomvc/js/todomvc.js

# echo "compile todomvc.popx into bundle with debug"
# node-debug --nodejs --harmony \
# /root/dev/apps/popx/compiler/popx.js -o js -bmp js/bundle.js src/todomvc.popx

# echo "compile todomvc.popx into bundle and run in browser"
# node /root/dev/apps/popx/compiler/popx.js -o js -bmp js/bundle.js src/todomvc.popx
# http-server . -p 1999 -o -r


echo "compile todomvc.popx with no debug"
node --harmony /root/dev/apps/popx/compiler/popx.js -co js src/server.popx

# echo "compile server.popx with debug"
# node-debug --nodejs --harmony /root/dev/apps/popx/compiler/popx.js -co js src/server.popx

# echo "compile server.popx and run in node with no debug"
# node /root/dev/apps/popx/compiler/popx.js -co js src/server.popx
# node --harmony /root/dev/apps/popx-todomvc/js/server.js
 
# echo "compile server.popx and run in node with debug"
# node /root/dev/apps/popx/compiler/popx.js -co js src/server.popx
# node-debug --nodejs --harmony /root/dev/apps/popx-todomvc/js/server.js

# echo "compile server.popx into bundle with debug"
# node-debug --nodejs --harmony \
# /root/dev/apps/popx/compiler/popx.js -o js -bmp js/bundle.js src/server.popx

# echo "compile server.popx into bundle and run in browser"
# node /root/dev/apps/popx/compiler/popx.js -o js -bmp js/bundle.js src/server.popx
# http-server . -p 1999 -o -r
