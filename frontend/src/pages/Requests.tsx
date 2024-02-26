
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from "../components/ui/Footer";
import requestService from "@/services/request.service";
import RequestModel from '@/models/RequestModel';

const Requests: React.FC = () => {

  const [request, setRequest] = useState<RequestModel>(new RequestModel());
  const [requestArr, setRequestArr] = useState([]);
  const[editflag,setEditFlag]=useState({id:null,flag:false});
  const [newValue,setNewValue]=useState<any>({});

  //   type FormData = {
  //     category: string;
  //     urgency: string;
  //     description: string;
  //     location: string;
  //     date: string;
  //     time: string;
  //     duration: number;
  //   };

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken) {
      console.log("No access token available");
      return;
    }
    requestService
      .getRequestById(accessToken, 43)
      .then((res) => {

        console.log(res.data);
        setRequestArr(res.data)
        const requestSave = new RequestModel();
        requestSave.category = res.data.category;
        requestSave.urgency = res.data.urgency;
        requestSave.description = res.data.description;
        requestSave.location = res.data.location;
        requestSave.date = res.data.date;
        requestSave.time = res.data.time;
        requestSave.duration = res.data.duration;

        setRequest(requestSave);
      }

      )
      .catch((error) => {
        console.error("Failed to fetch user details", error);
      });
  }, [localStorage.getItem("accessToken")]);

  // const initialCategory: FormData = {
  //   category: "transport",
  //   urgency: "Urgent",
  //   description: "Want to transport Furniture.",
  //   location: "nova scotia halifax",
  //   date: "2024-2-27",
  //   time: "10:30",
  //   duration: 190
  // };

  // const [formData, setFormData] = useState<FormData>(initialCategory);
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({
    category: false,
    urgency: false,
    description: false,
    location: false,
    date: false,
    time: false,
    duration: false
  });
console.log("reqarr",requestArr);



  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value,name } = e.target;
    setNewValue((prevData:any) => ({
      ...prevData,
      [name]: value
    }));
  };
