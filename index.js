;(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['ractive', 'hammerjs'], factory);
  }

  else if (typeof module !== 'undefined') {
    factory(require('ractive'), require('hammerjs'));
  }

  else {
    factory(root.Ractive, root.Hammer);
  }

}(this, function (Ractive, Hammer) {

  // Check the recognizers documentation.
  // http://hammerjs.github.io/recognizer-tap

  var defaults = {
    tap: {
      recognizerClass: Hammer.Tap,
      options: {
        time: 500
      },
      events: [
        'tap' 
      ]
    },
    doubletap: {
      recognizerClass: Hammer.Tap,
      options: {
        taps: 2,
        event: 'doubletap'
      },
      recognizeWith: ['tap'],
      events: [
        'doubletap' 
      ]
    },
    swipe: {
      recognizerClass: Hammer.Swipe,
      options: {},
      events: [
        'swipe',
        'swipeleft',
        'swiperight',
        'swipeup',
        'swipedown' 
      ]
    },
    pan: {
      recognizerClass: Hammer.Pan,
      options: {
        direction: Hammer.DIRECTION_HORIZONTAL
      },
      recognizeWith: ['swipe'],
      events: [
        'pan',
        'panstart',
        'panmove',
        'panend',
        'pancancel',
        'panleft',
        'panright',
        'panup',
        'pandown' 
      ]
    },
    press: {
      recognizerClass: Hammer.Press,
      options: {},
      events: [
        'press' 
      ]
    },
    rotate: {
      recognizerClass: Hammer.Rotate,
      options: {},
      events: [
        'rotate',
        'rotatestart',
        'rotatemove',
        'rotateend',
        'rotatecancel' 
      ]
    },
    pinch: {
      recognizerClass: Hammer.Pinch,
      options: {},
      recognizeWith: ['rotate'],
      events: [
        'pinch',
        'pinchstart',
        'pinchmove',
        'pinchend',
        'pinchcancel',
        'pinchin',
        'pinchout' 
      ]
    }
  };

  var aliases;

  // bind all events using buildEvent
  for (var recognizerName in defaults) {
    if (!defaults.hasOwnProperty(recognizerName)) continue;
    
    var events = defaults[recognizerName].events;
    for (var i = 0; i < events.length; i++) {
      buildEvent(events[i], recognizerName, defaults[recognizerName]);
    }
  }

  /**
   * buildEvent : buildEvent(event, recognizerName, config)
   * (private) registers an event handler for buildEvent.
   *
   *     buildEvent('panstart', 'pan', { ... });
   */

  function buildEvent(eventName, recognizerName, config) {
    Ractive.events[eventName] = buildEventHandler(eventName, recognizerName, config);
  }

  /**
   * buildEventHandler() : buildEventHandler(event, recognizerName, config)
   * (private) Creates the event handler for a given `eventName` that will be
   * registered to `Ractive.events`.
   */

  function buildEventHandler(eventName, recognizerName, config) {
    return function (node, fire) {
      var hammerManager = getHammerManager(node);

      var recognizerExists = (hammerManager.get(recognizerName) !== null);

      if (!recognizerExists) {
        // init with default options
        var recognizer = new config.recognizerClass(config.options);

        // Hammer.Recognizer.set merges it on top of the defaults supplied above
        var options = parseOptions(node, recognizerName);
        if (options)
          recognizer.set(options);

        hammerManager.add(recognizer);
        
        updateRecognizeWith(hammerManager);
      }

      // register the handler
      hammerManager.on(eventName, function (e) {
        fire({
          node: node,
          original: e
        });
      });

      // handle exits
      function teardown() {
        getHammerManager(node).destroy();
        delete node._hammer;
      }

      return { teardown: teardown };
    };
  }

  /**
   * updateRecognizeWith : updateRecognizeWith(hammerManager)
   * (private) Sets recognizeWith if defaults have it
   *
   * Since we add recognizers dynamically and without any strict order,
   *  we need to guard against trying to set a requireWith for a recognizer
   *  that haven't been created yet.
   * 
   */
  function updateRecognizeWith(hammerManager) {
    for (var i = 0; i < hammerManager.recognizers.length; i++) {
      var recognizer = hammerManager.recognizers[i];
      var recognizerName = recognizer.options.event;

      if (!defaults[recognizerName].hasOwnProperty('recognizeWith')) continue;
      
      var recognizeWiths = defaults[recognizerName].recognizeWith;
      for (var k = 0; k < recognizeWiths.length; k++) {
        // Verify that the recgonizer we're trying to depend on is really there
        if (!hammerManager.get(recognizeWiths[k])) continue;

        // It's safe to recognizeWith multiple times for the same recognizer
        recognizer.recognizeWith(recognizeWiths[k]);
      }
    }
  }

  /**
   * parseOptions : parseOptions(node, key)
   * (private) Returns options for a given DOM node.
   *
   *     node = <div data-swipe-direction='left' data-swipe-threshold='2'>
   *
   *     parseOptions(node, 'swipe')
   *     => { direction: 'left', threshold: 2 }
   */

  function parseOptions(node, key) {
    var attrs = node.attributes,
        output,
        re = new RegExp("^(?:data-)?"+key+"-(.*)$");

    for (var i = attrs.length-1; i >= 0; i--) {
      var attr = attrs[i],
          m = attr.name.match(re);

      if (!m) continue;
      if (!output) output = {};
      output[m[1]] = parseHammerValue(attr.value, m[1]);
    }

    return output;
  }

  /**
   * parseHammerValue : parseHammerValue(str, key)
   * (private) Value-izes a given string `str`, converting it to a number as
   * needed. If `key` is given, it can also resolve aliases for that given
   * key.
   *
   * Used by `getData()`. 
   *
   *     parseHammerValue("100")   => 100
   *     parseHammerValue("right") => "right"
   *     parseHammerValue("right", "direction") => Hammer.DIRECTION_RIGHT
   */

  function parseHammerValue(str, key) {
    if (str.match && str.match(/^-?\d+(?:\.\d+)?$/)) return +str;
    return (aliases[key] && aliases[key][str]) ||
      aliases.all[str] || str;
  }

  /*
   * Aliases for `val()`.
   */

  aliases = {
    all: {
      'true': true,
      'false': false,
      'undefined': undefined,
      'null': null
    },
    direction: {
      'none': Hammer.DIRECTION_NONE,
      'all': Hammer.DIRECTION_ALL,
      'up': Hammer.DIRECTION_UP,
      'down': Hammer.DIRECTION_DOWN,
      'left': Hammer.DIRECTION_LEFT,
      'right': Hammer.DIRECTION_RIGHT,
      'horizontal': Hammer.DIRECTION_HORIZONTAL,
      'vertical': Hammer.DIRECTION_VERTICAL
    }
  };

  /**
   * getHammerManager : getHammerManager(node)
   * (private) Returns the `HammerManager` instance for the given node.
   */

  function getHammerManager(node) {
    if (node._hammer) return node._hammer;

    node._hammer = new Hammer.Manager(node, {recognizers: []});
    return node._hammer;
  }


  return {defaults: defaults};

}));
