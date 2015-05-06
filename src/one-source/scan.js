const {createProperty} = require('../patterns/one-source');
const {ERROR, NOTHING} = require('../constants');


const P = createProperty('scan', {

  _init({fn, seed}) {
    this._fn = fn;
    if (seed !== NOTHING) {
      this._emitValue(seed);
    }
  },

  _free() {
    this._fn = null;
  },

  _handleValue(x) {
    if (this._currentEvent !== null && this._currentEvent.type !== ERROR) {
      x = this._fn(this._currentEvent.value, x);
    }
    this._emitValue(x);
  }

});


module.exports = function scan(obs, fn, seed) {
  return new P(obs, {fn, seed});
};
