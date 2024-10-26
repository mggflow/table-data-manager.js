import GrouperSettings from "./GrouperSettings.js";
import SingleValueConverter from "./SingleValueConverter.js";

/**
 * Grouping module.
 */
export default class Grouper {
    settings
    singleValueConverter

    fields = {}
    groupingKey = []

    constructor(settings = null, singleValueConverter = null) {
        this.settings = settings ?? new GrouperSettings()
        this.singleValueConverter = singleValueConverter ?? new SingleValueConverter()

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
        return [...this.groupingKey].map((fieldKey) => this._singleConverted(item, fieldKey)).join(this.settings.delimiter)
    }

    /**
     * Get grouping delimiter.
     * @returns {*}
     */
    getDelimiter() {
        return this.settings.delimiter
    }

    /**
     * Get transforming empty plug.
     * @returns {*}
     */
    getEmptyPlug() {
        return this.settings.emptyPlug
    }

    _getValue(item, fieldKey) {
        return this.fields[fieldKey](item)
    }

    _singleConverted(item, fieldKey) {
        let val = this._getDefValue(item, fieldKey)

        return this.singleValueConverter.convert(val, fieldKey, item)
    }

    _getDefValue(obj, fieldKey) {
        return obj[fieldKey] ?? this.settings.emptyPlug
    }
}