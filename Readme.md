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

    $ npm i --save ractive-touch

And require it:

```js
require('ractive-touch')
```

It automatically registers itself into `Ractive`.

For those not using npm, it's also available as a [standalone .js 
file](index.js).

Available events
----------------

Tap:

 - `on-tap`

Swipe:

 - `on-swipe`
 - `on-swipeleft`
 - `on-swiperight`
 - `on-swipeup`
 - `on-swipedown`

Pan:

 - `on-pan`
 - `on-panstart`
 - `on-panmove`
 - `on-panend`
 - `on-pancancel`
 - `on-panleft`
 - `on-panright`
 - `on-panup`
 - `on-pandown`

Press:

 - `on-press`

Rotate:

 - `on-rotate`
 - `on-rotatestart`
 - `on-rotatemove`
 - `on-rotateend`
 - `on-rotatecancel`

 [Ractive]: http://ractivejs.org

Options
-------

You can configure options via attributes.

```html
<div on-pan='move' pan-direction='all'>
```

[Tap](http://hammerjs.github.io/recognizer-tap.html):

 * `tap-pointers='1'`
 * `tap-taps='1'`
 * `tap-interval='300'`
 * `tap-time='250'`
 * `tap-threshold='2'`
 * `tap-posThreshold='10'`

[Pan](http://hammerjs.github.io/recognizer-pan.html):

 * `pan-pointers='1'`
 * `pan-threshold='1'`
 * `pan-direction='all'`

[Swipe](http://hammerjs.github.io/recognizer-swipe.html):

 * `swipe-pointers='1'`
 * `swipe-distance='10'`
 * `swipe-direction='all'`
 * `swipe-velocity='0.65'`

[Rotate](http://hammerjs.github.io/recognizer-rotate.html):

 * `rotate-pointers='2'`
 * `rotate-threshold='0'`

[Press](http://hammerjs.github.io/recognizer-press.html):

 * `press-pointers='1'`
 * `press-threshold='5'`
 * `press-time='500'`

## Thanks

**Ractive-touch** © 2014+, Rico Sta. Cruz. Released under the [MIT License].<br>
Authored and maintained by Rico Sta. Cruz with help from [contributors].

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT License]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/ractive-touch/contributors
