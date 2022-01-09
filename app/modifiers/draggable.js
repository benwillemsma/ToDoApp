import Modifier from 'ember-modifier';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DraggableModifier extends Modifier {
  @service dragObject;

  get onDragStart() {
    return this.args.named.onDragStart;
  }
  get onDragEnd() {
    return this.args.named.onDragEnd;
  }

  @action dragStart(event) {
    event.stopPropagation();
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('tag', this.args.named.droptag);

    let item = this.args.named.item;
    this.dragObject.onDragStart(item);
    if (this.onDragStart) this.onDragStart(event, item);
  }

  didInstall() {
    this.element.draggable = true;
    this.element.addEventListener('dragstart', this.dragStart);
    if (this.onDragEnd) element.addEventListener('dragend', this.onDragEnd);
  }

  willDestroy() {
    this.element.draggable = false;
    this.element.removeEventListener('dragstart', this.dragStart);
    if (this.onDragEnd) element.removeEventListener('dragend', this.onDragEnd);
  }
}
