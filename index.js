import compose from 'uc-compose';
import html from 'uc-dom/methods';
import input from 'uc-input';
import transform from 'uc-input/transform';
import field from './field';

const Input = function(opts) {
  this.onChange = opts.onChange;

  this.events = {};
  this.addField(opts);
  this.addInput(opts);

  this.transforms = [];
  this.pushTransform(opts);
}

Input.prototype = compose(
  html,
  transform,
  input,
  field,
  {
    remove: function() {
      this.removeInput();
      this.removeField();
    }
  }
);

export default Input;
