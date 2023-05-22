import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | el-checkbox-button', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{el-checkbox-button}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <ElCheckboxButton>
        template block text
      </ElCheckboxButton>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');

    this.set('size', 'large');
    await render(hbs`{{el-checkbox-button size=size}}`);
  });

  test('parent', async function (assert) {
    let parent = { fill: 'red', textColor: 'blue' };
    let model = ['English', 'Maths', 'Science'];
    this.set('parent', parent);
    this.set('model', model);
    await render(
      hbs`{{el-checkbox-button label="Button" parent=parent model=model}}`
    );
    assert.equal(this.element.textContent.trim(), 'Button');

    parent = { fill: '', textColor: '' };
    this.set('parent', parent);
    this.set('checked', true);
    await render(
      hbs`{{el-checkbox-button label="Button" checked=checked parent=parent model=model}}`
    );
    assert.equal(this.element.textContent.trim(), 'Button');

    this.set('model', true);
    this.set('checked', true);
    await render(
      hbs`{{el-checkbox-button label="Button" checked=checked parent=parent model=model}}`
    );
    assert.equal(this.element.textContent.trim(), 'Button');
  });
});
