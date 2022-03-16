import React, {  useState, useEffect } from 'react';
import { useAuth } from '../Authcontext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, CardActions } from '@mui/material'
import lifeimg from '../img/life_insurance.jpg'
import healthimg from '../img/health_insurance.jpg'


export default function Predict() {
  // const { currentUser } = useAuth()
  const lifedbRef = collection(db, 'life-predictions')
  const medicaldbRef = collection(db, 'medical-predictions')
  // const [message, setMessage] = useState('')
  // const [error, setError] = useState('')
  const [lifepredictions, setLifepredictions] = useState([])
  const [medicalpredictions, setMedicalpredictions] = useState([])
  const navigate = useNavigate()


  async function refreshpredictions() {
    const getLifePredictions = async () => {
      const data = await getDocs(lifedbRef)
      setLifepredictions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    const getMedicalPredictions = async () => {
      const data = await getDocs(medicaldbRef)
      setMedicalpredictions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getLifePredictions()
    getMedicalPredictions()
  }

  useEffect(() => {
    const getLifePredictions = async () => {
      const data = await getDocs(lifedbRef)
      setLifepredictions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    const getMedicalPredictions = async () => {
      const data = await getDocs(medicaldbRef)
      setMedicalpredictions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getLifePredictions()
    getMedicalPredictions()
  }, [])

  function linktolprediction() {
    navigate('life-insurance-predict')
  }
  function linktomprediction() {
    navigate('health-insurance-predict')
  }

  return (
    <>
      <div className='dflexr'>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image={lifeimg}
            alt="Life insurance"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Life insurance
            </Typography>
            <Typography variant="body2" color="text.secondary">
            An insurance premium is the amount of money an individual or business must pay for an insurance policy. Insurance premiums are paid for policies that cover healthcare, auto, home, and life insurance.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant='contained' onClick={linktolprediction}>Predict</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>

        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image={healthimg}
            alt="Health insurance"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Health insurance
            </Typography>
            <Typography variant="body2" color="text.secondary">
            The amount you pay for your health insurance every month. In addition to your premium, you usually have to pay other costs for your health care, including a deductible, copayments, and coinsurance.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant='contained' onClick={linktomprediction}>Predict</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>
      <Button onClick={refreshpredictions}>Refresh</Button>
      <div className='dflexr'>
        {lifepredictions.map((p) => {
          return (
            <div className='mycard'>
              <h4>Life insurance premium prediction</h4>
              <p>age :{p.age}</p>
              <p>diabetes :{p.diabetes?'yes':'no'}</p>
              <p>bloodpressure :{p.bloodpressure?'yes':'no'}</p>
              <p>transplant :{p.transplant?'yes':'no'}</p>
              <p>chronicdisease :{p.chronicdisease?'yes':'no'}</p>
              <p>height :{p.height}</p>
              <p>weight :{p.weight}</p>
              <p>allergies :{p.allergies?'yes':'no'}</p>
              <p>cancer :{p.cancer?'yes':'no'}</p>
              <p>surgeries :{p.surgeries?'yes':'no'}</p>
              <p>prediction :{p.prediction}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}
        // age : age,
        // diabetes : diabetes,
        // bloodpressure :bloodpressure,
        // transplant : transplant,
        // chronicdisease :chronicdisease,
        // height : height,
        // weight : weight,
        // allergies : allergies,
        // cancer : cancer,
        // surgeries : surgeries,
        // prediction : prediction
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