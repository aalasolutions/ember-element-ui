import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | el-row', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{el-row}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <ElRow>
        template block text
      </ElRow>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');

    this.set('gutter', 10);
    this.set('justify', 'left');
    this.set('align', 'middle');
    this.set('type', 'flex');
    await render(hbs`{{el-row gutter=gutter
            justify=justify
            align=align
            type=type
    }}`);

    assert.equal(this.element.textContent.trim(), '');
  });
});
