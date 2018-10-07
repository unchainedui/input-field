import { create, on, off } from 'uc-dom';

let activePop;

export default {
  addPop: function(opts) {
    this.pop = opts.pop;
    this.pop.onChange = value => this.onPopChange(value);

    this.elPop = create(`div.input-pop.input-pop-${opts.popDirection || 'down'}`);
    this.elPop.appendChild(opts.pop.el);
    this.el.appendChild(this.elPop);
    this.events.popFocus = on(this.input, 'focus', () => this.show());
    this.events.popDocumentClick = on(document, 'click', () => this.hide());
  },

  removePop: function() {
    off(this.input, 'focus', this.events.popFocus);
    off(document, 'click', this.events.popDocumentClick);
    this.pop.remove();
    delete this.pop;
    delete this.elPop;
  },

  show: function() {
    if (this.popActive) {
      return;
    }

    activePop && activePop.hide();
    activePop = this.addClass('input-pop-active');
    this.popActive = true;
    return this;
  },

  hide: function() {
    if (!this.popActive) {
      return;
    }

    this.popActive = false;
    this.removeClass('input-pop-active');
    activePop = undefined;
  },

  toggle: function() {
    this[this.popActive ? 'hide' : 'show']();
  },

  onChange: function(str) {
    const currentValue = this.pop.toString();

    if (str === currentValue) {
      return;
    }

    try {
      this.pop.value(str);
    } catch (e) {
      this.error(e);
    }
  },

  onPopChange: function() {
    this.setValue(this.pop.toString());
    this.toggleClass('input-value', !!this.getValue());
    this.onKeyUp();
    this.onValueChange(this.pop.value());
  }
}

