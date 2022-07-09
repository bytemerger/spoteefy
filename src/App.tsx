import './tailwind.css'
import React from 'react'
import Router from './router'
import DefaultLayout from './components/layouts/DefaultLayout'

const App = () => {
  return (
    <div className=''>
      <DefaultLayout>
        <Router />
      </DefaultLayout>
    </div>
  )
}

export default App
