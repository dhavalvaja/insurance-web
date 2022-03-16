import React, { useState,useRef } from 'react'
import axios from 'axios'
import { Slider, FormLabel, RadioGroup, FormControlLabel, Radio, Switch, Button, Typography } from '@mui/material'
import '../CSS/Mpredict.css'

// let data_list = [data]

export default function Mpredict() {

  const [loading,setLoading] = useState(false)
  const [age, setAge] = useState(20)
  const [gender, setGender] = useState('male')
  const [bmi, setBmi] = useState(20)
  const [children, setChildren] = useState(0)
  const [region, setRegion] = useState('southwest')
  const [smoker, setSmoker] = useState(false)
  const [data_list, setData_list] = useState([])
  const [data,setData] = useState({})
  const [prediction,setPrediction] = useState(0)

  const handleAgechange = (e,newValue) => {
    setAge(newValue)
  }
  const handleGenderchange = (e,newValue) => {
    setGender(newValue)
  }
  const handleChildrenchange = (e,newValue) => {
    setChildren(newValue)
  }
  const handleRegionchange = (e,newValue) => {
    setRegion(newValue)
  }
  const handleSmokerchange = (e,newValue) => {
    setSmoker(newValue)
  }
  const handleBmichange = (e,newValue) => {
    setBmi(newValue)
  }
  const handlePredict = async (e) => {
    e.preventDefault()
    setLoading(true)
    setData({
      age:age,
      gender:gender,
      bmi:bmi,
      children:children,
      smoker:(smoker)?'yes':'no',
      region:region
    })
    await putData()
    setLoading(false)
  }

  // async function getData() {
  //   await axios
  //     .get("http://localhost:8000/api/medical-insurance/")
  //     .then(res => {
  //       console.log(res.data)
  //       setData_list(res.data)
  //       console.log(data_list)
  //     })
  //     .catch(err => { console.log(err) })
  // }

  async function putData() {
    // .put(`http://localhost:8000/api/medical-insurance/${data.id}/`,data)
    // .post(`http://localhost:8000/api/medical-insurance/`,data)
    await axios
      .post("http://localhost:8000/api/medical-insurance/", data)
      .then(res => {
        console.log(res.data)
        setPrediction(res.data[1])
      })
      .catch(err => { console.log(err) })
  }

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
              onChange={handleAgechange}
              step={1}
              min={1}
              max={100}
            />
          </div>
          <div className='card-predict'>
            <FormLabel>Body mass index</FormLabel>
            <Typography>{bmi}</Typography>
            <Slider
              defaultValue={20}
              value={bmi}
              onChange={handleBmichange}
              step={0.01}
              min={5}
              max={100}
              valueLabelDisplay='auto'
            />
          </div>
          <div className='card-predict'>
            <FormLabel>No. of Children</FormLabel>
            <Typography>{children}</Typography>
            <Slider
              defaultValue={0}
              valueLabelDisplay="auto"
              value={children}
              onChange={handleChildrenchange}
              step={1}
              marks
              min={0}
              max={5}
            />
          </div>
          <div className='card-predict'>
            <FormLabel id='sex-radio'>Gender</FormLabel>
            <Typography>{gender}</Typography>
            <RadioGroup value={gender} onChange={handleGenderchange} row aria-labelledby='sex-radio'>
              <FormControlLabel value={'male'} control={<Radio />} label={'male'} />
              <FormControlLabel value={'female'} control={<Radio />} label={'female'} />
            </RadioGroup>
          </div>
          <div className='card-predict'>
            <FormLabel>Are you Smoker ?</FormLabel>
            <Typography>{(smoker)?'yes':'no'}</Typography>
            <Switch value={smoker} onChange={handleSmokerchange} />
          </div>
          <div className='card-predict'>
            <FormLabel>In which area do you leave?</FormLabel>
            <Typography>{region}</Typography>
            <RadioGroup value={region} onChange={handleRegionchange} aria-labelledby='region-radio'>
              <FormControlLabel value={'southwest'} control={<Radio />} label={'South-West'} />
              <FormControlLabel value={'southeast'} control={<Radio />} label={'South-East'} />
              <FormControlLabel value={'northwest'} control={<Radio />} label={'North-West'} />
              <FormControlLabel value={'northeast'} control={<Radio />} label={'North-East'} />
            </RadioGroup>
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
// age,sex,bmi,children,smoker,region