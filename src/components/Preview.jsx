import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import React, { useEffect, useState } from 'react'
import { GrDocumentDownload } from "react-icons/gr";
import { FaHistory } from "react-icons/fa";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Edit from './Edit';
import {jsPDF} from 'jspdf'
import html2canvas from 'html2canvas'
import { AddResumeHistoryAPI } from '../services/allAPIs';

function Preview({formData,setFormData}) {

  //to get a id from current resume
  const [resumeId,setResumeId] = useState('')
  const[downloadStatus,setDownloadStatus]=useState(false)
  //accept data from child
  const [updateData,setUpdateData] = useState('')

  console.log(formData);
      const { personalData, education, experience, skills, summary } = formData

      const downloadPDF=async()=>{

          const input = document.getElementById("result")//to get id

          const canvas = await html2canvas(input,{scale:2})//convert selected html to canvas (screenshot)
          const imgData = canvas.toDataURL('image/png')//convert canvas into image URL
          //create pdf
          const pdf = new jsPDF('p','mm','a4')
          const pdfWidth = pdf.internal.pageSize.getWidth()
          const pdfHeight = (canvas.height*pdfWidth)/canvas.width

          pdf.addImage(imgData,'PNG',0,0,pdfWidth,pdfHeight)
          pdf.save('resume.pdf')

          try{
            const result = await AddResumeHistoryAPI(formData)
              console.log(result);
              setResumeId(result.data.id)
              setDownloadStatus(true)
  
          }
          catch(err){
            console.log(err); 
          }}
      console.log(resumeId); 

      //to hold child data , (child : edit)
      const handleUpdateData=(data)=>{
        //assign child data to parent state
        setUpdateData(data)
      }

  return (
    <div>
      <Stack direction={'row'} sx={{
        justifyContent: "flex-end",
        alignItems: "center",
      }}>
        {
          downloadStatus ? 
          <Stack direction={'row'}>
                               <Button onClick={downloadPDF}><GrDocumentDownload className='fs-3' /></Button>

             <Edit resumeId={resumeId} onUpdate={handleUpdateData} />
        <Link to={'/history'}>
        <Button><FaHistory className='fs-3' /></Button>
        </Link>
          </Stack>
          :
                   <Button onClick={downloadPDF}><GrDocumentDownload className='fs-3' /></Button>

        }
       
      </Stack>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 700,
            height: 700,
            mt: 5,
            p: 5,
            borderRadius: 2,
          },
        }}
      >

        <Paper elevation={7} id="result" >
         {
          updateData? <Typography variant="h4" align='center' component="h2">
          {updateData.personalData.name}
          </Typography>: <Typography variant="h4" align='center' component="h2">
          {formData.personalData.name}
          </Typography>
         }
            <Typography variant="subtitle1" align='center'color='#00b0ff' >
            {formData.personalData.jobTitle}
          </Typography>
          <Typography variant='body2' align='center' >
             {formData.personalData.phoneNumber} |  {formData.personalData.email} |  {formData.personalData.location}
          </Typography>
          <Typography variant='body2' align='center' mb={4}>
            <Link href= {formData.personalData.github} target="_blank">GitHub</Link> |
             <Link href= {formData.personalData.linkedIn} target="_blank">LinkedIn</Link> |
              <Link href= {formData.personalData.portfolio} target="_blank">Portfolio</Link>
          </Typography>
{/* summary */}
          <Divider>Summary</Divider>
          <Typography mb={3}>{formData.summary}</Typography>
{/* education */}
        <Divider>Education</Divider>
          <Typography variant='h6' align='center'>{formData.education.course}</Typography>
            <Typography variant='body2' align='center' mb={4}>
           {formData.education.college} | {formData.education.university} | {formData.education.year}
          </Typography> 
{/* professional exp */}
         <Divider>Professional Experience</Divider>
          <Typography variant='h6' align='center'>{formData.experience.jobRole}</Typography>
            <Typography variant='body2' align='center' mb={4}>
            {formData.experience.company} | {formData.experience.location} | {formData.experience.duration}
          </Typography> 
  {/* skills */}
        <Divider >Skills</Divider >
          <Stack direction={'row'} justifyContent={'space-evenly'}  sx={{ flexWrap: 'wrap' }}   spacing={{ xs: 1, sm: 2 }}
  >
            {
              skills.map((item,index)=>(
               <div>
                 <Button variant='contained'>{item}</Button>
               </div>
              ))
            }
             
          </Stack>
        </Paper>
      </Box>
    </div>
  )
}

export default Preview
