import { commonAPI } from "./commonAPI";
import { serverURL } from "./serverURL";

//1 Add resume details to the server - POST - reqBody
export const addResumeAPI=async(reqBody)=>{
    return await commonAPI('post',`${serverURL}/resumes`,reqBody)
}

//2 history added to the server - post - reqbody
export const AddResumeHistoryAPI=async(reqBody)=>{
    return await commonAPI('post',`${serverURL}/history`,reqBody)
}

//3 get all history from the server - get - ""
export const getResumeHistoryAPI=async()=>{
    return await commonAPI('get',`${serverURL}/history`,"")
}

//4 delete resume history from the server - delete 
export const deleteResumeHistoryAPI=async(id)=>{
    return await commonAPI('delete',`${serverURL}/history/${id}`,"")
}

//5 get a particular resume from history 
export const getAResumeHistoryAPI=async(id)=>{
    return await commonAPI('get',`${serverURL}/history/${id}`,"")
}

//6 update a resume history 
export const updateResumeHistoryAPI=async(id,reqBody)=>{
    return await commonAPI('put',`${serverURL}/history/${id}`,reqBody)
}