import React, { useState } from 'react'
import Steps from './Steps'
import Preview from './Preview'
function Form() {
//state creation
  const [formData,setFormData]=useState({
    personalData:{
      name:'',
      jobTitle:'',
      location:'',
      email:'',
      phoneNumber:'',
      github:'',
      linkedIn:'',
      portfolio:''
    },
    education:{
      course:'',
      college:'',
      university:'',
      year:''
    },
    experience:{
      jobRole:'',
      company:'',
      location:'',
      duration:''
    },
    skills:[],
    summary:''
  })

  const [isFinished,setIsFinished]=useState(false)

  return (
    <div>
        <div className="row p-5">
          {
              isFinished ? 
              <div className="row">
                  <div className="col-3"></div>
                  <div className="col-8">
            <Preview  formData={formData} setFormData={setFormData}/>
          </div>
          <div className="col-1"></div>

              </div>
              :
                <div className='row p-5'>
                  <div className="col-6">
            

            <Steps formData={formData} setFormData={setFormData} setIsFinished={setIsFinished}/>
          </div>
          <div className="col-6">
            <Preview  formData={formData} setFormData={setFormData}/>
          </div></div>
            }
          
        </div>
    </div>
  )
}

export default Form