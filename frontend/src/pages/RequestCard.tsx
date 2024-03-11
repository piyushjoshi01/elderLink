import acceptRequestService from '@/services/acceptRequest.service';
import userService from '@/services/user.service';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';



const RequestCard = ({
    request
} : any) => {

 console.log(request)
  const accessToken = localStorage.getItem("accessToken");
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();
  const navigate = useNavigate();
  const volunteerId = localStorage.getItem("id");

  useEffect(()=>{
    userData();
  },[])

    const userData = () =>{
        userService.getById(accessToken,request.userId).then((res) =>{
         
            setUserFirstName(res.data.firstName);
            setUserLastName(res.data.lastName);
            console.log(userFirstName)
           
        })
      }
      const handleAccept = () =>{
        const requestData = {
          requestId: request.id,
          elderPersonId: request.userId,
          volunteerId: volunteerId,
          actionType: "PENDING"
        }
        console.log(requestData.requestId);
        acceptRequestService.createRequestHistory(accessToken, requestData).then((res) => {
          // console.log(res.data);

        })


      }


  return (
    <div className="bg-white p-8 rounded-md max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl shadow-lg  ">
    <h2 className="text-2xl text-lime-800 font-bold mb-4 font-bold tracking-wider ">Request Details</h2>
    <div className="mb-4 text-left">
    <p className="text-lime-800" onClick={()=>navigate(`/userProfile/${request.userId}`)}>
        <strong>Seeker Name</strong> {userFirstName} {userLastName}
      </p>
      
      <p className="text-lime-800 ">
        <strong>Category:</strong> {request.requestCategory}
      </p>
      <p className="text-lime-800">
        <strong>Urgency:</strong> {request.requestUrgencyLevel}
      </p>
      <p className="text-lime-800">
        <strong>Description:</strong> {request.requestDescription}
      </p>
      <p className="text-lime-800">
        <strong>Location:</strong> {request.location}
      </p>
      <p className="text-lime-800">
        <strong>Date:</strong> {request.date}
      </p>
      <p className="text-lime-800">
        <strong>Time:</strong> {request.time}
      </p>
      <div className="flex justify-center">
  <button
    className="md:flex justify-center w-30 mx-2 px-6 py-3 text-sm text-white capitalize transition-colors duration-300 transform bg-lime-800 rounded-2xl hover:bg-lime-400 hover:text-lime-800 font-bold focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
   onClick={handleAccept}>
    Accept
  </button>
</div>
    </div>
   
  </div>
  )
}

export default RequestCard
