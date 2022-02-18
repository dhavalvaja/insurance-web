import React, { useRef, useState } from 'react';
import '../CSS/feedback.css';
import { useAuth } from '../Authcontext';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

export default function Feedback() {
  const FeedbackRef = useRef()
  const dbRef = collection(db,'feedback')
  const {currentUser} = useAuth()
  const [message,setMessage] = useState('')
  const [error,setError] = useState('')

  async function uploadFeedback(e){
    e.preventDefault()
    setMessage('')
    addDoc(dbRef, {
      userid: currentUser.uid,
      usermail: currentUser.email,
      feedback: FeedbackRef.current.value
    })
    .then(()=>{
      setMessage('feedback submiitted succsesfully...')
    })
    .catch(()=>{
      setError('somthing went wrong...')
    })
  }

  return (
    <>
    <div className='dflex'>
      {message && <div className='messagebox'>{message}</div>}
      {error && <div className='errorbox'>{error}</div>}
      <div className='mycard'>
        <form onSubmit={uploadFeedback}>
          <div className='dflex'>
            <textarea ref={FeedbackRef} width='400' hight='400' placeholder='type your feedback here...'></textarea>
          </div>
          <div className='dflex'>
            <input className='mybtn' type={'submit'} value={'Upload'}/>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}
