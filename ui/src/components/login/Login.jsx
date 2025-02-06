import React from 'react'
import API from '../../lib/auth';
import './login.css'

export default function Login() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = {
            username: form.username.value,
            password: form.password.value
        };
        console.log("Form Data:", formData);
        try {
            const res = await API.post("/auth/login", formData);
            localStorage.setItem("token", res.data.token);
            console.log(res);
            console.log("Login successful!");
        } catch (error) {
            console.error("Login failed!", error.response?.data);
        }
    };
  return (
    <div className='Login'>
            <form onSubmit={handleSubmit}>
                <div className="inputContainer">
                    <label htmlFor="">User Name:</label>
                    <input type="text" name='username' id='username' placeholder='username' />
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
  )
}
