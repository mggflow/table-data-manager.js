export default class Viewer {
    defDelimiter
    defEmptyPlug

    fields = {}

    constructor(defDelimiter = '; ', defEmptyPlug = '-') {
        this.defDelimiter = defDelimiter
        this.defEmptyPlug = defEmptyPlug

        this._getDefValue = this._getDefValue.bind(this)
    }

    view(grouped) {
        const itemsView = []
        for (const groupKey in grouped) {
            const groupItems = grouped[groupKey]
            const itemView = {}
            for (const fieldKey in this.fields) {
                itemView[fieldKey] = this._getValue(groupItems, fieldKey)
            }
            itemsView.push(itemView)
        }

        return itemsView
    }

    setField(fieldKey, transformer = null) {
        if (transformer === null) {
            this.fields[fieldKey] = (items) => [...new Set(items.map((obj) => this._getDefValue(obj, fieldKey)))]
                .join(this.defDelimiter)
        } else {
            this.fields[fieldKey] = transformer
        }
    }

    _getValue(items, fieldKey) {
        return this.fields[fieldKey](items)
    }


    _getDefValue(item, fieldKey) {
        return item[fieldKey] ?? this.defEmptyPlug
    }
}