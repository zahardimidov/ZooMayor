import { createRoot } from 'react-dom/client'
import './tailwind.css'
import { WithRouter } from './router'

const rootElement = document.getElementById('root')

if (!rootElement) throw Error('rootElement is null')

const root = createRoot(rootElement)

root.render(<WithRouter />)
