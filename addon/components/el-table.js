import Component from '@ember/component';
import layout from './el-table';
import { computed, get, set } from '@ember/object';
import { or } from '@ember/object/computed';

// import tableStore from "../utils/table-store";
export default Component.extend({
  layout,
  data: null,
  size: '',
  width: '',
  maxHeight: null,
  fit: true,
  stripe: true,
  border: false,
  rowKey: null, // string or function ,
  context: null,
  showHeader: true,
  showSummary: false,
  sumText: '',
  summaryMethod: null, // Function
  rowClassName: null, // string or function
  cellClassName: null, // string or function
  cellStyle: null, // object or function
  headerRowCLassName: null, // string function
  headerRowStyle: null, //object function
  headerCellCLassName: null, // string function
  headerCellStyle: null, //object function
  highlightCurrentRow: true,
  currentRowKey: null, // string number
  emptyText: '',
  expandRowKeys: null,
  defaultExpandAll: false,
  defaultSort: null,
  tooltipEffect: '',
  spanMethod: null, // function
  selectOnIndeterminate: true,

  classNames: ['el-table'],
  classNameBindings: [
    'fit:el-table--fit',
    'stripe:el-table--striped',
    'isBorder:el-table--border', // todo:
    'isHidden:el-table--hidden', // todo:
    'isGroup:el-table--group', // todo:
    'maxHeight:el-table--fluid-height',
    'layout.scrollX:el-table--scrollable-x', // todo:
    'layout.scrollY:el-table--scrollable-y', // todo:
    'rowHover:el-table--enable-row-hover', // todo;
    'rowTransition:el-table--enable-row-transition', // todo
  ],

  // isGroup: or('border', 'isGroup'),
  isBorder: or('border', 'isGroup'),

  layoutBodyWidth: computed('layout.bodyWidth', function () {
    return 'width: ' + get(this, 'layout.bodyWidth')
      ? get(this, 'layout.bodyWidth') + 'px'
      : '';
  }),
  init() {
    this._super();
    // if (!get(this, 'api')) {
    //
    //   let initialState = {
    //     rowKey: this.rowKey,
    //     defaultExpandAll: this.defaultExpandAll,
    //     selectOnIndeterminate: this.selectOnIndeterminate
    //   };
    //   const api =  tableStore.create({table: this, initialState});
    //   set(this, 'api', api);
    //
    // }

    // const layout = new TableLayout({ // todo: https://github.com/ElemeFE/element/blob/9c32f55892bf15a7287a57b9ec78fe1f138ef64a/packages/table/src/table-layout.js
    //   store,
    //   table: this,
    //   fit: this.fit,
    //   showHeader: this.showHeader
    // });
    //

    // copied from table.vue
    // set(this, 'store', store);
    set(this, 'isHidden', false);
    set(this, 'renderExpanded', null);
    set(this, 'resizeProxyVisible', false);
    set(this, 'resizeState', {
      width: null,
      height: null,
    });

    set(this, 'isGroup', false);
    set(this, 'scrollPosition', 'left');

    // set(this, 'data', []);
    set(this, 'context', {});
    set(this, 'expandRowKeys', []);
    set(this, 'defaultSort', {});

    set(this, 'parent', this);
  },
});
