import Controller from '@ember/controller';

export default class TasksActiveController extends Controller {
  get activeTasks() {
    let tasks = this.model;
    return tasks.filter(function (task) {
      task.scheduledTasks.forEach(sTask => {
        if(sTask.started < Date.now() && sTask.due > Date.now());
          return true;
      });
      return false;
    });
  }
}
