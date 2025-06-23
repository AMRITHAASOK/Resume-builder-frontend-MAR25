
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { addResumeAPI } from '../services/allAPIs';
import Swal from 'sweetalert2'


const steps = ['Basic Information', 'Contact Details', 'Education details', 'Work Experience', 'Skills & Certifications', 'Review & Submit'];

function Steps({ formData, setFormData,setIsFinished }) {
    console.log(formData);

    const { personalData, education, experience, skills, summary } = formData

    //Adding User Skills
    const [inputSkill, setInputSkill] = useState("") //To hold skills from userside
    console.log(inputSkill);

    const suggestions = ['React', 'Angular', 'NodeJS', 'Express', 'MongoDB', 'Git', 'HTML', 'CSS', 'Bootstrap', 'Tailwind']

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0: return (
                <div>
                    <h3>Personal Details</h3>
                    <div className='d-flex row p-3'>
                        <TextField onChange={e => setFormData({ ...formData, personalData: { ...formData.personalData, name: e.target.value } })} value={formData.personalData.name} id="standard-basic" label="Full Name" variant="standard" />
                        <TextField onChange={e => setFormData({ ...formData, personalData: { ...formData.personalData, jobTitle: e.target.value } })} value={formData.personalData.jobTitle} id="standard-basic" label="Job Title" variant="standard" />
                        <TextField onChange={e => setFormData({ ...formData, personalData: { ...formData.personalData, location: e.target.value } })} value={formData.personalData.location} id="standard-basic" label="Location" variant="standard" />
                    </div>
                </div>
            )
            case 1: return (
                <div>
                    <h3>Contact Details</h3>
                    <div className='d-flex row p-3'>
                        <TextField id="standard-basic" onChange={e => setFormData({ ...formData, personalData: { ...formData.personalData, email: e.target.value } })} value={formData.personalData.email} label="Email" variant="standard" />
                        <TextField id="standard-basic" onChange={e => setFormData({ ...formData, personalData: { ...formData.personalData, phoneNumber: e.target.value } })} value={formData.personalData.phoneNumber} label="Phone Number" variant="standard" />
                        <TextField id="standard-basic" onChange={e => setFormData({ ...formData, personalData: { ...formData.personalData, github: e.target.value } })} value={formData.personalData.github} label="Github Profile Link" variant="standard" />
                        <TextField id="standard-basic" onChange={e => setFormData({ ...formData, personalData: { ...formData.personalData, linkedIn: e.target.value } })} value={formData.personalData.linkedIn} label="LinkedIn Profile Link" variant="standard" />
                        <TextField id="standard-basic" onChange={e => setFormData({ ...formData, personalData: { ...formData.personalData, portfolio: e.target.value } })} value={formData.personalData.portfolio} label="Portfolio Link" variant="standard" />
                    </div>
                </div>
            )
            case 2: return (
                <div>
                    <h3>Education Details</h3>
                    <div className='d-flex row p-3'>
                        <TextField id="standard-basic" onChange={e => setFormData({ ...formData, education: { ...formData.education, course: e.target.value } })}
                            value={formData.education.course} label="Course Name" variant="standard" />
                        <TextField id="standard-basic" onChange={e => setFormData({ ...formData, education: { ...formData.education, college: e.target.value } })}
                            value={formData.education.college} label="College Name" variant="standard" />
                        <TextField id="standard-basic" onChange={e => setFormData({ ...formData, education: { ...formData.education, university: e.target.value } })}
                            value={formData.education.university} label="University" variant="standard" />
                        <TextField id="standard-basic" onChange={e => setFormData({ ...formData, education: { ...formData.education, year: e.target.value } })} value={formData.education.year} label="Year of Passout" variant="standard" />
                    </div>
                </div>
            )
            case 3: return (
                <div>
                    <h3>Professional Details</h3>
                    <div className='d-flex row p-3'>
                        <TextField id="standard-basic" onChange={e => setFormData({ ...formData, experience: { ...formData.experience, jobRole: e.target.value } })}
                            value={formData.experience.jobRole} label="Job or Internship" variant="standard" />
                        <TextField id="standard-basic" onChange={e => setFormData({ ...formData, experience: { ...formData.experience, company: e.target.value } })}
                            value={formData.experience.company}
                            label="Company Name" variant="standard" />
                        <TextField id="standard-basic" onChange={e => setFormData({ ...formData, experience: { ...formData.experience, location: e.target.value } })}
                            value={formData.experience.location}
                            label="Location" variant="standard" />
                        <TextField id="standard-basic" onChange={e => setFormData({ ...formData, experience: { ...formData.experience, duration: e.target.value } })}
                            value={formData.experience.duration} label="Duration" variant="standard" />
                    </div>
                </div>
            )
            case 4: return (
                <div>
                    <h3>Skills</h3>
                    <Box sx={{ width: '100%' }}>
                        <Stack spacing={2} >
                            <TextField onChange={e => setInputSkill(e.target.value)} id="standard-basic" label="Add Skill" variant="standard" />

                            <Button onClick={() => addSkill(inputSkill)} className='me-3' variant="text" sx={{ maxWidth: '40px' }}>Add</Button>

                        </Stack>
                        <div>
                            <h5>Suggestions : </h5>
                            {suggestions.map((item, index) => (
                                <Button className='me-3 my-2' onClick={() => addSkill(item)} variant="outlined" size='small'>{item}</Button>
                            ))}
                        </div>

                        <div>
                            <h5>Added Skils : </h5>
                            {
                                skills.length > 0 ? skills.map((item, index) => (
                                    <span key={index} className='btn btn-primary me-3 my-2'>{item}  <Button onClick={() => handleRemoveSkill(item)} className='btn text-light'>X</Button> </span>
                                )) : ""
                            }
                        </div>
                    </Box>
                </div>
            )
            case 5: return (
                <div>
                    <h3>Professional Summary</h3>
                    <div className='d-flex row p-3'>
                        <TextField
                            onChange={e => setFormData({ ...formData, summary: e.target.value })}
                            id="standard-multiline-static"
                            label="Write a short summary of yourself"
                            multiline
                            rows={4}
                            defaultValue="Eg : I'm a passionate full-stack developer with hands-on experience in React,Node ..."
                            variant="standard"
                            value={formData.summary}
                        />
                    </div>
                </div>
            )
            default: return Null
        }
    }

    const addSkill = (skill) => {
        console.log(skill);// from user side value
        //check skill already present in the array 
        if (formData.skills.includes(skill)) {
            alert("Skill already existing..")
        }
        else {
            //add new skill to the array
            setFormData(data => ({ ...data, skills: [...data.skills, skill] }))
        }

    }

    const handleAddResume = async () => {
        try {
            const result = await addResumeAPI(formData)
            console.log(result);
            Swal.fire({
                title: 'Success!',
                text: 'Resume created successfull',
                icon: 'success',
                confirmButtonText: 'Back'
            })
            setIsFinished(true)
            

        }
        catch (err) {
            console.log("Error" + err);
            Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
    }

    const handleRemoveSkill = (index) => {

        setFormData({ ...formData, skills: skills.filter(item => item !== index) })
    }
    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        //   if (isStepOptional(index)) {
                        //     // labelProps.optional = (
                        //     //   <Typography variant="caption">Optional</Typography>
                        //     // );
                        //   }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                        <Box >
                            {renderStepContent(activeStep)}
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {isStepOptional(activeStep) && (
                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                    Skip
                                </Button>
                            )}
                            < >
                                {activeStep === steps.length - 1 ?
                                    (
                                        <Button onClick={handleAddResume} >Finish</Button>
                                    )
                                    :
                                    (
                                        <Button onClick={handleNext} >Next</Button>
                                    )
                                }
                            </>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </div>
    )
}

export default Steps
