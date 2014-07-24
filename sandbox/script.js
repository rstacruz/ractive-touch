var Sandbox = Ractive.extend({
  template: [
    "<div class='the-box' id='box'",
    "data-swipe-distance='100'",
    "on-tap='tap'",
    "on-swipeleft='swipeleft'",
    "on-swiperight='swiperight'",
    "><"+"/div>"
  ].join(" "),

  init: function () {
    this.on(this.eventHandlers);
  },

  eventHandlers: {
    tap: function (e) {
      console.log('tap', e.original);
    },
    swiperight: function (e) {
      console.log('swiperight', e.original);
    },
    swipeleft: function (e) {
      console.log('swipeleft', e.original);
    },
  }
});

new Sandbox({ el: '#sandbox' });
