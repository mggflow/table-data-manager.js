export default class Sorter{
    sortBy(items, fieldsOrder){
        const normFieldsOrder = this._normalizeFieldsOrder(fieldsOrder)
        if (!normFieldsOrder.size) return

        items.sort((a, b) => {
            for (const [fieldKey, orderCft] of normFieldsOrder) {
                const numA = Number(a[fieldKey])
                const numB = Number(b[fieldKey])

                let diff = 0
                if (!isNaN(numA) && !isNaN(numB)){
                    diff = numA - numB
                }else{
                    diff = String(a[fieldKey]).localeCompare(String(b[fieldKey]))
                }

                if (!diff){
                    continue
                }

                return diff * orderCft
            }

            return 0
        })
    }

    _normalizeFieldsOrder(fieldsOrder){
        const normFieldsOrder = new Map()
        for (const [fieldKey, order] of fieldsOrder) {
            let orderCft = 0
            if (order === 'asc' || order === 1 || order === true){
                orderCft = 1
            }else if (order === 'desc' || order === -1 || order === false) {
                orderCft = -1
            }else{
                continue
            }
            normFieldsOrder.set(fieldKey, orderCft)
        }

        return normFieldsOrder
    }
}