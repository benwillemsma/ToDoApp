import Controller from '@ember/controller';

export default class IndexController extends Controller {
  get rootTasks() {
    let tasks = this.model;
    return tasks.filter(function (task) {
      return task.parent.content === null;
    });
  }
}
