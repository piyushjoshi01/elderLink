
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from "../components/ui/Footer";
import requestService from "@/services/request.service";
import RequestModel from '@/models/RequestModel';
import axios from 'axios';

const Requests: React.FC = () => {

  const [request, setRequest] = useState<RequestModel>(new RequestModel());
  const [requestArr, setRequestArr] = useState([]);
  const [editflag, setEditFlag] = useState({ id: null, flag: false });
  const [newValue, setNewValue] = useState<any>({});


  const accessToken = localStorage.getItem("accessToken");
  const id = localStorage.getItem("id");

  useEffect(() => {
    if (!accessToken) {
      console.log("No access token available");
      return;
    }
    requestService
      .getRequestById(accessToken, Number(id))
      .then((res) => {

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

  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({
    category: false,
    urgency: false,
    description: false,
    location: false,
    date: false,
    time: false,
    duration: false
  });
  console.log("reqarr", requestArr);



  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setNewValue((prevData: any) => ({
      ...prevData,
      [name]: value
    }));
  };

  console.log("setNewValue", setNewValue);

  const deleterequest = async(id: any) => {
    console.log("acctoken ew",accessToken,id);
    if(accessToken){
    const deletedobj=  await requestService.getDeleteById(accessToken,id)
    console.log("deletedobj",deletedobj);
    
    }
    // alert("Delete request");
  };
  console.log("editflag", editflag);


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
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Time</th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Duration</th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Action</th>
                </tr>
                {/* </thead> */}
                <tbody>
                  {requestArr.map((elem: any) => <tr>
                    {editflag.flag && elem.id == editflag.id ?
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">


                        <input onChange={handleChangeInput} name="requestCategory" type="text"
                          value={elem.requestCategory}
                        />
                      </th>
                      :
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        {elem.requestCategory}</th>}

                    {editflag.flag && elem.id == editflag.id ?
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        <input onChange={handleChangeInput}
                          value={elem.requestUrgencyLevel}
                          name="requestUrgencyLevel" type="text" />
                      </th>
                      :
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        {elem.requestUrgencyLevel}</th>}
                    {editflag.flag && elem.id == editflag.id ?
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        <input onChange={handleChangeInput}
                          value={elem.requestDescription}
                          name="requestDescription" type="text" />
                      </th>
                      :
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        {elem.requestDescription}</th>}

                    {editflag.flag && elem.id == editflag.id ?
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        <input onChange={handleChangeInput}
                          value={elem.location}
                          name="location" type="text" />
                      </th>
                      :
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        {elem.location}</th>}

                    {editflag.flag && elem.id == editflag.id ?
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        <input onChange={handleChangeInput}
                          value={elem.date}
                          name="date" type="text" />
                      </th>
                      :
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        {elem.date}</th>}

                    {editflag.flag && elem.id == editflag.id ?
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        <input onChange={handleChangeInput}
                          value={elem.time}
                          name="time" type="text" />
                      </th>
                      :
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        {elem.time}</th>}

                    {editflag.flag && elem.id == editflag.id ?
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        <input onChange={handleChangeInput}
                          value={elem.durationInMinutes}

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
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      <button className='bg-lime-800  text-white bg-lime-800 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150' onClick={() => setEditFlag({ flag: !editflag.flag, id: elem.id })}>Edit</button>
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      <button className='bg-lime-800  text-white bg-lime-800 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150' onClick={() => deleterequest(elem.id)}>Delete</button>
                    </th>

                  </tr>)
                  }


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
// function getById(accessToken: string, requestId: number) {
//   throw new Error('Function not implemented.');
// }


