import React from 'react'
import { Route,Routes } from 'react-router-dom'
import CreateBook from './components/CreateBook'
import DeleteBook from './components/DeleteBook'
import EditBook from './components/EditBook'
import ShowBook from './components/ShowBook'
import Home from './components/Home'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/books/create' element={<CreateBook/>}></Route>
      <Route path='/books/details/:id' element={<ShowBook/>}></Route>
      <Route path='/books/edit/:id' element={<EditBook/>}></Route>
      <Route path='/books/delete/:id' element={<DeleteBook/>}></Route>
    </Routes>
  )
}

export default App