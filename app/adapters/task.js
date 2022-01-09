import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class TaskAdapter extends JSONAPIAdapter {
  urlForFindAll(modelName, snapshot) {
    let baseUrl = this.buildURL(modelName);
    if (snapshot.adapterOptions) {
      if (snapshot.adapterOptions.root == true) return baseUrl.concat('/root');
    } else return super.urlForFindAll(modelName, snapshot);
  }
}
