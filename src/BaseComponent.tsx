import { PureComponent, ContextType } from 'react'

// context
import { PlayerContext } from './context'

class BaseComponent<P = {}, S = {}> extends PureComponent<P, S> {
    // context setup
    static override contextType = PlayerContext
    declare context: ContextType<typeof PlayerContext>

    public video = this.context.video
    public vito = this.context.vito

    public options = this.context.options

    public source = this.context.source
    public sources = this.context.sources

    public toasts = this.context.toasts
    public setToast = this.context.setToast
}

export default BaseComponent
