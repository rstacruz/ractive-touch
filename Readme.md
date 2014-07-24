ractive-touch
=============

Touch events for [Ractive].

```html
<button on-swipeleft="buttonSwipe">
```

```js
.on('buttonSwipe', function (e) {
  e.original.deltaX
  e.original.deltaY
  e.original.direction // 0,1,2,3
  e.original.pointerType // "mouse"
  e.original.velocity // 1.62
  e.original.velocityX
  e.original.velocityY
})
```

Usage
-----

```js
require('ractive-touch')
```

It automatically registers itself into `Ractive`.

Available events
----------------

 - `on-tap`
 - `on-swipe`
 - `on-swipeleft`
 - `on-swiperight`
 - `on-swipeup`
 - `on-swipedown`
 - `on-pan`
 - `on-panstart`
 - `on-panmove`
 - `on-panend`
 - `on-pancancel`
 - `on-panleft`
 - `on-panright`
 - `on-panup`
 - `on-pandown`
 - `on-press`
 - `on-rotate`
 - `on-rotatestart`
 - `on-rotatemove`
 - `on-rotateend`
 - `on-rotatecancel`

 [Ractive]: http://ractivejs.org

## Thanks

**Ractive-touch** © 2014+, Rico Sta. Cruz. Released under the [MIT License].<br>
Authored and maintained by Rico Sta. Cruz with help from [contributors].

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT License]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/ractive-touch/contributors
