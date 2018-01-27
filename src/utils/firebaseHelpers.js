import { mapObjIndexed, pipe } from 'ramda'

const addKey = (item, key) => ({ ...item, key })

const addKeys = (booksObj) =>
    mapObjIndexed(addKey, booksObj)

const toArray = (booksObj) =>
    Object.keys(booksObj).map((item) => booksObj[item])

export const pipeObjToArray = pipe(
    addKeys,
    toArray,
)

export const objToArrayExplicit = (obj) =>
    pipeObjToArray(obj)

export const extractSnap = (snap) =>
    Object.assign({}, snap.val(), { key: snap.key })

export const extractSnaps = (snaps) =>
    snaps.map((item) => extractSnap(item))

export const extractSnapsWithKey = (snaps) => snaps.map((snap) => extractSnap(snap))

export const objToArray = (obj) =>
    obj ? pipeObjToArray(obj) : ''

export const extractVal = (snap) => snap.val()