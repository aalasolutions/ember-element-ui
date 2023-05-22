import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | el-alert', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<ElAlert />`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
     <ElAlert>
        template block text
      </ElAlert>
    `);
    assert.dom(this.element).hasText('template block text');
  });

  test('it checks iconClass', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('title', 'Alert Title');
    this.set('icon', 'warning');
    this.set('showIcon', true);

    await render(hbs`{{el-alert title=title type=icon showIcon=showIcon}}`);
    assert.equal(this.element.textContent.trim(), 'Alert Title');

    await render(hbs`{{el-alert title=title showIcon=showIcon}}`);
    assert.equal(this.element.textContent.trim(), 'Alert Title');
  });

  test('it checks big bold icon and title', async function (assert) {
    this.description = 'warning';

    await render(
      hbs`<ElAlert @type="warning" description={{this.description}} />`
    );

    assert.equal(this.element.textContent.trim(), 'warning');

    await click('.el-alert__closebtn');
  });
});
