import Component from '@glimmer/component';

export default class ElCardComponent extends Component {
  defaultShadow = 'always'; // always false hover

  get classes() {
    let classNames = '';
    let shadow = this.args.shadow;
    if (['always', 'false', 'hover'].indexOf(shadow) === -1) {
      shadow += ` is-${this.defaultShadow}-shadow`;
    }

    classNames += ` is-${shadow}-shadow`;

    if (this.args.box) {
      classNames += ' box-card';
    }
    return classNames;
  }
}
