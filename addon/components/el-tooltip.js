import Component from '@ember/component';
// import {get, set} from '@ember/object';
// import Ember from 'ember';
// import $ from 'jquery';
// import layout from './el-tooltip';

// todo: WIP

export default Component.extend({

  // layout,

  tagName: '',
  openDelay: 0,
  disabled: false,
  manual: false,
  effect: 'dark',
  arrowOffset: 0,
  popperCLass: '',
  content: '',
  visibleArrow: true,
  transition: 'el-fade-in-linear',
  hideAfter: 0,

  html: true,
  placement: 'auto',
  title: '',

  didInsertElement() {
    this._super(...arguments);
    // let parent = this.getParent(this);
    //
    // set(this, 'parent', parent);

  },

  didRender(){
    // $(get(this, 'parent')).attr('data-original-title', get(this, 'title'))
    //   .tooltip({
    //     placement: get(this, 'placement'),
    //     html: true
    //   });

    // this._updatePopper();
  },



  //
  // _updatePopper() {
  //   if (this.isDestroying || this.isDestroyed) {
  //     return;
  //   }
  //
  //   const eventsEnabled = this.get('eventsEnabled');
  //   const modifiers = this.get('modifiers');
  //   const onCreate = this.get('onCreate');
  //   const onUpdate = this.get('onUpdate');
  //   const placement = this.get('placement');
  //   // const popperTarget = this._getPopperTarget();
  //   const renderInPlace = this.get('_renderInPlace');
  //
  //   // Compare against previous values to see if anything has changed
  //   const didChange = renderInPlace !== this._didRenderInPlace
  //     // || popperTarget !== this._popperTarget
  //     || eventsEnabled !== this._eventsEnabled
  //     || modifiers !== this._modifiers
  //     || placement !== this._placement
  //     || onCreate !== this._onCreate
  //     || onUpdate !== this._onUpdate;
  //
  //   if (didChange === true) {
  //     if (this._popper !== null) {
  //       this._popper.destroy();
  //     }
  //
  //     const popperElement = this._getPopperElement();
  //
  //     // Store current values to check against on updates
  //     this._didRenderInPlace = renderInPlace;
  //     this._eventsEnabled = eventsEnabled;
  //     this._modifiers = modifiers;
  //     this._onCreate = onCreate;
  //     this._onUpdate = onUpdate;
  //     this._placement = placement;
  //     // this._popperTarget = popperTarget;
  //
  //     const options = {
  //       eventsEnabled,
  //       modifiers,
  //       placement
  //     };
  //
  //     if (onCreate) {
  //       assert('onCreate of ember-popper must be a function', typeof onCreate === 'function');
  //       options.onCreate = onCreate;
  //     }
  //
  //     if (onUpdate) {
  //       assert('onUpdate of ember-popper must be a function', typeof onUpdate === 'function');
  //       options.onUpdate = onUpdate;
  //     }
  //
  //     this._popper = new Popper(popperTarget, popperElement, options);
  //
  //     // Execute the registerAPI hook last to ensure the Popper is initialized on the target
  //     if (this.get('registerAPI') !== null) {
  //       /* eslint-disable ember/closure-actions */
  //       this.get('registerAPI')(this._getPublicAPI());
  //     }
  //   }
  // },


  // _getPopperTarget(){
  //   $(get(this, 'parent'));
  // },
  //
  // getParent(view) {
  //   if (get(view, 'tagName') === '') {
  //     // Beware: use of private API! :(
  //     if (Ember.ViewUtils && Ember.ViewUtils.getViewBounds) {
  //       return Ember.ViewUtils.getViewBounds(view).parentElement;
  //     } else {
  //       return view._renderNode.contextualElement;
  //     }
  //   } else {
  //     return get(view, 'element').parentNode;
  //   }
  // }

});

