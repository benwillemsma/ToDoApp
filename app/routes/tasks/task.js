import Route from '@ember/routing/route';

export default class TaskRoute extends Route {
  model(params) {
    return this.store.findRecord('task', params.task_id);
  }
}
