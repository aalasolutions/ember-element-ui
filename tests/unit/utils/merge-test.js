import merge from 'dummy/utils/merge';
import { module, test } from 'qunit';

// module('Unit | Utility | merge', function(hooks) {
module('Unit | Utility | merge', function () {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let a = { a: 1, b: 2 };
    let b = { c: 1, d: 2 };
    let result = merge(a, b);
    assert.ok(result);
  });
});
