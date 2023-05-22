import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | el-switch', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{el-switch}}`);
    assert.equal(this.element.textContent.trim(), '');
  });

  test('isActiveText', async function (assert) {
    this.set('activeText', 'sampleText');
    await render(hbs`{{el-switch activeText=activeText}}`);
    assert.equal(this.element.textContent.trim(), 'sampleText');

    this.set('inactiveIconClass', 'warning');
    await render(hbs`{{el-switch inactiveIconClass=inactiveIconClass}}`);
    assert.equal(this.element.textContent.trim(), '');
  });
  test('spanStyle', async function (assert) {
    this.set('model', '23');
    this.set('activeColor', '#FF00FF');
    this.set('width', '50px');
    await render(
      hbs`{{el-switch width=width model=model activeColor=activeColor}}`
    );
    assert.equal(this.element.textContent.trim(), '');
  });
});
