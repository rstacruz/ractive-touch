bin = ./node_modules/.bin
browserify = $(bin)/browserify

sandbox/index.js: index.js
	browserify $< > $@
