import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "../components/ui/Footer";
import { FetchRequestModel } from "@/models/RequestModel";
import requestService from "@/services/request.service";
import userService from "@/services/user.service";
import RequestCard from "./RequestCard";
import ElderRequestCard from "./ElderRequestCard";
import acceptRequestService from "@/services/acceptRequest.service";

const ElderRequest: React.FC = () => {

  

  const [requestData, setRequestData] = useState<any[]>([]);
  const [currentRequestIndex, setCurrentRequestIndex] = useState(0);
  const [requestDetailsVisible, setRequestDetailsVisible] = useState(false);
  const [userId, setUserId] = useState();
 


  const accessToken = localStorage.getItem("accessToken");
  const currentUserId =localStorage.getItem("id"); 

  useEffect(() => {
    // Simulate fetching data from backend
    console.log("Before")
    fetchData();
    console.log("After")
  }, []);
 



  const fetchData = () => {
    acceptRequestService.getAcceptedRequest(accessToken).then((res) => {
      setRequestData(res)
     console.log(res);
    })
    
    }

  
  const showCard = (index: number) => {
    setCurrentRequestIndex(index);
    setRequestDetailsVisible(true);
  };

  const closeCard = () => {
    setRequestDetailsVisible(false);
  };

  // const handleChangeInput = 

  return (
    <div>
      <Navbar />
      <div className="px-10 py-3 overflow-scroll h-96">
        <div>
          <h1 className="text-center text-3xl mb-5 text-lime-800 font-bold"> ACCEPTED REQUEST LIST</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 ">
            
            {requestData.map((acceptedrequest, index ) => (
              // <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50" >
              <ElderRequestCard acceptedrequest={acceptedrequest} key={index} />
            // </div>
            ))}
            
          </div>    
        </div>
        {/* {requestDetailsVisible && (
          // <RequestDetails formData={requestData[currentRequestIndex] || initialCategory} onClose={closeCard} />
        )} */}
      </div>
      <Footer />
    </div>
  );
};

export default ElderRequest;
