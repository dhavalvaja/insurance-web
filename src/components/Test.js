import { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { useAuth } from "../Authcontext";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp
} from "firebase/firestore";

export default function Test() {
  const FeedbackRef = useRef()
  const { currentUser } = useAuth()

  const [users, setUsers] = useState([]);
  const dbref = collection(db, "feedbacks");

  const uploadFeedback = async () => {
    await addDoc(dbref, {
      userid: currentUser.uid,
      usermail: currentUser.email,
      feedback: FeedbackRef.current.value,
      created: Timestamp.now()
    });
  };

  // const updateFeedback = async (id, feedback) => {
  //   const userDoc = doc(db, "feedback", id);
  //   const newFields = { feedback: FeedbackRef.current.value };
  //   await updateDoc(userDoc, newFields);
  // };

  const deleteFeedback = async (id) => {
    const userDoc = doc(db, "feedbacks", id);
    await deleteDoc(userDoc);
  };

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(dbref);
  //     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };

  //   getUsers();
  // }, [users]);

  async function getUsersdb() {
    const getUsers = async () => {
      const data = await getDocs(dbref);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }

  return (
    <div className="App">
      <button onClick={getUsersdb}>get</button>
      <input
        ref={FeedbackRef}
        placeholder="feedback..."
      // onChange={(event) => {
      //   setNewName(event.target.value);
      // }}
      />

      <button onClick={uploadFeedback}> Create User</button>
      {users.map((fd) => {
        return (
          <div>
            {" "}
            <h1>feedback: {fd.feedback}</h1>
            {/* <button
              onClick={() => {
                updateUser(fd.id, fd.age);
              }}
            >
              {" "}
              Increase Age
            </button> */}
            <button
              onClick={() => {
                deleteFeedback(fd.id);
              }}
            >
              {" "}
              Delete Feedback
            </button>
          </div>
        );
      })}
    </div>
  );
}