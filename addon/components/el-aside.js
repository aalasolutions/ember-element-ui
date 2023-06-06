import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { htmlSafe } from '@ember/template';

export default class ElAsideComponent extends Component {
  @tracked defaultWidth = '300px';

  get style() {
    let width = this.args.width ?? this.defaultWidth;
    if (!width.endsWith('px')) {
      width += 'px';
    }
    if (this.args.collapse === true) {
      width = '65px';
    }
    return htmlSafe('width: ' + width);
  }
}
