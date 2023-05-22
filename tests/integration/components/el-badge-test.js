import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | el-badge', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{el-badge}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <ElBadge>
        template block text
      </ElBadge>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('Dot Value', async function (assert) {
    this.set('isDot', true);
    await render(hbs`{{el-badge isDot=isDot}}`);
    assert.equal(this.element.textContent.trim(), '');

    this.set('type', 'badOption');

    await render(hbs`{{el-badge type=type}}`);
    assert.equal(this.element.textContent.trim(), '');
  });

  test('counter', async function (assert) {
    this.set('value', 10);

    await render(hbs`{{el-badge value=value }}`);
    assert.equal(this.element.textContent.trim(), '10');

    this.set('max', 5);

    await render(hbs`{{el-badge value=value max=max}}`);
    assert.equal(this.element.textContent.trim(), '5+');

    this.set('max', 15);

    await render(hbs`{{el-badge value=value max=max}}`);
    assert.equal(this.element.textContent.trim(), '10');

    this.set('value', 'blue');
    // this.set('max', null);

    await render(hbs`{{el-badge value=value }}`);
    assert.equal(this.element.textContent.trim(), 'blue');
  });
});
