# Table Data Manager

JS library that provides and simplifies data handling for table view.

## Installation

Use command to install dependencies:

```
npm i @mggflow/table-data-manager
```

## Description

This library let you handle workflow with data to table view.
For example - you have array of users from database, and you need to view them in table.
Moreover, you need to group them or do some preparations before the view.
By this library you can just describe actions for columns and grouping rules.
Thus, you will get the correct dataset for viewing in table.

## Concept

1) Some data
2) Group this data, just all data are group too
3) Transform data for view
4) Sort data by order
5) View data in table

## Usage

Some data.

```
const users = [
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
```

Describe extra fields for grouping.

```
const groupingFields = {
    'g_height': (_) => 190,
    'g_age': (item) => item['age'] + Math.round(Math.random() * 10)
}
```

Describe extra fields for viewing. Important: viewing fields - handlers for items group, not for item separately.

```
let viewingFields = {
    'v_weight': (usersGroup) => usersGroup.map(() => 55).join(' he '),
    'cnt': (usersGroup) => usersGroup.length
}
```

Define labels for fields.

```
const labels = {
    'id': 'ID',
    'name': 'Name',
    'sex': 'Sex',
    'cnt': 'Amount',
}
```

Make TableDataManager and initialize it.

```
const mgr = makeTableDataManager()
mgr.init(users, viewingFields, groupingFields)
```

Next define columns for grouping.

```
const groupBy = ['sex']
```

And describe order for sorting.

```
const fieldsOrder = new Map(Object.entries({
    'sex': 'asc' // female, male
}))
```

Now let`s go to see result.
```
const grouped = mgr.grouper.group(groupBy, mgr.items)
const viewed = mgr.viewer.view(grouped)
mgr.sorter.sortBy(viewed, fieldsOrder)

console.log('Grouped:', grouped)
console.log('Viewed:', viewed)
```

And we will see something like it.
```
Grouped: {
  male: [
    { id: 0, name: 'Mark', sex: 'male', age: 31 },
    { id: 1, name: 'John', sex: 'male', age: 7 },
    { id: 2, name: 'Den', sex: 'male', age: 99 }
  ],
  female: [
    { id: 3, name: 'Jane', sex: 'female', age: 19 },
    { id: 4, name: 'Kate', sex: 'female', age: 17 }
  ]
}
Viewed: [
  {
    id: '3; 4',
    name: 'Jane; Kate',
    sex: 'female',
    age: '19; 17',
    v_weight: '55 he 55',
    cnt: 2,
    g_height: '-',
    g_age: '-'
  },
  {
    id: '0; 1; 2',
    name: 'Mark; John; Den',
    sex: 'male',
    age: '31; 7; 99',
    v_weight: '55 he 55 he 55',
    cnt: 3,
    g_height: '-',
    g_age: '-'
  }
]
```