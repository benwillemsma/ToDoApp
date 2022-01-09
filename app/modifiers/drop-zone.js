import Modifier from 'ember-modifier';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DropZoneModifier extends Modifier {
  @service dragObject;

  get droptag() {
    return this.args.named.droptag;
  }

  @action dropItem(event) {
    if (
      event.currentTarget == this.element &&
      event.dataTransfer.getData('tag') == this.droptag
    ) {
      event.stopPropagation();
      let item = this.args.named.item;
      let ondrop = this.args.named.onDrop;
      this.dragObject.dropIntoTask(item, this.args.list);
      this.dragObject.onDragEnd();
      if (ondrop) drop(event, item);
      return false;
    }
  }

  @action dragOver(event) {
    if (
      event.currentTarget == this.element &&
      event.dataTransfer.getData('tag') == this.droptag
    ) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';

      let ondragover = this.args.named.onDragOver;
      if (ondragover) dragover(event);
    }
  }

  @action dragEnter(event) {
    if (
      event.currentTarget == this.element &&
      event.dataTransfer.getData('tag') == this.droptag
    ) {
      let ondragenter = this.args.named.onDragEnter;
      if (ondragenter) dragenter(event);
    }
  }

  @action dragLeave(event) {
    if (
      event.currentTarget == this.element &&
      event.dataTransfer.getData('tag') == this.droptag
    ) {
      let ondragleave = this.args.named.onDragLeave;
      if (ondragleave) ondragleave(event);
    }
  }

  didInstall() {
    this.element.addEventListener('drop', this.dropItem);
    this.element.addEventListener('dragover', this.dragOver);
    this.element.addEventListener('dragenter', this.dragEnter);
    this.element.addEventListener('dragleave', this.dragLeave);
  }

  willDestroy() {
    this.element.removeEventListener('drop', this.dropItem);
    this.element.removeEventListener('dragover', this.dragOver);
    this.element.removeEventListener('dragenter', this.dragEnter);
    this.element.removeEventListener('dragleave', this.dragLeave);
  }
}
