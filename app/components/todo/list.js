import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TodolistComponent extends Component {
  @service store;
  @tracked inputText = '';

  get status() {
    var length = this.args.task.children.length;
    var complete = 0;
    for (let i = 0; i < length; i++) {
      if (this.args.task.children.complete) {
        complete++;
      }
    }
    return complete + '/' + length;
  }

  @action itemsReordered(task, targetTask) {
    task.parent = targetTask.parent;
  }
}
