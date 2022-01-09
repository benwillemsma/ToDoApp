import Model, { attr, belongsTo } from '@ember-data/model';

export default class ScheduledTaskModel extends Model {
  @belongsTo('task') task;
  @attr('date') started;
  @attr('date') finished;
  @attr('date') due;
  @attr('date') interval;
}
