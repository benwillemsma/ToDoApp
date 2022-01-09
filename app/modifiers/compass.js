import Modifier from 'ember-modifier';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CompassModifier extends Modifier {
  @tracked previousSection = [null, null];
  @tracked vCenter = 0.25;
  @tracked hCenter = 0.25;

  @action calcCompass(event) {
    event.preventDefault();
    event.stopPropagation();
    let [x, y] = this.calcCompassPosition(event);
    // Shift the center to be [0,0]
    x -= 0.5;
    y -= 0.5;

    this.getTolorances();
    var v = this.calcCompassSection(this.previousSection[0], y, this.vCenter, [
      'top',
      'bottom',
      'center',
    ]);
    var h = this.calcCompassSection(this.previousSection[1], x, this.hCenter, [
      'left',
      'right',
      'middle',
    ]);

    if (
      this.args.named.once &&
      this.previousSection[0] === v &&
      this.previousSection[1] === h
    )
      return;

    this.previousSection = [v, h];
    this.doCallbacks(v, h);
  }

  doCallbacks(v, h) {
    let section = this.args.named.section;
    if (section) section([v, h]);

    let anySection = this.args.named.anySection;
    if (anySection) anySection();

    let callbacks = this.args.named.callbacks;
    if (callbacks) {
      for (let i = 0; i < callbacks.length; i++) {
        const callback = callbacks[i];
        if (
          callback.name == v ||
          callback.name == h ||
          callback.name == v + h
        ) {
          if (callback.handle) {
            if (callback.params) callback.handle(...callback.params);
            else callback.handle();
          }
        }
      }
    }
  }

  getTolorances() {
    var value = this.args.named.vCenter / 2;
    if (value) this.center = value;

    var value = this.args.named.hCenter / 2;
    if (value) this.center = value;

    value = this.args.named.vTolorance;
    if (value) this.vTolorance = tolvalueorance;

    value = this.args.named.hTolorance;
    if (value) this.hTolorance = value;
  }

  calcCompassPosition(event) {
    var rect = event.currentTarget.getBoundingClientRect();
    var x = (event.clientX - rect.left) / rect.width;
    var y = (event.clientY - rect.top) / rect.height;

    var value = [x, y];
    if (this.args.named.position) this.args.named.position(value);
    return value;
  }

  calcCompassSection(section, value, center, values) {
    if (value < -center) section = values[0];
    else if (value > center) section = values[1];
    else section = values[2];

    return section;
  }

  didInstall() {
    this.element.addEventListener('dragover', this.calcCompass);
    let exit = this.args.named.exit;
    if (exit) this.element.addEventListener('dragexit', exit);
  }

  willDestroy() {
    this.element.removeEventListener('dragover', this.calcCompass);
    let exit = this.args.named.exit;
    if (exit) this.element.removeEventListener('dragexit', exit);
  }
}
