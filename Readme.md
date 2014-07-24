ractive-touch
=============

Touch events for [Ractive].

```html
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

Install
-------

    $ npm i --save rstacruz/ractive-touch

And require it:

```js
require('ractive-touch')
```

It automatically registers itself into *Ractive*. For those not using npm, it's 
also available as a [standalone .js file](index.js).

Available events
----------------

[Tap]:

 - `on-tap`

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
 * `pan-direction='all'`

[Swipe]:

 * `swipe-pointers='1'`
 * `swipe-distance='10'`
 * `swipe-direction='all'`
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

## Acknowledgements

Powered by [Hammer.js].

## Thanks

**Ractive-touch** © 2014+, Rico Sta. Cruz. Released under the [MIT License].<br>
Authored and maintained by Rico Sta. Cruz with help from [contributors].

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT License]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/ractive-touch/contributors
[Ractive]: http://ractivejs.org
[Hammer.js]: http://hammerjs.github.io/api.html

[Tap]: http://hammerjs.github.io/recognizer-tap.html
[Pan]: http://hammerjs.github.io/recognizer-pan.html
[Press]: http://hammerjs.github.io/recognizer-press.html
[Rotate]: http://hammerjs.github.io/recognizer-rotate.html
[Swipe]: http://hammerjs.github.io/recognizer-swipe.html
