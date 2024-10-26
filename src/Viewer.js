import ViewerSettings from "./ViewerSettings.js";
import SingleValueConverter from "./SingleValueConverter.js";

/**
 * Viewing module.
 */
export default class Viewer {
    settings
    singleValueConverter

    fields = {}

    constructor(settings = null, singleValueConverter = null) {
        this.settings = settings ?? new ViewerSettings()
        this.singleValueConverter = singleValueConverter ?? new SingleValueConverter()

        this._getDefValue = this._getDefValue.bind(this)
    }

    /**
     * Create view of grouped items.
     * @param grouped
     * @returns {*[]}
     */
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

    /**
     * Set field for viewing.
     * @param fieldKey
     * @param transformer
     */
    setField(fieldKey, transformer = null) {
        if (transformer === null) {
            this.fields[fieldKey] = this._makeGroupFieldViewer(fieldKey)
        } else {
            this.fields[fieldKey] = transformer
        }
    }

    _makeGroupFieldViewer(fieldKey) {
        const Container = this.settings.uniqueFieldGroupView ? Set : Array
        return (items) => [...new Container(items.map((obj) => this._singleConverted(obj, fieldKey)))].join(this.settings.delimiter)
    }

    _getValue(items, fieldKey) {
        return this.fields[fieldKey](items)
    }

    _singleConverted(item, fieldKey) {
        let val = this._getDefValue(item, fieldKey)

        return this.singleValueConverter.convert(val, fieldKey, item)
    }


    _getDefValue(item, fieldKey) {
        return item[fieldKey] ?? this.settings.emptyPlug
    }
}