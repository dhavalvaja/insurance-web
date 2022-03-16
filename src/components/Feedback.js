import React, { useRef, useState, useEffect } from 'react';
import '../CSS/feedback.css';
import { useAuth } from '../Authcontext';
import { addDoc, updateDoc, deleteDoc, doc, collection, Timestamp, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import {Button} from '@mui/material'

export default function Feedback() {
  const FeedbackRef = useRef()
  const dbRef = collection(db, 'feedback')
  const { currentUser } = useAuth()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [feedbacks, setFeedbacks] = useState([])

  async function uploadFeedback(e) {
    e.preventDefault()
    setError('')
    setMessage('')
    if (currentUser === null) {
      setError("you need to sign in")
    }
    else {
      addDoc(dbRef, {
        userid: currentUser.uid,
        usermail: currentUser.email,
        feedback: FeedbackRef.current.value,
        created: Timestamp.now()
      })
        .then(() => {
          setMessage('feedback submiitted succsesfully...')
        })
        .catch(() => {
          setError('somthing went wrong...')
        })
    }
  }


  async function getFeedbackdb() {
    const getUsers = async () => {
      const data = await getDocs(dbRef);
      setFeedbacks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }

  useEffect(() => {
    console.log(feedbacks)
    const getUsers = async () => {
      const data = await getDocs(dbRef);
      setFeedbacks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, [])

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
              <input className='mybtn' type={'submit'} value={'Upload'} />
            </div>
          </form>
        </div>
        <Button onClick={getFeedbackdb}>refresh</Button>

        <div>
          {feedbacks.map((fd,id) => {
            return(

              <div className='mycard'>
                <p>{fd.feedback}</p>
                <p>{fd.usermail}</p>
              </div>
              )
          })}
        </div>


      </div>
    </>
  )
}
