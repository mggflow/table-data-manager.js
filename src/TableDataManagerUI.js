import {toggleSetKey} from "./Helpers.js";

export default class TableDataManagerUI {
    mgr

    labels

    fieldsOrder
    groupBy
    columns

    grouped
    viewed

    constructor(tableDataManager, labels = {}) {
        this.mgr = tableDataManager

        this.labels = Object.assign({}, labels)
        this._fillLabels()

        this.grouped = []
        this.viewed = []

        this.resetColumns()
        this.resetGroupBy()
        this.resetFieldsOrder()
    }

    provideView() {
        this.grouped = this.mgr.grouper.group(this.groupBy, this.mgr.items)
        this.viewed = this.mgr.viewer.view(this.grouped)

        return this.sortedView()
    }

    sortedView() {
        this.mgr.sorter.sortBy(this.viewed, this.fieldsOrder)

        return this.viewed
    }

    toggleFieldsOrder(fieldKey) {
        if (!this.fieldsOrder.has(fieldKey)) {
            this.fieldsOrder.set(fieldKey, 'asc')
        } else if (this.fieldsOrder.get(fieldKey) === 'asc') {
            this.fieldsOrder.set(fieldKey, 'desc')
        } else if (this.fieldsOrder.get(fieldKey) === 'desc') {
            this.fieldsOrder.delete(fieldKey)
        }
    }

    toggleGroupBy(fieldKey) {
        toggleSetKey(fieldKey, this.groupBy)
    }

    toggleColumn(fieldKey) {
        toggleSetKey(fieldKey, this.columns)
    }

    getLabel(fieldKey) {
        return this.labels[fieldKey] ?? 'Unknown'
    }

    getColumns() {
        return this.columns
    }

    getGroupBy() {
        return this.groupBy
    }

    getFieldsOrder() {
        return this.fieldsOrder
    }

    resetColumns() {
        this.columns = new Set(this.mgr.fieldKeys)
    }

    resetFieldsOrder() {
        this.fieldsOrder = new Map()
    }

    resetGroupBy() {
        this.groupBy = new Set()
    }

    _fillLabels() {
        for (const fieldKey in this.mgr.getFieldKeys()) {
            if (fieldKey in this.labels) {
                continue
            }

            this.labels[fieldKey] = fieldKey
        }

    }
}