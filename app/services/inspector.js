import Service from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class InspectorService extends Service {
  @tracked inspectComponent;
  @tracked inspectedItem;

  @action inspect(type, item) {
    type = type.charAt(0).toUpperCase() + type.slice(1);
    this.inspectComponent = "Inspector/"+type;
    this.inspectedItem = item;
  }
}
