import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | message', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:message');
    assert.ok(service);
  });

  test('All Notification Types', function (assert) {
    let service = this.owner.lookup('service:message');

    service.success('Welcome Man Welcome');
    service.info('Welcome Man Welcome');
    service.error('Welcome Man Welcome');
    service.warning('Welcome Man Welcome');

    assert.ok(service);
  });
  test('Props and Objects', function (assert) {
    let service = this.owner.lookup('service:message');

    service.success('Welcome Man Welcome', {
      duration: 1000,
      type: null,
      autoClear: false,
      return: { test: 1 },
    });

    service.clearAll();

    service.success('Welcome Man Welcome', {
      duration: 1000,
      type: null,
      return: { test: 1 },
    });
    let messages = service.messages;
    service.clearTimer(messages[0]);
    service.removeMessage();
    service.removeMessage(messages[0]);

    assert.ok(service);
  });
});
