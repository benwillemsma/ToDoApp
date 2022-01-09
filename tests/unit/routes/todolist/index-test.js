import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | todolist/index', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:todolist/index');
    assert.ok(route);
  });
});
