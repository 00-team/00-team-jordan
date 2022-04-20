interface SourceObject {
    url: string
    label: string
}

type SourceItem = SourceObject | string
type SourceObjectList = [SourceObject, ...SourceObject[]]
type Source = SourceItem | [SourceItem, ...SourceItem[]]

export { Source, SourceObject, SourceItem, SourceObjectList }

interface Options {
    className?: string
}

export { Options }
