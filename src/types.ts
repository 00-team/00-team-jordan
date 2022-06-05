import { Component, FC } from 'react'

interface BasePlayerModel {
    video?: HTMLVideoElement
    vito?: HTMLDivElement
    sources?: SourceObjectList
    source?: SourceObject // Current Source
    options?: Options
    toasts?: Toast[]
    setToast?: (toast: string) => void
}

interface Toast {
    id: number
    text: string
}

export { BasePlayerModel, Toast }

interface SourceObject {
    url: string
    label: string
}

type SourceItem = SourceObject | string
type SourceObjectList = [SourceObject, ...SourceObject[]]
type Source = SourceItem | [SourceItem, ...SourceItem[]]

export { Source, SourceObject, SourceItem, SourceObjectList }

export interface Options {
    className?: string
}

enum OptionType {
    Menu,
    Action,
    Element,
}

interface MenuOption {
    type: OptionType.Menu
    label: string
    menu: Menu
}

interface ActionOption {
    type: OptionType.Action
    label: string
    action: () => void
}

interface ElementProps {
    parentMenu: Menu[]
}
export { ElementProps }

class ElementMenu extends Component<ElementProps> {}

interface ElementOption {
    type: OptionType.Element
    element: typeof ElementMenu | FC<ElementProps>
}

type MenuItem = MenuOption | ActionOption | ElementOption
type Menu = MenuItem[]

export { OptionType, MenuOption, ActionOption, Menu, MenuItem }
