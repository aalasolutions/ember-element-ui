import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ElButtonComponent extends Component {
  defaultColor = 'default';

  get classes() {
    let classNames = '';
    let color = this.args.color;
    if (['primary', 'success', 'warning', 'info', 'danger', 'text'].indexOf(color) === -1) {
      color = this.defaultColor;
    }
    classNames += 'el-button--' + color;

    if (this.args.size) {
      classNames += ` el-button--${this.args.size}`;
    }

    if (this.args.loading || this.args.disabled) {
      classNames += ` is-disabled`;
    }

    if (this.args.plain) {
      classNames += ' is-plain';
    }
    if (this.args.round) {
      classNames += ' is-round';
    }
    if (this.args.circle) {
      classNames += ' is-circle';
    }

    return classNames;
  }

  get showIcon() {
    return this.args.icon || this.args.loading;
  }

  get icon() {
    // todo: use fa-loading icon
    return this.args.loading ? "el-icon-loading" : this.args.icon;
  }

  @action onClick() {
    if (typeof this.args.onClick === 'function') {
      this.args.onClick();
    }
  }
}
