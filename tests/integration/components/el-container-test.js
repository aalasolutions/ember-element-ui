import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | el-container', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{el-container}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#el-container}}
        template block text
      {{/el-container}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');


    this.set('direction', 'vertical');
    await render(hbs`{{el-container direction=direction}}`);

    assert.equal(this.element.textContent.trim(), '');

  });

  test("child", async function (assert){
    await render(hbs`
      {{#el-container}}
        {{#el-header}}Header{{/el-header}}{{#el-footer}}Footer{{/el-footer}}
      {{/el-container}}
    `);

    assert.equal(this.element.textContent.trim(), 'HeaderFooter');

  })
});
