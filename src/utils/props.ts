import { Source, SourceObject, SourceObjectList } from '../types'

const SOURCE_INVALID = 'this source is not valid!'

const GetSourceObject = (url: string): SourceObject => {
    return { url: url, label: 'video' }
}

const ConvertSource = (source: Source): SourceObjectList => {
    if (!source) throw Error(SOURCE_INVALID)

    if (typeof source === 'string') return [{ url: source, label: 'video' }]

    if (source.constructor === Array) {
        const SourceList = source.map(s =>
            typeof s === 'string' ? GetSourceObject(s) : s
        )
        if (SourceList.length < 1) throw Error(SOURCE_INVALID)
        return SourceList as SourceObjectList
    }

    if ('url' in source && 'label' in source) return [source]

    throw Error(SOURCE_INVALID)
}

const GetMainSource = (sources: SourceObjectList): SourceObject => {
    if (sources.length < 1) throw Error(SOURCE_INVALID)

    return sources[0]!
}

export { ConvertSource, GetMainSource }
