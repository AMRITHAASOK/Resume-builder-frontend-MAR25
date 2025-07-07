import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import React, { useEffect, useState } from 'react';
import { GrDocumentDownload } from "react-icons/gr";
import { FaHistory } from "react-icons/fa";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Edit from './Edit';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { AddResumeHistoryAPI } from '../services/allAPIs';
import { Link } from 'react-router-dom';

function Preview({ formData, setFormData }) {
  const [resumeId, setResumeId] = useState('');
  const [downloadStatus, setDownloadStatus] = useState(false);
  const [updateData, setUpdateData] = useState('');

  const { personalData, education, experience, skills, summary } = formData;

  const downloadPDF = async () => {
    const input = document.getElementById("result");
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    // Get current date and time
    const now = new Date();
    const formattedDateTime = `${now.toLocaleDateString()}, ${now.toLocaleTimeString()}`;

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('resume.pdf');

    try {
      const result = await AddResumeHistoryAPI({
        personalData,
        education,
        experience,
        skills,
        summary,
        image: imgData,
        downloadedAt: formattedDateTime
      });

      setResumeId(result.data.id);
      setDownloadStatus(true);
    } catch (err) {
      console.error(err);
    }
  };

  // Update formData when updateData changes
  useEffect(() => {
    if (updateData) {
      setFormData(updateData);
    }
  }, [updateData, setFormData]);

  const handleUpdateData = (data) => {
    setUpdateData(data);
  };

  return (
    <div>
      <Stack direction={'row'} sx={{ justifyContent: "flex-end", alignItems: "center" }}>
        {downloadStatus ? (
          <Stack direction={'row'}>
            <Button onClick={downloadPDF}><GrDocumentDownload className='fs-3' /></Button>
            <Edit resumeId={resumeId} onUpdate={handleUpdateData} />
            <Link to={'/history'}>
              <Button><FaHistory className='fs-3' /></Button>
            </Link>
            <Link to={'/'}>
              <Button>Back</Button>
            </Link>
          </Stack>
        ) : (
          <Button onClick={downloadPDF}><GrDocumentDownload className='fs-3' /></Button>
        )}
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
        <Paper elevation={7} id="result">
          <Typography variant="h4" align='center' component="h2">
            {updateData ? updateData.personalData.name : personalData.name}
          </Typography>
          <Typography variant="subtitle1" align='center' color='#00b0ff'>
            {personalData.jobTitle}
          </Typography>
          <Typography variant='body2' align='center'>
            {personalData.phoneNumber} | {personalData.email} | {personalData.location}
          </Typography>
          <Typography variant='body2' align='center' mb={4}>
            <Link href={personalData.github} target="_blank">GitHub</Link> |
            <Link href={personalData.linkedIn} target="_blank">LinkedIn</Link> |
            <Link href={personalData.portfolio} target="_blank">Portfolio</Link>
          </Typography>
          <Divider>Summary</Divider>
          <Typography mb={3}>{summary}</Typography>
          <Divider>Education</Divider>
          <Typography variant='h6' align='center'>{education.course}</Typography>
          <Typography variant='body2' align='center' mb={4}>
            {education.college} | {education.university} | {education.year}
          </Typography>
          <Divider>Professional Experience</Divider>
          <Typography variant='h6' align='center'>{experience.jobRole}</Typography>
          <Typography variant='body2' align='center' mb={4}>
            {experience.company} | {experience.location} | {experience.duration}
          </Typography>
          <Divider>Skills</Divider>
          <Stack direction={'row'} justifyContent={'space-evenly'} sx={{ flexWrap: 'wrap' }} spacing={{ xs: 1, sm: 2 }}>
            {skills.map((item, index) => (
              <div key={index}>
                <Button variant='contained'>{item}</Button>
              </div>
            ))}
          </Stack>
        </Paper>
      </Box>
    </div>
  );
}

export default Preview;
