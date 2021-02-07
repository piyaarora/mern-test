import React from 'react'
import { Admin, fetchUtils, Resource } from 'react-admin'
import jsonServerProvider from 'ra-data-simple-rest'
import PostList from './components/PostList'
import PostCreate from './components/PostCreate'
import PostEdit from './components/PostEdit'
import UserList from './components/UserList'
import UserCreate from './components/UserCreate'
import UserEdit from './components/UserEdit'

function App() {
  const fetchJson = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    // add your own headers here
    options.headers.set('Content-Range', 'posts 0-20/20');
    return fetchUtils.fetchJson(url, options);
}
  return <Admin dataProvider={jsonServerProvider(`http://localhost:3000/api/`, fetchJson)}>
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