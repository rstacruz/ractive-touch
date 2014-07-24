bin = ./node_modules/.bin
browserify = $(bin)/browserify

sandbox/index.js: index.js
	browserify $< > $@

deploy:
	git subtree push --prefix sandbox origin gh-pages
