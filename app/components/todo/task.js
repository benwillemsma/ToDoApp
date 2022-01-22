import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TodotaskComponent extends Component {
  @service store;
  @service timeHelpers;

  @tracked showingTypes = ['All', 'Active', 'Today', 'Next 7 Days'];
  @tracked showingValue = 0;

  get shownTasks() {
    let tasks = [];
    this.args.list.forEach((task) => {
      if (this.showingValue != 0) {
        var start = Date.now();
        var end = Date.now();

        task.scheduledTasks.forEach((sTask) => {
          if (this.showingValue == 2) {
            start = new Date();
            start.setUTCHours(0, 0, 0, 0);
            end = new Date(start);
            end.setUTCHours(23, 59, 59, 999);
          } else if (this.showingValue == 3) {
            start = new Date();
            start.setUTCHours(0, 0, 0, 0);
            end = this.timeHelpers.addInterval([start, 7, 'day']);
            end.setUTCHours(23, 59, 59, 999);
          }
          if (
            this.timeHelpers.timesOverlap(sTask.started, sTask.due, start, end)
          ) {
            tasks.addObject(task);
          }
        });
      } else {
        tasks.addObject(task);
      }
    });
    return tasks;
  }

  @action updateShowing(event) {
    this.showingValue = event.target.value;
  }

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