console.log("setNewValue",setNewValue);


  const toggleEditing = (field: string) => {
    setIsEditing(prevState => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  const handleSave = () => {
    // Logic to handle saving the form data
    // You can perform validation and API calls here
    setIsEditing({
      category: false,
      urgency: false,
      description: false,
      location: false,
      date: false,
      time: false,
      duration: false
    });
  };

  // const handleCancel = (field: string) => {
  //   setFormData(prevData => ({
  //     ...prevData,
  //     [field]: initialCategory[field as keyof FormData]
  //   }));
  //   setIsEditing(prevState => ({
  //     ...prevState,
  //     [field]: false
  //   }));
  // };

  console.log("editflag",editflag);
  

  return (
    <div>
      <Navbar />
      <section className="py-1 bg-blueGray-50">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">Requests</h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button className="bg-lime-800 text-white bg-lime-800 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse">
                {/* <thead> */}
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Category</th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Urgency</th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Description</th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Location</th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Date</th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Time</th>{request.time}
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Duration</th>{request.duration}
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Action</th>
                  </tr>
                {/* </thead> */}
                <tbody>
                    {requestArr.map((elem:any)=><tr>
                      {editflag.flag && elem.id==editflag.id ? 
                       <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">


                     <input onChange={handleChangeInput} name="requestCategory" type="text" 
                    //  value={newValue.requestCategory} 
                     />
                       </th>
                     :
                     <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                     {elem.requestCategory}</th>}
                     
                      {editflag.flag && elem.id==editflag.id ? 
                     <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                       <input onChange={handleChangeInput} 
                      //  value={newValue.requestUrgencyLevel} 
                       name="requestUrgencyLevel" type="text" />
                     </th> 
                     :
                     <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                     {elem.requestUrgencyLevel}</th>}
                      {editflag.flag && elem.id==editflag.id ? 
                     <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                       <input onChange={handleChangeInput} 
                      //  value={newValue.requestDescription} 
                       name="requestDescription" type="text"  />
                     </th> 
                     :
                     <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                     {elem.requestDescription}</th>}
                     
                      {editflag.flag && elem.id==editflag.id ? 
                     <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                       <input onChange={handleChangeInput} 
                      //  value={newValue.location} 
                       name="location" type="text"  />
                     </th> 
                     :
                     <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                     {elem.location}</th>}
                     
                      {editflag.flag && elem.id==editflag.id ? 
                     <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                       <input onChange={handleChangeInput} 
                      //  value={newValue.date} 
                       name="date" type="text"  />
                     </th> 
                     :
                     <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                     {elem.date}</th>}
                     
                      {editflag.flag && elem.id==editflag.id ? 
                     <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                       <input onChange={handleChangeInput} 
                      //  value={newValue.time} 
                       name="time" type="text" />
                     </th> 
                     :
                     <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                     {elem.time}</th>}
                     
                      {editflag.flag && elem.id==editflag.id ? 
                     <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                       <input onChange={handleChangeInput} 
                      //  value={newValue.durationInMinutes} 
                       name="durationInMinutes" type="text" />
                     </th> 
                     :
                     <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                     {elem.durationInMinutes}</th>}
                     
                     
                     
                     {/* <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">{elem.requestUrgencyLevel}</th>
                     <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">{elem.requestDescription}</th>
                     <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">{elem.location}</th>
                     <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">{elem.date}</th>
                     <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">{elem.time}</th>
                     <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">{elem.
durationInMinutes}</th> */}
                     <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"><button className='bg-lime-800' onClick={()=>setEditFlag({flag:!editflag.flag,id:elem.id})}>Edit</button></th>
                   </tr>)
                    }
                  
                    {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">{request.category}
                      {isEditing.category ? (
                        <input
                          type="text"
                          value={request.category}
                        // onChange={(e) => handleInputChange(e, 'category')}
                        />
                      ) : (
                        request.category
                      )}
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{request.urgency}
                      {isEditing.urgency ? (
                        <input
                          type="text"
                          value={request.urgency}
                        // onChange={(e) => handleInputChange(e, 'urgency')}
                        />
                      ) : (
                        request.urgency
                      )}
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{request.description}
                      {isEditing.description ? (
                        <textarea
                          value={request.description}
                        // onChange={(e) => handleInputChange(e, 'description')}
                        />
                      ) : (
                        request.description
                      )}
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{request.location}
                      {isEditing.location ? (
                        <input
                          type="text"
                          value={request.location}
                        // onChange={(e) => handleInputChange(e, 'location')}
                        />
                      ) : (
                        request.location
                      )}
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {isEditing.date ? (
                        <input
                          type="text"
                          value={request.date}
                        // onChange={(e) => handleInputChange(e, 'date')}
                        />
                      ) : (
                        request.date
                      )}
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {isEditing.time ? (
                        <input
                          type="text"
                          value={request.time}
                        // onChange={(e) => handleInputChange(e, 'time')}
                        />
                      ) : (
                        request.time
                      )}
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {isEditing.duration ? (
                        <input
                          type="number"
                          value={request.duration}
                        // onChange={(e) => handleInputChange(e, 'duration')}
                        />
                      ) : (
                        request.duration
                      )}
                      {request.duration}
                    </td> */}

                    {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {Object.values(isEditing).some(editing => editing) ? (
                        <>
                          <button onClick={handleSave} className="bg-lime-800 p-2 rounded-md text-white mr-2">Save</button>
                          <button onClick={() => setIsEditing({ category: false, urgency: false, description: false, location: false, date: false, time: false, duration: false })} className="bg-red-500 p-2 rounded-md text-white">Cancel</button>
                        </>
                      ) : (
                        <button onClick={() => setIsEditing({ category: true, urgency: true, description: true, location: true, date: true, time: true, duration: true })} className="bg-lime-800 p-2 rounded-md text-white">Edit</button>
                      )}
                    </td> */}
                  {/* </tr> */}
                </tbody>
              </table>
            </div>


          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default Requests;
function getById(accessToken: string, requestId: number) {
  throw new Error('Function not implemented.');
}


