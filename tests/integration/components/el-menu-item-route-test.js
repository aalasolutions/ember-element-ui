import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | el-menu-item-route', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('linkTo', 'dummy-link');
    await render(hbs`{{el-menu-item-route linkto=linkTo}}`);

    this.set('parent', 'dummy-parent');
    await render(hbs`{{el-menu-item-route linkto=linkTo parent=parent}}`);

    this.set('submenu', true);
    await render(
      hbs`{{el-menu-item-route linkto=linkTo parent=parent submenu=submenu}}`
    );

    assert.equal(this.element.textContent.trim(), '');
  });
});
