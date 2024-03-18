import acceptRequestService from '@/services/acceptRequest.service';
import requestService from '@/services/request.service';
import userService from '@/services/user.service';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';



const ElderRequestCard = ({
    acceptedrequest
} : any) => {

 console.log(acceptedrequest)
  const accessToken = localStorage.getItem("accessToken");
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();
  const [requestCategory, setRequestCategory] = useState();
  const [requestDescription, setRequestDescription] = useState();
  const navigate = useNavigate();

  console.log("Accpet Reqeust: ",acceptedrequest)
 

  useEffect(()=>{
    userData();
    // console.log("hello")
    requestData();
    // console.log("hello")
  },[])

  const handleAccept =() =>{
    const formdata = {
      elderPersonId:acceptedrequest.elderPersonId,
      volunteerId: acceptedrequest.volunteerId,
      requestId: acceptedrequest.requestId,
      actionType:"ACCEPTED"
    };
    console.log("inside handleAccept",formdata);

      acceptRequestService.getAccepted(accessToken, acceptedrequest.id, formdata);

      
  }


    console.log("accept request",acceptedrequest.volunteerId);
    
    const userData = () =>{
        userService.getById(accessToken,acceptedrequest.volunteerId).then((res) =>{
            console.log("res data inside getVolunteer:" ,res.data);
         
            setUserFirstName(res.data.firstName);
            setUserLastName(res.data.lastName);
            
            // console.log(userFirstName)
           
        })
      } 
      console.log(acceptedrequest.requestId)
      const requestData = () =>{
        // console.log("Hello")
        requestService.getById(accessToken, acceptedrequest.requestId).then((res) =>{
          // console.log(res)
            setRequestCategory(res.requestCategory)
            setRequestDescription(res.requestDescription)
            // console.log(setRequestCategory)
        })
      }
      



  return (
    <div className="bg-white p-8 rounded-md max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl shadow-lg  ">
    <h2 className="text-2xl text-lime-800 font-bold mb-4 font-bold tracking-wider ">Request Details</h2>
    <div className="mb-4 text-left">
    
      <p className="text-lime-800 "onClick={()=>navigate(`/userProfile/${acceptedrequest.volunteerId}`)}>
        <strong>VolunteerName:</strong> {userFirstName} {userLastName}
      </p>
      <p className="text-lime-800">
        <strong>Category:</strong> {requestCategory}
      </p>
      <p className="text-lime-800">
        <strong>Description:</strong> {requestDescription}
      </p>
     
      <div className="flex justify-center">
  <button
    className="md:flex justify-center w-30 mx-2 px-6 py-3 text-sm text-white capitalize transition-colors duration-300 transform bg-lime-800 rounded-2xl hover:bg-lime-400 hover:text-lime-800 font-bold focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
    onClick={handleAccept}
  >
    Accept
  </button>

  {/* <button
    className="md:flex justify-center w-30 mx-2 px-6 py-3 text-sm text-white capitalize transition-colors duration-300 transform bg-lime-800 rounded-2xl hover:bg-lime-400 hover:text-lime-800 font-bold focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
  >
    Reject
  </button> */}
</div>

    </div>
   
  </div>
  )
  }

export default ElderRequestCard
