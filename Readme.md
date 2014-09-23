ractive-touch
=============

Touch events for [Ractive]. Supports tap, pan, swipe, rotate, pinch, and press.

*Find more Ractive.js plugins at [docs.ractivejs.org/latest/plugins](http://docs.ractivejs.org/latest/plugins)*

```html
<button on-tap="activate">
<button on-swipeleft="buttonSwipe">
```

```js
ractive.on('buttonSwipe', function (e) {
  e.original.deltaX
  e.original.deltaY
  e.original.direction // 0,1,2,3
  e.original.pointerType // "mouse"
  e.original.velocity // 1.62
  e.original.velocityX
  e.original.velocityY
})
```

[![Status](http://img.shields.io/travis/rstacruz/ractive-touch/master.svg?style=flat)](https://travis-ci.org/rstacruz/ractive-touch)

Install
-------

Ractive-touch is available via npm and Bower.

    $ npm install --save ractive-touch
    $ bower install --save ractive-touch

[![npm version](http://img.shields.io/npm/v/ractive-touch.svg?style=flat)](https://npmjs.org/package/ractive-touch "View this project on npm")

__CommonJS usage:__ Require the module to use it. It automatically registers
itself into either *window.Ractive* or *require('ractive')*, whichever's
available. No need to use the return value.

```js
require('ractive-touch');
```

__Standalone usage:__ For those not using npm, it's also available as a
[standalone .js file](index.js). Be sure to include it after
[ractive.js][Ractive] and [hammer.js][Hammer.js].

__Viewport:__ It's recommended to add a `viewport` meta tag to your HTML
restricting zoom:

```html
<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
```

Available events
----------------

[Tap]:

 - `on-tap`
 - `on-doubletap`

[Swipe]:

 - `on-swipe`
 - `on-swipeleft`
 - `on-swiperight`
 - `on-swipeup`
 - `on-swipedown`

[Pan]:

 - `on-pan`
 - `on-panstart`
 - `on-panmove`
 - `on-panend`
 - `on-pancancel`
 - `on-panleft`
 - `on-panright`
 - `on-panup`
 - `on-pandown`

[Press]:

 - `on-press`

[Rotate]:

 - `on-rotate`
 - `on-rotatestart`
 - `on-rotatemove`
 - `on-rotateend`
 - `on-rotatecancel`

[Pinch]:

 - `on-pinch`
 - `on-pinchstart`
 - `on-pinchmove`
 - `on-pinchend`
 - `on-pinchcancel`
 - `on-pinchin`
 - `on-pinchout`

Options
-------

You can configure options via attributes in your DOM node.
You can use the `data-` attribute convention as well.

```html
<div on-pan='move' pan-direction='all'>
<div on-pan='move' data-pan-direction='all'> <!-- alternate syntax -->
```

[Tap]:

 * `tap-pointers='1'`
 * `tap-taps='1'`
 * `tap-interval='300'`
 * `tap-time='250'`
 * `tap-threshold='2'`
 * `tap-posThreshold='10'`

[Pan]:

 * `pan-pointers='1'`
 * `pan-threshold='1'`
 * `pan-direction='all'` *

[Swipe]:

 * `swipe-pointers='1'`
 * `swipe-distance='10'`
 * `swipe-direction='all'` *
 * `swipe-velocity='0.65'`

[Rotate]:

 * `rotate-pointers='2'`
 * `rotate-threshold='0'`

[Press]:

 * `press-pointers='1'`
 * `press-threshold='5'`
 * `press-time='500'`

[Pinch]:

 * `pinch-pointers='2'`
 * `pinch-threshold='0'`

`*` - directions can be *none, all, up, down, left, right, horizontal, 
  vertical*.

## Thanks

Ractive-touch is written for [Ractive], a live DOM binding library for creating 
interactive UIs.

Touch event detection is powered by [Hammer.js]. Refer to their documentation 
for more details.

:copyright:

**Ractive-touch** © 2014+, Rico Sta. Cruz. Released under the [MIT License].<br>
Authored and maintained by Rico Sta. Cruz with help from [contributors].

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT License]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/ractive-touch/contributors
[Ractive]: http://ractivejs.org
[Hammer.js]: http://hammerjs.github.io/api.html

[Tap]: http://hammerjs.github.io/recognizer-tap
[Pan]: http://hammerjs.github.io/recognizer-pan
[Press]: http://hammerjs.github.io/recognizer-press
[Pinch]: http://hammerjs.github.io/recognizer-pinch
[Rotate]: http://hammerjs.github.io/recognizer-rotate
[Swipe]: http://hammerjs.github.io/recognizer-swip
