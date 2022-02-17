import React,{useRef,useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { gprovider } from '../firebase';
import { useAuth } from '../Authcontext';
import '../CSS/login.css'
import googlelogo from '../img/g.ico'
import facebooklogo from '../img/f.ico'
import twitterlogo from '../img/t.ico'

export default function Signup() {

  const emailRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const { signup,loginwithgoogle } = useAuth()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false) 
  const navigate = useNavigate()


  const glogin = () => {
    loginwithgoogle(gprovider).then((result) => {
      navigate('/')
    }).catch((error) => {
      setError("Failed to log in")
    });
  };

  async function handleSubmit(e) {
		e.preventDefault()

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match")
		}
		try {
			setError("")
			setLoading(true)
			await signup(emailRef.current.value, passwordRef.current.value)
      navigate('/')
		} catch {
			setError("Failed to create an account")
		}
		setLoading(false)
	}

  return (
    <>
      <div className='login'>
          <div className='formbox'>
            <h2>Sign Up</h2>
            {error && <div className='errorbox'>{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className='inputbox'>
                <input type="email" ref={emailRef} placeholder='E-mail' />
              </div>
              <div className='inputbox'>
                <input type="password" ref={passwordRef} placeholder='Password' />
              </div>
              <div className='inputbox'>
                <input type="password" ref={passwordConfirmRef} placeholder='Confirm Password' />
              </div>
              <div className='inputbox'>
                <input type="submit" value='Sign Up' />
              </div>
            </form>
            <div className='logintext'>
              <Link to='/login'>Log In</Link>
            </div>
            <ul className='sci'>
              <li onClick={glogin} className='Google'><img alt='google' src={googlelogo}/></li>
              <li className='Facebook'><img alt='facebook' src={facebooklogo}/></li>
              <li className='Twitter'><img alt='twitter' src={twitterlogo}/></li>
            </ul>
          </div>
      </div>
    </>
  )
}
