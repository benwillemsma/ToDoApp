import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { underscore } from '@ember/string';
import { pluralize } from 'ember-inflector';

export default class ScheduledTaskAdapter extends JSONAPIAdapter {
  pathForType(modelName) {
    var underscored = underscore(modelName);
    return pluralize(underscored);
  }

  urlForFindAll(modelName, snapshot) {
    let baseUrl = this.buildURL(modelName);
    if (snapshot.adapterOptions) {
      if (snapshot.adapterOptions.active == true)
        return baseUrl.concat('/active');
    } else return super.urlForFindAll(modelName, snapshot);
  }
}
