;(function (root, factory) {

  factory(ractive(), hammer());

  function ractive() {
    return root.Ractive || require('ractive');
  }
  function hammer() {
    return root.Hammer || require('hammerjs');
  }

}(this, function (Ractive, Hammer) {

  // http://hammerjs.github.io/recognizer-tap.html
  // http://hammerjs.github.io/recognizer-swipe.html
  // http://hammerjs.github.io/recognizer-pan.html
  // http://hammerjs.github.io/recognizer-press.html
  var Events = {
    tap: [
      'tap' ],
    swipe: [
      'swipe',
      'swipeleft',
      'swiperight',
      'swipeup',
      'swipedown' ],
    pan: [
      'pan',
      'panstart',
      'panmove',
      'panend',
      'pancancel',
      'panleft',
      'panright',
      'panup',
      'pandown'],
    press: [
      'press'],
    rotate: [
      'rotate',
      'rotatestart',
      'rotatemove',
      'rotateend',
      'rotatecancel']
  };

  // bind all events using buildEvent
  for (var parent in Events) {
    if (!Events.hasOwnProperty(parent)) continue;
    var names = Events[parent];
    for (var i = names.length-1; i >= 0; i--) {
      buildEvent(names[i], parent);
    }
  }

  /**
   * buildEvent : buildEvent(event, eventParent)
   * (private) registers an event handler for buildEvent.
   *
   *     buildEvent('panstart', 'pan');
   */

  function buildEvent (eventName, parent) {
    Ractive.events[eventName] = buildEventHandler(eventName, parent);
  }

  /**
   * buildEventHandler : buildEventHandler(event)
   * (private) Creates the event handler for a given `eventName` that will be
   * registered to `Ractive.events`.
   */

  function buildEventHandler (eventName, parent) {
    return function (node, fire) {
      // set hammer options
      var options = getData(node, parent);
      if (options) hammer(node).get(parent).set(options);

      // register the handler
      hammer(node).on(eventName, function (e) {
        fire({
          node: node,
          original: e
        });
      });

      // handle exits
      function teardown() {
        hammer(node).destroy();
        delete node._hammer;
      }

      return { teardown: teardown };
    };
  }

  /**
   * getData : getData(node, key)
   * (private) Returns options for a given DOM node.
   *
   *     node = <div data-swipe-direction='left' data-swipe-threshold='2'>
   *
   *     getData(node, 'swipe')
   *     => { direction: 'left', threshold: 2 }
   */

  function getData (node, key) {
    var attrs = node.attributes,
        output,
        re = new RegExp("^(?:data-)?"+key+"-(.*)$");

    for (var i = attrs.length-1; i >= 0; i--) {
      var attr = attrs[i],
          m = attr.name.match(re);

      if (!m) continue;
      if (!output) output = {};
      output[m[1]] = val(attr.value);
    }

    return output;
  }

  /**
   * val : val(str)
   * (private) Value-izes a given string. Used by `getData()`.
   *
   *     val("100")   => 100
   *     val("true")  => true
   *     val("right") => "right"
   */

  function val (str) {
    if (str.match && str.match(/^-?\d+$/)) return +str;
    if (str === 'true') return true;
    if (str === 'false') return false;
    if (str === 'null') return null;
    if (str === 'undefined') return undefined;
    return str;
  }

  /**
   * hammer : hammer(node)
   * (private) Returns the `HammerManager` instance for the given node.
   */

  function hammer (node) {
    if (node._hammer) return node._hammer;
    node._hammer = new Hammer(node, {});
    return node._hammer;
  }

}));
