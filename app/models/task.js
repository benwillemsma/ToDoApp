import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class TaskModel extends Model {
  @hasMany('task', { inverse: 'parent' }) children;
  @belongsTo('task', { inverse: 'children' }) parent;
  @hasMany('scheduled-task') scheduledTasks;
  @attr('string') name;
  @attr('number') position;
  @attr('number') urgency;
  @attr('number') success;
  @attr('number') failure;
  @attr('string') weblink;
}
