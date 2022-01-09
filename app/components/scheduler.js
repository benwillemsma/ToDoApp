import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SchedulerComponent extends Component {
  @service store;

  @tracked dueTypes = ['duration', 'date/time'];
  @tracked intervalTypes = [
    'None',
    'minute',
    'hour',
    'day',
    'week',
    'month',
    'year',
  ];

  @tracked startDate;

  @tracked dueDate;
  @tracked dueType = 0;
  @tracked dueValueType = 1;
  @tracked dueValue = 1;

  @tracked repeat = 0;
  @tracked repeatType = 0;
  @tracked repeatValue = 1;

  get isDuration() {
    return this.dueTypes[this.dueType] === 'duration';
  }

  AddInterval(indate, count, type) {
    let outdate = new Date(indate);
    switch (type) {
      case 'minute':
      case 1:
        outdate.setMinutes(outdate.getMinutes() + count);
        break;
      case 'hour':
      case 2:
        outdate.setHours(outdate.getHours() + count);
        break;
      case 'day':
      case 3:
        outdate.setDate(outdate.getDate() + count);
        break;
      case 'week':
      case 4:
        outdate.setDate(outdate.getDate() + 7 * count);
        break;
      case 'month':
      case 5:
        outdate.setMonth(outdate.getMonth() + count);
        break;
      case 'year':
      case 6:
        outdate.setFullYear(outdate.getFullYear() + count);
        break;
      default:
        break;
    }
    return outdate;
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
      this.dueDate = this.AddInterval(
        this.startDate,
        this.dueValue,
        this.dueType
      );
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
    this.repeat = this.AddInterval(
      this.startDate,
      this.repeatValue,
      this.repeatType
    );
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
