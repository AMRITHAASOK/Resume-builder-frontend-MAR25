import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { deleteResumeHistoryAPI, getResumeHistoryAPI } from '../services/allAPIs';
import { MdDelete } from "react-icons/md";
function History() {

  const [history,setHistory]=useState([])

  const getHistory=async()=>{
    const result = await getResumeHistoryAPI()
    console.log(result);
    setHistory(result.data)
  }
  console.log(history);

  const deleteHistory=async(id)=>{
      try{
        const result = await deleteResumeHistoryAPI(id)
      console.log(result);
      getHistory()
      }
      catch(err){
        console.log(err);
        
      }
      
  }
  

  useEffect(()=>{
    getHistory()
  },[])

  return (
    <div>

      <Typography variant='h4' align='center' my={3}>Resume Downloaded History</Typography>
     <Stack direction={'row'} >
      {
        history.length>0? 
        history.map((item,index)=>(
           <Paper key={index} elevation={7} sx={{width:400,p:5,m:3}}>
        <Button sx={{float:'right'}}><MdDelete onClick={()=>deleteHistory(item.id)} className='text-danger fs-2' /></Button>
          <Typography variant='h6' align='center'>{item.personalData.name}</Typography>
           <Typography variant="subtitle1" align='center'color='#00b0ff' >
           {item.experience.jobRole}
          </Typography>
           <Divider></Divider>
          <Typography variant='h6' align='center'>{item.education.course}</Typography>
            <Typography variant='body2' align='center' mb={4}>
          {item.education.college} | {item.education.university} | {item.education.year}
          </Typography> 
      </Paper>
        ))
        :"No history"
      }
     </Stack>
    </div>
  )
}

export default History
