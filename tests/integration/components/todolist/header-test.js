import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | todolist/header', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Todolist::Header />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <Todolist::Header>
        template block text
      </Todolist::Header>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
