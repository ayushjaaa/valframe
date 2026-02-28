import { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home     from './pages/Home'
import Work     from './pages/Work'
import Services from './pages/Services'
import About    from './pages/About'
import Blog     from './pages/Blog'
import Contact  from './pages/ContactPage'
import NotFound from './pages/NotFound'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h2>Something went wrong.</h2>
          <p>Please refresh the page.</p>
        </div>
      )
    }
    return this.props.children
  }
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/work"     element={<Work />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about"    element={<About />} />
          <Route path="/blog"     element={<Blog />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="*"         element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
