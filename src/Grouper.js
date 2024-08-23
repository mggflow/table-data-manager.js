/**
 * Grouping module.
 */
export default class Grouper {
    defDelimiter
    defEmptyPlug

    fields = {}
    groupingKey = []

    constructor(defDelimiter = '~/~', defEmptyPlug = '.?~`') {
        this.defDelimiter = defDelimiter
        this.defEmptyPlug = defEmptyPlug

        this._getDefValue = this._getDefValue.bind(this)
        this.getGroupingKeyStr = this.getGroupingKeyStr.bind(this)
    }

    /**
     * Group items by grouping key.
     * @param groupingKey
     * @param items
     * @returns {{}}
     */
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

    /**
     * Set field transformer.
     * @param fieldKey
     * @param transformer
     */
    setField(fieldKey, transformer = null) {
        if (transformer === null) {
            this.fields[fieldKey] = (item) => this._getDefValue(item, fieldKey)
        } else {
            this.fields[fieldKey] = transformer
        }
    }

    /**
     * Create grouping key string for item.
     * @param item
     * @returns {string}
     */
    getGroupingKeyStr(item) {
        return [...this.groupingKey].map((fieldKey) => this._getValue(item, fieldKey)).join(this.defDelimiter)
    }

    /**
     * Get grouping delimiter.
     * @returns {*}
     */
    getDelimiter() {
        return this.defDelimiter
    }

    /**
     * Get transforming empty plug.
     * @returns {*}
     */
    getEmptyPlug() {
        return this.defEmptyPlug
    }

    _getValue(item, fieldKey) {
        return this.fields[fieldKey](item)
    }

    _getDefValue(obj, fieldKey) {
        return obj[fieldKey] ?? this.defEmptyPlug
    }
}