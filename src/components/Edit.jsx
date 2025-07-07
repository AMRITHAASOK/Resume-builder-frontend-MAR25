import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { RiFileEditLine } from "react-icons/ri";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { getAResumeHistoryAPI, updateResumeHistoryAPI } from '../services/allAPIs';
import Swal from 'sweetalert2';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxHeight: '80vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Edit({ resumeId, onUpdate }) {
  const [resumeDetails, setResumeDetails] = useState({
    id: '',
    personalData: {
      name: '',
      jobTitle: '',
      location: '',
      email: '',
      phoneNumber: '',
      github: '',
      linkedIn: '',
      portfolio: ''
    },
    education: {
      course: '',
      college: '',
      university: '',
      year: ''
    },
    experience: {
      jobRole: '',
      company: '',
      location: '',
      duration: ''
    },
    skills: [],
    summary: ''
  });

  const [newSkill, setNewSkill] = useState('');

  const getAResume = async () => {
    const result = await getAResumeHistoryAPI(resumeId);
    setResumeDetails(result.data);
  };

  const updateResume = async () => {
    try {
      const result = await updateResumeHistoryAPI(resumeId, resumeDetails);
      if (result.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: 'Resume Updated successfully',
          icon: 'success',
          confirmButtonText: 'Back'
        });
        onUpdate(result.data);
        handleClose();
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Error updating resume',
          icon: 'error',
          confirmButtonText: 'Back'
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while updating the resume',
        icon: 'error',
        confirmButtonText: 'Back'
      });
    }
  };

  useEffect(() => {
    getAResume();
  }, [resumeId]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddSkill = () => {
    if (newSkill) {
      setResumeDetails(prevDetails => ({
        ...prevDetails,
        skills: [...prevDetails.skills, newSkill]
      }));
      setNewSkill('');
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}><RiFileEditLine className='fs-3' /></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {/* Personal Details */}
            <h3>Personal Details</h3>
            <div className='d-flex row p-3'>
              <TextField
                onChange={e => setResumeDetails({ ...resumeDetails, personalData: { ...resumeDetails.personalData, name: e.target.value } })}
                value={resumeDetails?.personalData?.name}
                label="Full Name"
                variant="standard"
              />
              <TextField
                onChange={e => setResumeDetails({ ...resumeDetails, personalData: { ...resumeDetails.personalData, jobTitle: e.target.value } })}
                value={resumeDetails?.personalData?.jobTitle}
                label="Job Title"
                variant="standard"
              />
              <TextField
                onChange={e => setResumeDetails({ ...resumeDetails, personalData: { ...resumeDetails.personalData, location: e.target.value } })}
                value={resumeDetails?.personalData?.location}
                label="Location"
                variant="standard"
              />
            </div>

            {/* Contact Details */}
            <h3>Contact Details</h3>
            <div className='d-flex row p-3'>
              <TextField
                onChange={e => setResumeDetails({ ...resumeDetails, personalData: { ...resumeDetails.personalData, email: e.target.value } })}
                value={resumeDetails?.personalData?.email}
                label="Email"
                variant="standard"
              />
              <TextField
                onChange={e => setResumeDetails({ ...resumeDetails, personalData: { ...resumeDetails.personalData, phoneNumber: e.target.value } })}
                value={resumeDetails?.personalData?.phoneNumber}
                label="Phone Number"
                variant="standard"
              />
              <TextField
                onChange={e => setResumeDetails({ ...resumeDetails, personalData: { ...resumeDetails.personalData, github: e.target.value } })}
                value={resumeDetails?.personalData?.github}
                label="Github Profile Link"
                variant="standard"
              />
              <TextField
                onChange={e => setResumeDetails({ ...resumeDetails, personalData: { ...resumeDetails.personalData, linkedIn: e.target.value } })}
                value={resumeDetails?.personalData?.linkedIn}
                label="LinkedIn Profile Link"
                variant="standard"
              />
              <TextField
                onChange={e => setResumeDetails({ ...resumeDetails, personalData: { ...resumeDetails.personalData, portfolio: e.target.value } })}
                value={resumeDetails?.personalData?.portfolio}
                label="Portfolio Link"
                variant="standard"
              />
            </div>

            {/* Education Details */}
            <h3>Education Details</h3>
            <div className='d-flex row p-3'>
              <TextField
                onChange={e => setResumeDetails({ ...resumeDetails, education: { ...resumeDetails.education, course: e.target.value } })}
                value={resumeDetails?.education?.course}
                label="Course Name"
                variant="standard"
              />
              <TextField
                onChange={e => setResumeDetails({ ...resumeDetails, education: { ...resumeDetails.education, college: e.target.value } })}
                value={resumeDetails?.education?.college}
                label="College Name"
                variant="standard"
              />
              <TextField
                onChange={e => setResumeDetails({ ...resumeDetails, education: { ...resumeDetails.education, university: e.target.value } })}
                value={resumeDetails?.education?.university}
                label="University"
                variant="standard"
              />
              <TextField
                onChange={e => setResumeDetails({ ...resumeDetails, education: { ...resumeDetails.education, year: e.target.value } })}
                value={resumeDetails?.education?.year}
                label="Year of Passout"
                variant="standard"
              />
            </div>

            {/* Professional Details */}
            <h3>Professional Details</h3>
            <div className='d-flex row p-3'>
              <TextField
                onChange={e => setResumeDetails({ ...resumeDetails, experience: { ...resumeDetails.experience, jobRole: e.target.value } })}
                value={resumeDetails?.experience?.jobRole}
                label="Job or Internship"
                variant="standard"
              />
              <TextField
                onChange={e => setResumeDetails({ ...resumeDetails, experience: { ...resumeDetails.experience, company: e.target.value } })}
                value={resumeDetails?.experience?.company}
                label="Company Name"
                variant="standard"
              />
              <TextField
                onChange={e => setResumeDetails({ ...resumeDetails, experience: { ...resumeDetails.experience, location: e.target.value } })}
                value={resumeDetails?.experience?.location}
                label="Location"
                variant="standard"
              />
              <TextField
                onChange={e => setResumeDetails({ ...resumeDetails, experience: { ...resumeDetails.experience, duration: e.target.value } })}
                value={resumeDetails?.experience?.duration}
                label="Duration"
                variant="standard"
              />
            </div>

            {/* Skills */}
            <h3>Skills</h3>
            <Box sx={{ width: '100%' }}>
              <Stack spacing={2}>
                <TextField
                  id="add-skill"
                  label="Add Skill"
                  variant="standard"
                  value={newSkill}
                  onChange={e => setNewSkill(e.target.value)}
                />
                <Button variant="text" onClick={handleAddSkill}>Add</Button>
              </Stack>
              <div>
                <h5>Selected Skills:</h5>
                {resumeDetails?.skills?.length > 0 ? resumeDetails.skills.map((item, index) => (
                  <Button key={index} variant="outlined" size='small'>{item}</Button>
                )) : ""}
              </div>
            </Box>

            {/* Professional Summary */}
            <h3 className='mt-3'>Professional Summary</h3>
            <div className='d-flex row p-3'>
              <TextField
                id="standard-multiline-static"
                label="Write a short summary of yourself"
                multiline
                rows={4}
                onChange={e => setResumeDetails({ ...resumeDetails, summary: e.target.value })}
                value={resumeDetails.summary}
                variant="standard"
              />
            </div>
          </Typography>

          <Button onClick={updateResume}>Update</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Edit;
