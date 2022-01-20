import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SchedulerComponent extends Component {
  @service store;
  @service timeHelpers;

  @tracked dueTypes = ['duration', 'date/time'];

  @tracked startDate;

  @tracked dueDate;
  @tracked dueType = 0;
  @tracked dueValueType = 0;
  @tracked dueValue = 1;

  @tracked repeat = 0;
  @tracked repeatType = 0;
  @tracked repeatValue = 1;

  get isDuration() {
    return this.dueTypes[this.dueType] === 'duration';
  }

  // Start Date
  @action updateStartDate(event) {
    if (event) {
      let date = Date.parse(event.target.value);
      if (date) this.startDate = date;
      else this.startDate = Date.now();
    }
  }

  // Due Date
  @action updateDueDate(event) {
    if (event) {
      let date = Date.parse(event.target.value);
      if (date) this.dueDate = date;
      else this.dueDate = null;
    } else {
      this.dueDate = this.timeHelpers.addInterval([this.startDate, this.dueValue, this.dueType]);
    }
  }

  @action updateDueType(event) {
    if (event) {
      this.dueType = parseInt(event.target.value, 10);
      this.updateDueDate();
    }
  }

  @action updateDueValueType(event) {
    if (event) {
      this.dueValueType = parseInt(event.target.value, 10);
      this.updateDueDate();
    }
  }

  @action updateDueValue(event) {
    if (event) {
      this.dueValue = parseInt(event.target.value, 10);
      this.updateDueDate();
    }
  }

  // Repeat Interval
  @action updateRepeat() {
    this.repeat = this.timeHelpers.addInterval([
      this.startDate,
      this.repeatValue,
      this.repeatType
    ]);
  }

  @action updateRepeatType(event) {
    if (event) {
      this.repeatType = parseInt(event.target.value, 10);
      this.updateRepeat();
    }
  }

  @action updateRepeatValue(event) {
    if (event) {
      this.repeatValue = parseInt(event.target.value, 10);
      this.updateRepeat();
    }
  }

  // REST Actions
  @action scheduleTask(task) {
    if (!task || !this.startDate || !this.dueDate) {
      return;
    }

    let createdTask = this.store.createRecord('scheduled-task', {
      task: task,
      started: new Date(this.startDate),
      due: new Date(this.dueDate),
      finished: null,
      interval: this.repeat,
    });
    createdTask.save();
  }

  @action unscheduledTask(task) {
    this.store.findAll('scheduled-task').then(function (sTasks) {
      sTasks.forEach((sTask) => {
        sTask.destroyRecord();
      });
    });
  }
}
