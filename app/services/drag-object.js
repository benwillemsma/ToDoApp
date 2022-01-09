import Service from '@ember/service';
import { action } from '@ember/object';

export default class DragObjectService extends Service {
  dragItem;
  startPos;
  toSave = new Array();

  // Called from draggable modifier
  @action onDragStart(item) {
    this.dragItem = item;
    this.startPos = item.position;
  }

  // Called from drop-zone modifier
  @action onDragEnd() {
    // Save changes made to position
    if (!this.toSave.includes(this.dragItem)) {
      this.toSave.push(this.dragItem);
    }
    this.toSave.forEach(function (item) {
      item.save();
    });

    this.dragItem = null;
    this.toSave = new Array();
  }

  @action redistribute(list) {
    // evenly distribute positions with space between them
    this.toSave.push(list);
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      item.position = (i + 1) * 100;
    }
  }

  @action moveItem(targetItem, list, offset) {
    if (this.dragItem != targetItem) {
      this.dragToList(targetItem, list);
      let newPos = this.findNewPos(targetItem, list, offset);

      if (newPos >= 0) {
        // <-- dependant on findNewPos()
        this.dragItem.position = newPos;
        if (Math.abs(targetItem.position - this.dragItem.position) <= 1) {
          this.redistribute(list);
        }
      }
    }
  }

  // Should probably be replaced with somthing more robust
  findNewPos(targetItem, list, offset) {
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (item === targetItem) {
        if (i + offset <= -1) {
          return Math.floor(item.position / 2);
        } else if (i + offset >= list.length) {
          return (item.position + (list.length + 1) * 100) / 2;
        } else if (list[i + offset] != this.dragItem) {
          return Math.floor((item.position + list[i + offset].position) / 2);
        } else return -1;
      }
    }
  }

  @action dropIntoTask(parentTask, listLength) {
    if (this.dragItem != parentTask) {
      if (parentTask) {
        if (this.dragItem.parent != parentTask) {
          this.dragItem.parent = parentTask;
          this.dragItem.position = (listLength + 1) * 100;
        }
      }
    }
  }

  @action dragToList(targetItem, list) {
    if (!list.includes(this.dragItem)) {
      list.addObject(this.dragItem);
      this.dragItem.parent = targetItem.parent;
    }
  }
}
