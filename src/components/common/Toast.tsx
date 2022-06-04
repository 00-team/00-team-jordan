import React, { ReactElement, PureComponent } from 'react'

import { PlayerContext } from '../../context'

interface ToastProps {}

interface ToastState {}

class Toast extends PureComponent<ToastProps, ToastState> {
    override state: ToastState = {}

    override render(): ReactElement {
        return (
            <div className='toasts-container'>
                <PlayerContext.Consumer>
                    {({ toasts }) =>
                        toasts &&
                        toasts.map((toast, index) => (
                            <div className='toast' key={index}>
                                {toast.text}
                            </div>
                        ))
                    }
                </PlayerContext.Consumer>
            </div>
        )
    }
}

export { Toast }
export default Toast
