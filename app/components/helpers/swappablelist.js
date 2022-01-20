import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class SwappablelistComponent extends Component {
  @service dragObject;
  @tracked customSort;

  get isVertical() {
    return this.args.direction === 'list';
  }

  get sortedItems() {
    if (this.args.listItems.length > 1) {
      return this.args.listItems.sortBy(
        this.customSort || !this.args.sortBy ? 'position' : this.args.sortBy
      );
    } else {
      return this.args.listItems;
    }
  }
  @action isCustomSort() {
    this.customSort = true;
  }

  @action changeSortMethod(newSortBy) {
    this.customSort = false;
    this.args.sortBy = newSortBy;
    this.dragObject.redistrubute(sortedItems);
    this.dragObject.saveItems();
  }
}
