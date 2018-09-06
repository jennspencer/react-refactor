#notification
osascript -e 'display notification "Start" with title "React" subtitle "Build"'

#js transforms 
babel --presets react,es2015,stage-3 js/src -d js/build

#js package
browserify js/build/app.js -o bundle.js --debug

#done
date; echo;
osascript -e 'display notification "Complete" with title "React" subtitle "Build" sound name "Frog"'
