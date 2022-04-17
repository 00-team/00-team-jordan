interface SourceObject {
    url: string
    label: string
}

type SourceItem = SourceObject | string
type Source = SourceItem | [SourceItem, ...SourceItem[]]

export { Source, SourceObject, SourceItem }

interface Options {
    className?: string
}

export { Options }
