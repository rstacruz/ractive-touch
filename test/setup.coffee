# chai
global.expect = require('chai').expect
require('sinon-chai')

# jsdom
before require('./support/jsdom')
global.$ = (sel) -> document.querySelector(sel)

# sinon
beforeEach -> global.sinon = require('sinon').sandbox.create()
afterEach  -> global.sinon.restore()

# libs
before ->
  global.Ractive = require('ractive')
  global.Hammer = require('hammerjs')
  require('../index')

