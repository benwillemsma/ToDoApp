import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class TodoitemComponent extends Component {
  get childCount() {
    return this.args.task.hasMany('children').ids().length;
  }

  get status() {
    var complete = 0;
    return complete + '/' + this.childCount;
  }

  @action toggle(item) {
    item.complete = !item.complete;
    item.save();
  }
}
