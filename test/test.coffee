require './setup'

describe 'Ractive-touch:', ->

  describe 'loading', ->
    it 'sets Ractive.events', ->
      expect(Ractive.events.tap).be.a 'function'
      expect(Ractive.events.swipe).be.a 'function'
      expect(Ractive.events.swipeleft).be.a 'function'

  beforeEach ->
    @hammer = -> @view?.nodes?.div?._hammer

  describe 'a simple case a decimal option', ->
    beforeEach ->
      View = Ractive.extend
        template: "<div id='div' on-swipeleft='x' swipe-velocity='0.5'>"
      @view = new View(el: 'body')

    it 'sets the right velocity (float)', ->
      v = @hammer().get('swipe').options.velocity
      expect(v).be.a 'number'
      expect(v).eql 0.5

  describe 'a simple case with options', ->
    beforeEach ->
      sinon.spy Hammer.Manager::, 'on'
      View = Ractive.extend
        template: "<div id='div' on-swipeleft='x' swipe-direction='left' swipe-threshold='123' swipe-xyz='aaa'>"
      @view = new View(el: 'body')

    afterEach ->
      @view.teardown()

    it 'binds the hammer event', ->
      expect(Hammer.Manager::on).calledOnce
      expect(Hammer.Manager::on.firstCall.args[0]).eql 'swipeleft'

    it 'creates a hammer instance', ->
      expect(@hammer()).be.a 'object'

    it 'creates the recognizer', ->
      expect(@hammer().get('swipe')).be.a 'object'

    it 'sets swipe direction (direction)', ->
      expect(@hammer().get('swipe').options.direction).eql Hammer.DIRECTION_LEFT

    it 'sets swipe threshold (int)', ->
      expect(@hammer().get('swipe').options.threshold).eql 123

    it 'sets swipe xyz (string)', ->
      expect(@hammer().get('swipe').options.xyz).eql 'aaa'
