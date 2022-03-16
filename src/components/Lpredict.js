import { Slider, FormLabel, RadioGroup, FormControlLabel, Radio, Switch, Button, Typography } from '@mui/material'
import React, { useState,useRef } from 'react'
import axios from 'axios'
import { addDoc, updateDoc, deleteDoc, doc, collection, Timestamp, getDocs } from 'firebase/firestore';
import { db } from '../firebase';


// {
// "age" : 19,
// "diabetes" : 0,
// "bloodpressure" :0,
// "transplant" : 0,
// "chronicdisease" :0,
// "height" : 170,
// "weight" : 46,
// "allergies" : 1,
// "cancer" : 0,
// "surgeries" : 0
// }
export default function Lpredict() {
  const [loading,setLoading] = useState(false)
  const [age, setAge] = useState(20)
  const [diabetes,setDiabetes] = useState(false)
  const [bloodpressure,setBloodpressure] = useState(false)
  const [transplant,setTransplant] = useState(false)
  const [chronicdisease,setChronicdisease] = useState(false)
  const [height,setHeight] = useState(155)
  const [weight,setWeight] = useState(50)
  const [allergies,setAllergies] = useState(false)
  const [cancer,setCancer] = useState(false)
  const [surgeries,setSurgeries] = useState(false)
  const [data_list, setData_list] = useState([])
  const [data,setData] = useState({})
  const [prediction,setPrediction] = useState(0)
  const lifedbRef = collection(db, 'life-predictions')

  const handleAgechange = (e,newValue) => {
    // console.log(EmailRef.current.value)
    setAge(newValue)
  }
  const handleDiabeteschange = (e,newValue) => {
    setDiabetes(newValue)
  }
  const handleBloodpressurechange = (e,newValue) => {
    setBloodpressure(newValue)
  }
  const handleTransplantchange = (e,newValue) => {
    setTransplant(newValue)
  }
  const handleChronicdiseasechange = (e,newValue) => {
    setChronicdisease(newValue)
  }
  const handleAllergieschange = (e,newValue) => {
    setAllergies(newValue)
  }
  const handleCancerchange = (e,newValue) => {
    setCancer(newValue)
  }
  const handleSurgerieschange = (e,newValue) => {
    setSurgeries(newValue)
  }
  const handleHeightchange = (e,newValue) => {
    setHeight(newValue)
  }
  const handleWeightchange = (e,newValue) => {
    setWeight(newValue)
  }

  const handlePredict = async (e) => {
    e.preventDefault()
    setLoading(true)
    setData({
        age : age,
        diabetes : diabetes?1:0,
        bloodpressure :bloodpressure?1:0,
        transplant : transplant?1:0,
        chronicdisease :chronicdisease?1:0,
        height : height,
        weight : weight,
        allergies : allergies?1:0,
        cancer : cancer?1:0,
        surgeries : surgeries?1:0
    })
    await putData()
    // .then(()=>{
    //   addDoc(lifedbRef,{
    //     age : age,
    //     diabetes : diabetes,
    //     bloodpressure :bloodpressure,
    //     transplant : transplant,
    //     chronicdisease :chronicdisease,
    //     height : height,
    //     weight : weight,
    //     allergies : allergies,
    //     cancer : cancer,
    //     surgeries : surgeries,
    //     prediction : prediction
    //   }).then(()=>{
    //     console.log("uploded")
    //   }).catch((err)=>{
    //     console.log(err)
    //   })
    // })
    setLoading(false)
  }

  async function putData() {
    // .put(`http://localhost:8000/api/medical-insurance/${data.id}/`,data)
    // .post(`http://localhost:8000/api/medical-insurance/`,data)
    await axios
      .post("http://localhost:8000/api/life-insurance/", data)
      .then((res) => {
        console.log(res.data)
        setPrediction(res.data[1])
        addDoc(lifedbRef,{
        age : age,
        diabetes : diabetes,
        bloodpressure :bloodpressure,
        transplant : transplant,
        chronicdisease :chronicdisease,
        height : height,
        weight : weight,
        allergies : allergies,
        cancer : cancer,
        surgeries : surgeries,
        prediction : prediction
      }).then(()=>{
        console.log("uploded")
      }).catch((err)=>{
        console.log(err)
      })
      })
      .catch(err => { console.log(err) })
  }

  // const EmailRef = useRef()

  return (
    <>
      <div className='container-predict'>
        <div className='formbox-predict'>
          <div className='card-predict'>
            <FormLabel>Age</FormLabel>
            <Typography>{age}</Typography>
            <Slider
              defaultValue={20}
              valueLabelDisplay="auto"
              value={age}
              // ref={EmailRef}
              onChange={handleAgechange}
              step={1}
              min={1}
              max={100}
            />
          </div>
          <div className='card-predict'>
            <FormLabel>Diabetes</FormLabel>
            <Typography>{diabetes?'yes':'no'}</Typography>
            <Switch value={diabetes} onChange={handleDiabeteschange} />
          </div>
          <div className='card-predict'>
            <FormLabel>Bloodpressure</FormLabel>
            <Typography>{bloodpressure?'yes':'no'}</Typography>
            <Switch value={bloodpressure} onChange={handleBloodpressurechange} />
          </div>
          <div className='card-predict'>
            <FormLabel>Transplant</FormLabel>
            <Typography>{transplant?'yes':'no'}</Typography>
            <Switch value={transplant} onChange={handleTransplantchange} />
          </div>
          <div className='card-predict'>
            <FormLabel>Chronicdisease</FormLabel>
            <Typography>{chronicdisease?'yes':'no'}</Typography>
            <Switch value={chronicdisease} onChange={handleChronicdiseasechange} />
          </div>
          <div className='card-predict'>
            <FormLabel>Height</FormLabel>
            <Typography>{height}</Typography>
            <Slider
              defaultValue={155}
              valueLabelDisplay="auto"
              value={height}
              onChange={handleHeightchange}
              step={1}
              min={130}
              max={200}
            />
          </div>
          <div className='card-predict'>
            <FormLabel>Weight</FormLabel>
            <Typography>{weight}</Typography>
            <Slider
              defaultValue={50}
              valueLabelDisplay="auto"
              value={weight} 
              onChange={handleWeightchange}
              step={1}
              min={30}
              max={140}
            />
          </div>
          <div className='card-predict'>
            <FormLabel>Allergies</FormLabel>
            <Typography>{allergies?'yes':'no'}</Typography>
            <Switch value={allergies} onChange={handleAllergieschange} />
          </div>
          <div className='card-predict'>
            <FormLabel>Cancer</FormLabel>
            <Typography>{cancer?'yes':'no'}</Typography>
            <Switch value={cancer} onChange={handleCancerchange} />
          </div>
          <div className='card-predict'>
            <FormLabel>Surgeries</FormLabel>
            <Typography>{surgeries?'yes':'no'}</Typography>
            <Switch value={surgeries} onChange={handleSurgerieschange} />
          </div>
          <div className='card-predict prediction'>
            {/* <Typography>{JSON.stringify(data)}</Typography> */}
            <Button disabled={loading} onClick={handlePredict} color='primary' variant='contained'>Predict</Button>
            <h1>{prediction}</h1>
          </div>
        </div>
      </div>
    </>
  )
}