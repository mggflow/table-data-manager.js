import TableDataManager from "./TableDataManager.js";
import Grouper from "./Grouper.js";
import Viewer from "./Viewer.js";
import Sorter from "./Sorter.js";
import TableDataManagerUI from "./TableDataManagerUI.js";

export default function makeTableDataManager(groupingDefDelimiter = '~/~', groupingDefEmptyPlug = '.?~`',
                                             viewingDefDelimiter = '; ', viewingDefEmptyPlug = '-') {
    return new TableDataManager(new Grouper(groupingDefDelimiter, groupingDefEmptyPlug),
        new Viewer(viewingDefDelimiter, viewingDefEmptyPlug), new Sorter())
}

let obj_s = [
    {
        'id': 0,
        'name': 'Mark',
        'sex': 'male',
        'age': 31,
    },
    {
        'id': 1,
        'name': 'John',
        'sex': 'male',
        'age': 7,
    },
    {
        'id': 2,
        'name': 'Den',
        'sex': 'male',
        'age': 99,
        'nigga': 'knock'
    },
    {
        'id': 3,
        'name': 'Jane',
        'sex': 'female',
        'age': 19,
    },
    {
        'id': 4,
        'name': 'Kate',
        'sex': 'female',
        'age': 17,
    },
]

let viewingFields = {
    'v_weight': (_) => _.map(() => 55).join(' he '),
    'cnt': (_) => _.length
}

let groupingFields = {
    'g_height': (_) => 190,
    'g_age': (item) => item['age'] + Math.round(Math.random() * 10)
}

let labels = {
    'id': 'ID',
    'name': 'Имя',
    'sex': 'Пол',
    'cnt': 'Кол-во',
}
const mgr = makeTableDataManager()
mgr.init(obj_s, viewingFields, groupingFields)

const ui = new TableDataManagerUI(mgr, labels)

// let gKey = ['sex']
ui.toggleGroupBy('sex')
// const grouped = mgr.grouper.group(gKey, mgr.items)
// const viewed = mgr.viewer.view(grouped)

// console.log(grouped)
ui.toggleFieldsOrder('sex')

ui.toggleFieldsOrder('age')
ui.toggleFieldsOrder('age')

const viewed = ui.provideView()

console.log(viewed)
console.log(ui.getGroupBy())
console.log(ui.getFieldsOrder())
console.log(ui.getColumns())
// console.log("a".localeCompare("b"))
// console.log(3 - 4)
