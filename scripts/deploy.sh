# clean up last version

# build
sh scripts/build.sh

# minify JS
browserify bundle.js \
  -g [ envify --NODE_ENV production ] \
  -g uglifyify \
  | uglifyjs --compress --mangle > ../wp-content/themes/visitmcminn/js/bundle.min.js
# npx uglify -s bundle.js -o bundle.min.js
# cp bundle.min.js ../wp-content/themes/visitmcminn/js/

# done
date; echo;
osascript -e 'display notification "Complete" with title "React" subtitle "Deploy" sound name "Frog"'
