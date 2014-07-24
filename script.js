var Sandbox = Ractive.extend({
  template: [
    "<div class='box-container' id='parent'>",
    "<div class='the-box' id='box'",
    "data-swipe-distance='1'",
    "on-tap='tap'",
    "on-pan='pan'",
    "on-panend='panEnd'",
    "on-panstart='panStart'",
    "on-pancancel='panEnd'",
    "on-swipedown='swipedown'",
    "on-swipeup='swipeup'",
    "on-swipeleft='swipeleft'",
    "on-swiperight='swiperight'",
    "><"+"/div>",
    "<"+"/div>"
  ].join(" "),

  init: function () {
    this.on(this.eventHandlers);
  },

  alert: function (msg) {
    var el = document.createElement('div');
    var parent = this.nodes.parent;
    el.className = 'alert-box ' + msg;
    el.innerHTML = msg;
    parent.appendChild(el);
    setTimeout(function () { parent.removeChild(el); }, 500);
  },

  eventHandlers: {
    tap: function (e) {
      console.log('tap', e.original);
      this.alert('tap');
    },
    swipedown: function (e) {
      console.log('swipedown', e.original);
      this.alert('swipedown');
    },
    swipeup: function (e) {
      console.log('swipeup', e.original);
      this.alert('swipeup');
    },
    swiperight: function (e) {
      console.log('swiperight', e.original);
      this.alert('swiperight');
    },
    swipeleft: function (e) {
      console.log('swipeleft', e.original);
      this.alert('swipeleft');
    },
    pan: function (e) {
      var x = e.original.deltaX,
          y = e.original.deltaY;

      this.nodes.box.style.transition = 'none';
      this.nodes.box.style.transform = 'translate('+x+'px,'+y+'px)';
    },
    panStart: function (e) {
      this.alert('panstart');
    },
    panEnd: function (e) {
      this.alert('panend');
      this.nodes.box.style.transition = '';
      this.nodes.box.style.transform = '';
    }
  }
});

new Sandbox({ el: '#sandbox' });
