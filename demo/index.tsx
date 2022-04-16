import React, { FC } from 'react'
import { createRoot } from 'react-dom/client'

// style
import './style.scss'

const App: FC = () => {
    return <div className='app'>App</div>
}

const root = createRoot(document.getElementById('root')!)
root.render(<App />)
