import { helper } from '@ember/component/helper';

function hasValue([list, value]) {
  console.log(list, value);
  if (list.length) {
    for (let i = 0; i < list.length; i++) {
      console.log(list, value);
      if (list[i] === value) return true;
    }
  }
  return list === value;
}

export default helper(hasValue);
