export function toggleSetKey(key, set) {
    if (key in set) {
        set.delete(key)
    } else {
        set.add(key)
    }

    return set
}