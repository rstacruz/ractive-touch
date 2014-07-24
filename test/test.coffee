expect = require('chai').expect

before require('./support/jsdom')

$ = (sel) -> document.querySelector(sel)

before ->
  global.Ractive = require('ractive')
  global.Hammer = require('hammerjs')
  require('../index')

describe 'Ractive-touch:', ->
  describe 'loading', ->
    it 'sets Ractive.events', ->
      expect(Ractive.events.tap).be.a 'function'
      expect(Ractive.events.swipe).be.a 'function'
      expect(Ractive.events.swipeleft).be.a 'function'

  describe 'simple', ->
    beforeEach ->
      View = Ractive.extend
        template: "<div id='div' on-swipe='x' swipe-direction='left' swipe-threshold='123'>"
      @view = new View(el: 'body')
      @hammer = @view?.nodes?.div?._hammer

    afterEach ->
      @view.teardown()

    it 'creates a hammer instance', ->
      expect(@hammer).be.a 'object'

    it 'sets swipe direction (direction)', ->
      expect(@hammer.get('swipe').options.direction).eql Hammer.DIRECTION_LEFT

    it 'sets swipe threshold (int)', ->
      expect(@hammer.get('swipe').options.threshold).eql 123
