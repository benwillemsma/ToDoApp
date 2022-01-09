import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class TodotaskComponent extends Component {
  @service store;

  @action createTask(title, parentTask) {
    var newPos = (this.args.list.length + 1) * 100;
    let createdTask = this.store.createRecord('task', {
      name: title,
      parent: parentTask,
      position: newPos,
      urgency: 0,
      success: 0,
      failure: 0,
    });
    createdTask.save();
  }

  @action removeTask(task) {
    task.destroyRecord();
  }
}
