import { helper } from '@ember/component/helper';

function ifCond([v1, operator, v2]) {
  console.log(v1, operator, v2);
  switch (operator) {
    case '==':
      return v1 == v2;
    case '===':
      console.log(v1 === v2);
      return v1 === v2;
    case '!=':
      return v1 != v2;
    case '!==':
      return v1 !== v2;
    case '<':
      return v1 < v2;
    case '<=':
      return v1 <= v2;
    case '>':
      return v1 > v2;
    case '>=':
      return v1 >= v2;
    case '&&':
      return v1 && v2;
    case '||':
      return v1 || v2;
    default:
      return false;
  }
}

export default helper(ifCond);
