import React ,{useState,useEffect} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../Authcontext';
import '../CSS/navbar.css';
import logo from '../img/logo.png'


export default function Navbar() {
  const [error,setError] = useState("")
  const { currentUser,logout } = useAuth();
  const [loading,setLoding] = useState(false)
  const navigate = useNavigate()
  const [isAuth,setIsAuth] = useState(false)
  
  useEffect(() => {
    if(currentUser!==null){
      setIsAuth(true)
    }
    else{
      setIsAuth(false)
    }
    return 
  }, [currentUser])

  async function handleLogout() {
    setError("")
    try {
      await logout()
      navigate('/login')
    } catch {
      setError("Failed to log out")
    }
  }
  return (
    <>
      <div className='navbar'>
        {/* <Link className='logo1' to='/'>Insurance</Link> */}
        <img className='logo' src={logo} />
        <ul className='nav2'>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/insurance'>Insurance</Link> </li>
          <li><Link to='/feedback'>Feedback</Link></li>
          <li><Link to='/contact'>Contact</Link></li>
        </ul>
        <div className='nav3'>
          <div className='predict'>
            <Link to='predictions'>
              Predict
            </Link>
          </div>
          {/* <div className='profile'>
            <Link to={'/profile'}>
              Profile
            </Link>
          </div> */}
          <div className='profile'>
            <Link to={isAuth?'/profile':'/login'}>
              {isAuth?'Profile':'Sign In'}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
