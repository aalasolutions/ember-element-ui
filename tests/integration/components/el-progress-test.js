import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | el-progress', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{el-progress}}`);
    assert.equal(this.element.textContent.trim(), '0%');

    this.set('type', 'line');
    this.set('status', true);
    await render(hbs`{{el-progress type=type status=status}}`);
    this.set('status', 'success');
    await render(hbs`{{el-progress type=type status=status}}`);

    this.set('type', 'circle');
    this.set('status', true);
    await render(hbs`{{el-progress type=type status=status}}`);
    this.set('status', 'success');
    await render(hbs`{{el-progress type=type status=status}}`);

    this.set('showText', false);
    this.set('textInside', true);

    await render(
      hbs`{{el-progress showText=showText textInside=textInside color=color}}`
    );

    this.set('color', 'red');
    this.set('status', 'exception');

    await render(hbs`{{el-progress type=type status=status color=color}}`);
    await render(hbs`{{el-progress type=type status=status }}`);
  });
});
