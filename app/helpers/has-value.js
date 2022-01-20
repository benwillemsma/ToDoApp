import { helper } from '@ember/component/helper';

function hasValue([list, value]) {
  if (list.length) {
    for (let i = 0; i < list.length; i++) {
      if (list[i] === value) return true;
    }
  }
  return list === value;
}

export default helper(hasValue);
