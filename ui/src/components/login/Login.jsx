import React, { useContext } from 'react'
import API from '../../lib/auth';
import './login.css'
import CloseIcon from '@mui/icons-material/Close';
import { Context } from '../../context/Contexts';

export default function Login({ setVal }) {
    const {dispatch} = useContext(Context);
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: 'LOGIN_START'})
        const form = e.target;
        const formData = {
            email: form.email.value,
            password: form.password.value
        };
        console.log("Form Data:", formData);
        try {
            const res = await API.post("/auth/login", formData);
            localStorage.setItem("token", res.data.token);
            dispatch({type: 'LOGIN_SUCCESS', payload:res.data })
            console.log(res);
            console.log("Login successful!");
            alert('Login successful!')
            setVal(0)
        } catch (error) {
            console.error("Login failed!", error.response?.data);
        }
    };
  return (
    <div className='LoginPage'>
        <div className="registerCard">
          <button className='CloseBtn' onClick={()=>setVal(0)}><CloseIcon fontSize='12px'/></button>
          <span className="head">Login</span>
            <form onSubmit={handleSubmit}>
                <div className="inputContainer">
                    <label htmlFor="">Email:</label>
                    <input type="text" name='email' id='email' placeholder='abc@gmail.com' />
                </div>
                <div className="inputContainer">
                    <label htmlFor="">Password:</label>
                    <input type="password" name='password' id='password' placeholder='password' />
                </div>
                <div className="inputContainer">
                    <button>Submit</button>
                </div>
            </form>
            </div>
        </div>
  )
}
