import React, { useEffect, useState } from 'react'
import './home.css';
import axios from 'axios';
import Login from '../../components/login/Login';
import API from '../../lib/auth';


export default function Home() {
  const [server, setServer] = useState('Server is not live!');
  const [status, setStatus] = useState('error');
  const [jwtresponse, setJwtResponse]= useState({message:'No Token Generated'});
  useEffect(()=>{
    const getData = async()=>{
      try {
        const data = await axios.get('/api');
        await API.post('/auth/register',{username: 'test', password: 'test'})
        console.log(data);
        if(data.status === 200){
          setStatus('good');
        }else{
          status('error')
        }
        setServer(data.data);

      } catch (error) {
        console.log(error);
        setServer('Something Went Wrong!')
      }
    }
    getData();
    const fetchDashboard = async () => {
      try {

          const res = await API.get("/dashboard");
          console.log(res.data.message);
          setJwtResponse(res.data);
      } catch (error) {
          console.error("Access denied!", error.response?.data);
          setJwtResponse({message:'No Response'});
      }
    };
    fetchDashboard();
  },[]);
  return (
    <div className='Home'>
      <div className="ServerInfo">
        <table>
          <tbody>
            <tr>
              <td>Server Info:</td>
              <td className='status'><div className={status}></div> {server}</td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>The server is a basic Express Server with facility to connect to mongodb account</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="JWTInfo">
        <Login/>
        <div className="tokenDetails">
          <h1>Token Status:</h1>
          <h1>{jwtresponse.message}</h1>
        </div>
      </div>
    </div>
  )
}
