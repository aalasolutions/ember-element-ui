import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import transition from '../utils/transition';

export default class ElAlertComponent extends Component {
  TYPE_CLASSES_MAP = {
    success: 'el-icon-success',
    warning: 'el-icon-warning',
    error: 'el-icon-error',
    info: 'el-icon-info',
  };

  @tracked isClosed;

  get classes() {
    let classes = [];
    // if ( this.get('typeClass') ) {
    //   classes.push(this.get('typeClass'));
    // }
    if (this.args.effect && ['light', 'dark'].includes(this.args.effect)) {
      classes.push(`is-${this.args.effect}`);
    } else {
      classes.push('is-light');
    }

    if (
      this.args.type &&
      ['info', 'success', 'warning', 'error'].includes(this.args.type)
    ) {
      classes.push(`el-alert--${this.args.type}`);
    } else {
      classes.push(`el-alert--info`);
    }

    if (this.args.center) {
      classes.push('is-center');
    }
    if (this.isClosed) {
      classes.push('el-hidden');
    }

    return classes.join(' ');
  }

  get iconClass() {
    return this.TYPE_CLASSES_MAP[this.args?.type] || 'el-icon-info';
  }

  get isBigIcon() {
    return this.args.description !== '' ? 'is-big' : '';
  }

  get isBoldTitle() {
    return this.args.description === '' ? 'is-bold' : '';
  }

  get closable() {
    return this.args.closable ?? !this.args.closeText;
  }

  @action close(event) {
    let e = event.target.parentElement.parentElement;
    // console.log(e.parentElement.parentElement);
    let transitionEvent = transition('animation');
    e.addEventListener(transitionEvent, () => {
      this.isClosed = true;
      if (this.args.action) {
        this.args.action();
      }
    });

    e.classList.add('animate__animated');
    e.classList.add('animate__fadeOut');
  }
}
