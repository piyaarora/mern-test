import React, { useState,useEffect,useContext} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import UserContext from '../../context/UserContext';

// import { Link } from "react-router-dom";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const history = useHistory();

    const {contextUserData, setContextUserData} = useContext(UserContext);


const [user,setUser] = useState({
  email:'',
  password:''
})

const handleChange =(e)=>{
  setUser({
    ...user,
    [e.target.name] : e.target.value
  })

}

const handleSubmit = () =>{
  axios.post('http://localhost:3000/api/auth/login', user)
  .then((res) => {
    console.log('logged in user', res);
    
    setContextUserData({
      token: res.data.token,
      user: res.data.user
    })
    localStorage.setItem("x-auth-token", res.data.token)
    history.push('/dashboard');


    setUser({   
      email:'',
      password:''
    })
  })
  .catch((err) => {
    console.log('err', err);
  })
}
    useEffect(()=>{
        console.log('user data in login page', contextUserData);
    },[contextUserData])


  return (
    <Container>
      <h4 style={{ textAlign: "center", margin: "24px 0px" }}>Login Page</h4>
      <Row style={{ justifyContent: "center" }}>
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" name="email" value={user.email} onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your Password" required name="password" value={user.password} onChange={handleChange} />
          </Form.Group>
          <div className="d-flex justify-content-center mt-4">
            <Button type="button" className="btn btn-dark btn-sm btn-block" onClick={handleSubmit}>Submit</Button>
          </div>
        </Form>
      </Row>
      <Row className="d-flex justify-content-center mt-4">
        {/* <Link to="/register" style={{marginRight: 12}}>Register New User</Link> */}
        {/* <Link to="/" style={{marginLeft: 12}}>Go to Home</Link> */}
      </Row>
    </Container>)
}

export default Login;