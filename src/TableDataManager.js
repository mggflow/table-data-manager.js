export default class TableDataManager {
    items

    grouper
    viewer
    sorter

    fieldKeys


    constructor(grouper, viewer, sorter) {
        this.grouper = grouper
        this.viewer = viewer
        this.sorter = sorter
    }

    init(items = [], viewingFields = {}, groupingFields = {}) {
        this.items = items

        this._applyFieldKeys = this._applyFieldKeys.bind(this)

        this._scanFieldKeys(viewingFields, groupingFields)
        this._applyFieldKeys(viewingFields, groupingFields)
    }

    getFieldKeys() {
        return this.fieldKeys
    }

    _applyFieldKeys(viewingFields, groupingFields) {
        for (const fieldKey of this.fieldKeys) {
            this.grouper.setField(fieldKey, groupingFields[fieldKey] ?? null)
            this.viewer.setField(fieldKey, viewingFields[fieldKey] ?? null)
        }
    }

    _scanFieldKeys(viewingFields, groupingFields) {
        this.fieldKeys = new Set()
        for (const idx in this.items) {
            let item = this.items[idx]
            for (const fieldKey in item) {
                this.fieldKeys.add(fieldKey)
            }
        }
        for (const fieldKey in viewingFields) {
            this.fieldKeys.add(fieldKey)
        }
        for (const fieldKey in groupingFields) {
            this.fieldKeys.add(fieldKey)
        }
    }
}