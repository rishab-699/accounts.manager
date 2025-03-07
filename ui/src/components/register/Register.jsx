import React from 'react'
import './register.css'
import CloseIcon from '@mui/icons-material/Close';
import API from '../../lib/auth';

export default function Register({ setVal }) {
    const handleSubmit = async(e)=>{
        e.preventDefault();

        const user = {
          firm: e.target.firm.value,
          userName: e.target.user.value,
          email: e.target.email.value,
          password: e.target.password.value
        }
        console.log(user);
        try {
          const register = await API.post("/auth/register", user);
          console.log(register);
          setVal(1);
        } catch (error) {
          console.log(error);
        }
        
    }
  return (
    <div className='RegisterWindow'>
        <div className="registerCard">
          <button className='CloseBtn' onClick={()=>setVal(0)}><CloseIcon fontSize='12px'/></button>
          <span className="head">Register</span>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <div className="inputRow">
            <div className="inputContainer">
                  <label htmlFor="">Firm Name:</label>
                  <input type="text" name='firm' id='firm' />
              </div>
              <div className="inputContainer">
                  <label htmlFor="">User Name:</label>
                  <input type="text" name='user' id='user' placeholder='user name' />
              </div>
              </div>
              <div className="inputRow">
              <div className="inputContainer">
                  <label htmlFor="">Email:</label>
                  <input type="email" name='email' id='email' placeholder='abc@gmail.com' />
              </div>
          
              <div className="inputContainer">
                  <label htmlFor="">Password:</label>
                  <input type="password" name='password' id='password' placeholder='password' />
              </div>
          </div>
          <div className="inputRow">
            <div className="inputContainer form-button">
                <button>register</button>
            </div>
          </div>
        </form>
        </div>
    </div>
  )
}
