import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | el-menu-item', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{el-menu-item}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <ElMenuItem>
        template block text
      </ElMenuItem>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('click event', async function (assert) {
    this.set('submenu', true);

    this.set('externalAction', (actual) => {
      assert.equal(actual, undefined);
    });

    await render(hbs`{{el-menu-item submenu=submenu action=externalAction}}`);
    await click('.el-submenu');

    await render(hbs`{{el-menu-item submenu=submenu}}`);
    await click('.el-submenu');
  });
});
