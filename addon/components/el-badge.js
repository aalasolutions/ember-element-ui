import Component from '@glimmer/component';

export default class ElBadgeComponent extends Component {
  defaultType = 'primary';

  get isShow() {
    return !this.args.hidden && (this.content || this.content === 0 || this.args.isDot);
  }

  get type() {
    let type = this.args.type;
    if (!type)
      type = this.defaultType;

    if (['primary', 'success', 'warning', 'info', 'danger'].indexOf(type) === -1) {
      return this.defaultType;
    }
    return this.args.type;
  }

  get content() {
    if (this.args.isDot) return;
    const value = this.args.value;
    const max = this.args.max;

    if (typeof value === 'number' && typeof max === 'number') {
      return max < value ? `${max}+` : value;
    }

    return value;
  }
}
