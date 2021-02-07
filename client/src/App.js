import React from 'react'
import { Admin, Resource } from 'react-admin'
import jsonServerProvider from 'ra-data-simple-rest'
import PostList from './components/PostList'
import PostCreate from './components/PostCreate'
import PostEdit from './components/PostEdit'
import UserList from './components/UserList'
import UserCreate from './components/UserCreate'
import UserEdit from './components/UserEdit'

function App() {
  return <Admin dataProvider={jsonServerProvider(`http://localhost:3000/api/`)}>
    <Resource 
      name='posts' 
      list={PostList} 
      create={PostCreate} 
      edit={PostEdit}/>
    <Resource 
      name='users' 
      list={UserList} 
      create={UserCreate} 
      edit={UserEdit}/>
  </Admin>
}

export default App;