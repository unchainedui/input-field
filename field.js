import { create, remove, addDelayRemoveClass } from 'uc-dom';

export default {
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

  addField: function(opts) {
    this.el = opts.el || this.render(opts);
    this.input = this.find('input').item(0);
    this.elMessage = this.find('em').item(0);
  },

  removeField: function() {
    clearTimeout(this.errorTimeout);
    remove(this.el);
    delete this.el;
    delete this.elMessage;
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
      this.elMessage.textContent = msg;
    }

    this.errorTimeout = addDelayRemoveClass(this.el, 'error', 600);
  },

  active: function(state) {
    this.input.disabled = !state;
  }
}
