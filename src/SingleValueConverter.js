export default class SingleValueConverter {
    commonSingleValueConverters = {}
    fieldSingleValueConverters = {}

    convert(val, fieldKey, item) {
        const converters = this.fieldSingleValueConverters[fieldKey] ?? this.commonSingleValueConverters

        for (let converterKey in converters) {
            const converter = converters[converterKey]
            val = converter(val, fieldKey, item)
        }

        return val
    }
}