import Component from '@ember/component';
import layout from './el-table-column';
// import objectAssign from '../utils/merge';
// import { getPropByPath } from '../utils/util';
import { set } from '@ember/object';
// import {computed, get, set} from "@ember/object";

/*
const defaults = {
  default: {
    order: ''
  },
  selection: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: '',
    className: 'el-table-column--selection'
  },
  expand: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ''
  },
  index: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ''
  }
};



const forced = {
  selection: {
  /!*  renderHeader: function(h, { store }) {
      return <el-checkbox
      disabled={ store.states.data && store.states.data.length === 0 }
      indeterminate={ store.states.selection.length > 0 && !this.isAllSelected }
      nativeOn-click={ this.toggleAllSelection }
      value={ this.isAllSelected } />;
    },
    renderCell: function(h, { row, column, store, $index }) {
      return <el-checkbox
      nativeOn-click={ (event) => event.stopPropagation() }
      value={ store.isSelected(row) }
      disabled={ column.selectable ? !column.selectable.call(null, row, $index) : false }
      on-input={ () => { store.commit('rowSelectedChanged', row); } } />;
    },
    sortable: false,
    resizable: false*!/
  },
  index: {
    renderHeader: function(h, { column }) {
      return column.label || '#';
    },
    renderCell: function(h, { $index, column }) {
      let i = $index + 1;
      const index = column.index;

      if (typeof index === 'number') {
        i = $index + index;
      } else if (typeof index === 'function') {
        i = index($index);
      }

      return `<div>${i}</div>`;
    },
    sortable: false
  },
  expand: {
    renderHeader: function(h, { column }) {
      return column.label || '';
    },
    // renderCell: function(h, { row, store }, proxy) {
    //   const expanded = store.states.expandRows.indexOf(row) > -1;
    //   return `<div class='el-table__expand-icon ' ${(expanded ? 'el-table__expand-icon--expanded' : '')}
    //   on-click={ e => proxy.handleExpandClick(row, e) }>
    // <i class='el-icon el-icon-arrow-right'></i>
    //     </div>`;
    // },
    sortable: false,
    resizable: false,
    className: 'el-table__expand-column'
  }
};



const getDefaultColumn = function(type, options) {
  const column = {};

  objectAssign(column, defaults[type || 'default']);

  for (let name in options) {
    if (options.hasOwnProperty(name)) {
      const value = options[name];
      if (typeof value !== 'undefined') {
        column[name] = value;
      }
    }
  }

  if (!column.minWidth) {
    column.minWidth = 80;
  }

  column.realWidth = column.width === undefined ? column.minWidth : column.width;

  return column;
};



const DEFAULT_RENDER_CELL = function(h, { row, column, $index }) {
  const property = column.property;
  const value = property && getPropByPath(row, property).v;
  if (column && column.formatter) {
    return column.formatter(row, column, value, $index);
  }
  return value;
};

const parseWidth = (width) => {
  if (width !== undefined) {
    width = parseInt(width, 10);
    if (isNaN(width)) {
      width = null;
    }
  }
  return width;
};

const parseMinWidth = (minWidth) => {
  if (minWidth !== undefined) {
    minWidth = parseInt(minWidth, 10);
    if (isNaN(minWidth)) {
      minWidth = 80;
    }
  }
  return minWidth;
};
*/

export default Component.extend({
  layout,
  tagName: 'td',

  type: 'default',
  label: '',
  thisClassName: '', // todo: it was className but due to ember conflict changed it to thisClassName
  labelClassName: '',
  property: '',
  prop: '',
  width: null,
  minWidth: null,
  renderHeader: null, // todo: check the renderHeader function
  sortable: false, // string or boolean
  sortMethod: null, /// function
  sortBy: null, // string, function or array,
  resizable: true,
  context: null,
  columnKey: '',
  align: '',
  headerAlign: '',
  showTooltipWhenOverflow: true,
  showOverflowTooltip: true,
  fixed: false, // bool or string
  formatter: null, // todo: function
  selectable: null, // todo: function
  reserveSelection: true,
  filterMethod: null, // todo: function
  filteredValue: null,
  filters: null,
  filterPlacement: '',
  filterMultiple: true,
  index: null, // todo: number or function
  sortOrders: null,

  init() {
    this._super();
    set(this, 'width', {});
    set(this, 'minWidth', {});
    set(this, 'context', {});
    set(this, 'filteredValue', []);
    set(this, 'filters', []);
    set(this, 'sortOrders', ['ascending', 'descending', null]);
  },

  data() {
    return {
      isSubColumn: false,
      columns: [],
    };
  },

  beforecreate() {
    this.row = {};
    this.column = {};
    this.$index = 0;
  },
});
