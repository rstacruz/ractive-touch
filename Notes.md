Releasing new versions:

    bump *.json
    npm test && npm publish && git release v1.0.0

Updating the website:

    vim sandbox/index.html  # update the script links
    make deploy
