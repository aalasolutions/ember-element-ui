import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | message-box', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:message-box');
    assert.ok(service);
  });

  test('All Notification Types', function (assert) {
    let service = this.owner.lookup('service:message-box');

    service.alert('Welcome Man Welcome');
    service.confirm('Welcome Man Welcome');
    service.prompt('Welcome Man Welcome');

    assert.ok(service);
  });
  test('Props and Objects', function (assert) {
    let service = this.owner.lookup('service:message-box');

    service.alert('Welcome Man Welcome', {
      iconClass: 'el-loading',
      showClose: true,
      autoClear: false,
    });

    service.clearAll();

    service.alert('Welcome Man Welcome', {
      showConfirmButton: true,
      closeOnClickModal: true,
    });
    let messages = service.messages;
    service.removeMessage();
    service.removeMessage(messages[0]);

    assert.ok(service);
  });
});
