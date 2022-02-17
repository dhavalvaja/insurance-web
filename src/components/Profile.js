import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Authcontext';
import '../CSS/profile.css'

export default function Profile() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { currentUser, logout, upadatepassword, updateemail } = useAuth()
  const navigate = useNavigate()

  const uname = currentUser.displayName
  const uphoto = currentUser.photoURL
  const uemail = currentUser.email


  async function handleLogout() {
    setError("")
    try {
      await logout()
      navigate('/login')
    } catch {
      setError("Failed to log out")
    }
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateemail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(upadatepassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        navigate('/')
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <div className='profile'>
        <h1>Profile</h1>
        {error && <div className='errorbox'>{error}</div>}
        {
        currentUser &&
        <>
        <img src={uphoto} width='100' height='100' alt='avatar' />
        <p>{uname}</p>
        <p>{uemail}</p>
        </>
      }
        <div className='mybtn' onClick={handleLogout}>Log Out</div>

        <h2 >Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="email"
            ref={emailRef}
            required
            defaultValue={currentUser.email}
          />
          <input
            type="password"
            ref={passwordRef}
            placeholder="Leave blank to keep the same"
          />
          <input
            type="password"
            ref={passwordConfirmRef}
            placeholder="Leave blank to keep the same"
          />
          <input disabled={loading} className="w-100" type="submit"update/>
        </form>
      </div>
    </>
  )
}
