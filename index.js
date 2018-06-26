import compose from 'uc-compose';
import { create, remove, addDelayRemoveClass } from 'uc-dom';
import html from 'uc-dom/methods';
import input from 'uc-input';
import transform from 'uc-input/transform';

const Input = function(opts) {
  this.didUpdate = opts.onChange;
  this.el = opts.el || this.render(opts);
  this.input = this.find('input').item(0);
  this.setup(opts);

  this.transforms = [];
  this.pushTransform(opts);
}

Input.prototype = compose(
  html,
  transform,
  input,
  {
    setValue: function(val) {
      this.input.value = val;
    },

    getValue: function() {
      return this.input.value;
    },

    render: function(opts) {
      return create('label.input', `
        <input
          type="${opts.type || 'text'}"
          ${(opts.name ? `name="${opts.name}" ` : '')}
          ${(opts.value ? `value="${opts.value}" ` : '')}
        >
        <span>${opts.title}</span>
        <em></em>`
      );
    },

    getCarret: function() {
      return this.input.selectionEnd;
    },

    setCarret: function(pos) {
      this.input.setSelectionRange(pos, pos);
    },

    resetCarret: function(toBegin) {
      this.input.focus();
      const pos = toBegin ? 0 : this.input.value.length;
      this.input.setSelectionRange(pos, pos);
    },

    error: function(msg) {
      if (msg) {
        this.addClass('input-message')
          .find('em')
          .item(0)
          .textContent = msg;
      }

      this.errorTimeout = addDelayRemoveClass(this.el, 'error', 600);
    },

    active: function(state) {
      this.input.disabled = !state;
    },

    remove: function() {
      clearTimeout(this.errorTimeout);
      this.destroy();
      remove(this.el);
      delete this.el;
    }
  }
);

export default Input;
