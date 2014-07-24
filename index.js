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
    tap: ['tap'],
    swipe: ['swipeleft', 'swiperight', 'swipeup', 'swipedown'],
    pan: ['pan', 'panstart', 'panmove', 'panend', 'pancancel',
      'panleft', 'panright', 'panup', 'pandown'],
    press: ['press'],
    rotate: ['rotate', 'rotatestart', 'rotatemove', 'rotateend',
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
      // set options
      var attr = 'data-' + (parent || eventName),
          json = node.getAttribute(attr),
          opts;

      // try to get options
      if (json) {
        try {
          opts = JSON.parse(json);
        } catch (e) {
          throw new Error("ractive-touch: invalid "+attr+" value: "+json);
        }
        hammer(node).set(eventName, opts);
      }

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
   * hammer : hammer(node)
   * (private) Returns the `HammerManager` instance for the given node.
   */

  function hammer (node) {
    if (node._hammer) return node._hammer;
    console.log("Registering hammer", node);
    node._hammer = new Hammer(node, {});
    return node._hammer;
  }

  window.Hammer = Hammer;

}));
