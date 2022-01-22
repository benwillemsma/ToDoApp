import Modifier from 'ember-modifier';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class InspectableModifier extends Modifier {
  @service inspector;

  @action doInspect() {
    this.inspector.inspect(this.args.named.type, this.args.named.item);
  }

  didInstall() {
    this.element.addEventListener('click', this.doInspect);
  }

  willDestroy() {
    this.element.removeEventListener('click', this.doInspect);
  }
}
