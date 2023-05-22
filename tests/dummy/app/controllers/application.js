import Controller from '@ember/controller';

export default Controller.extend({
  collapseStatus: false,
  actions: {
    toggleMenu() {
      let status = this.get('collapseStatus');
      this.set('collapseStatus', !status);
    }
  }
});
