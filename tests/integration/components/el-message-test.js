import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | el-message', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{el-message}}`);
    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <ElMessage>
        template block text
      </ElMessage>
    `);

    assert.equal(this.element.textContent.trim(), '');
  });
  test('getClassName', async function (assert) {
    this.set('messageObj', {
      type: 'success',
      iconClass: false,
      dismiss: true,
      showClose: true,
      onClose: function (obj) {
        assert.equal(obj.type, 'success');
      },
    });
    await render(hbs`{{el-message messageObj=messageObj}}`);
    assert.equal(this.element.textContent.trim(), '');

    await click('.el-icon-close');
  });
});
