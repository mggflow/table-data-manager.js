export default class Grouper {
    defDelimiter
    defEmptyPlug

    fields = {}
    groupingKey = []

    constructor(defDelimiter= '~/~', defEmptyPlug= '.?~`') {
        this.defDelimiter = defDelimiter
        this.defEmptyPlug = defEmptyPlug

        this._getDefValue = this._getDefValue.bind(this)
        this.getGroupingKeyStr = this.getGroupingKeyStr.bind(this)
    }

    group(groupingKey, items) {
        this.groupingKey = groupingKey

        const grouped = {}

        let idx = 0
        const strGetter = (groupingKey.length || groupingKey.size) ? this.getGroupingKeyStr : (_) => String(idx)
        for (const item of items) {
            const itemKey = strGetter(item)

            if (!(itemKey in grouped)) {
                grouped[itemKey] = []
            }

            grouped[itemKey].push(item)
            idx++
        }

        return grouped
    }

    setField(fieldKey, transformer = null) {
        if (transformer === null) {
            this.fields[fieldKey] = (item) => this._getDefValue(item, fieldKey)
        } else {
            this.fields[fieldKey] = transformer
        }
    }

    getGroupingKeyStr(item) {
        return [...this.groupingKey].map((fieldKey) => this._getValue(item, fieldKey)).join(this.defDelimiter)
    }

    _getValue(item, fieldKey) {
        return this.fields[fieldKey](item)
    }

    _getDefValue(obj, fieldKey) {
        return obj[fieldKey] ?? this.defEmptyPlug
    }
}