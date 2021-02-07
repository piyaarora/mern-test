import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Homepage from './components/Homepage'
import UserContext from './context/UserContext'

function Container()  {
  const [contextUserData, setContextUserData] = useState({
    token: undefined,
    user: undefined
  });
    return (
      <div>
         <BrowserRouter>
        <UserContext.Provider value={{contextUserData, setContextUserData}}>
          <Switch>
            <Route exact path="/"><Homepage /></Route>
            <Route path="/register"><Register /></Route>
            <Route path="/login"><Login /></Route>
            <Route path="/dashboard"><App /></Route>
            <Route><h1>404 page not found</h1></Route>
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
      </div>
    )
  }

export default Container
