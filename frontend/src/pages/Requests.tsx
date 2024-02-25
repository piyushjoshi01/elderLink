
// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import Navbar from './Navbar';
// import Footer from "../components/ui/Footer";

// const Requests: React.FC = () => {
//   type FormData = {
//     category: string;
//     urgency: string;
//     description: string;
//     location: string;
//     date: string;
//     time: string;
//     duration: number;
//   };

//   const initialCategory: FormData = {
//     category: "",
//     urgency: "Urgent",
//     description: "Lorem ipsum dolor sit amet.",
//     location: "",
//     date: "",
//     time: "",
//     duration: 0
//   };

//   const [formData, setFormData] = useState<FormData | null>(null);
//   const [isEditing, setIsEditing] = useState<boolean>(false);

//   const openCard = () => {
//     const data: FormData = {
//       category: "Transportation",
//       urgency: "Urgent",
//       description: "Lorem ipsum dolor sit amet.",
//       location: "Sample Location",
//       date: "2024-02-21",
//       time: "14:30",
//       duration: 0
//     };

//     setFormData(data);
//     setIsEditing(false); // Enable editing when card opens
//   };

//   const closeCard = () => {
//     setFormData(null);
//     setIsEditing(false);
//   };

//   // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const { name, value } = e.target;
//   //   if (formData) {
//   //     setFormData(prevState => ({
//   //       ...prevState,
//   //       [name]: value
//   //     }));
//   //   }
//   // };

//   function handleSubmit() {
//     // Handle form submission here
//     setIsEditing(false); // Disable editing after submission
//   }

//   const toggleEditing = () => {
//     setIsEditing((prevIsEditing) => !prevIsEditing);
//     setIsEditing(true); // Set to true when "Edit" button is clicked
//   };

//   return (
//     <div>
//       <Navbar/>
//       <div className='p-20'>
        
//         {formData && (
//           <div className="bg-gray-100 p-5 rounded-md shadow-md max-w-xl">
//             <div className="flex flex-col text-sm gap-2">
//               <p><strong>Category:</strong> 
//                 {isEditing ? (
//                   <input 
//                     type="text" 
//                     name="category" 
//                     value={formData.category} 
//                     // onChange={handleChange} 
//                   />
//                 ) : (
//                   formData.category
//                 )}
//               </p>
//               <p><strong>Urgency:</strong> 
//                 {isEditing ? (
//                   <input 
//                     type="text" 
//                     name="urgency" 
//                     value={formData.urgency} 
//                     // onChange={handleChange} 
//                   />
//                 ) : (
//                   formData.urgency
//                 )}
//               </p>
//               <p><strong>Description:</strong> 
//                 {isEditing ? (
//                   <textarea 
//                     name="description" 
//                     value={formData.description} 
//                     // onChange={handleChange} 
//                   />
//                 ) : (
//                   formData.description
//                 )}
//               </p>
//               <p><strong>Location:</strong> 
//                 {isEditing ? (
//                   <input 
//                     type="text" 
//                     name="location" 
//                     value={formData.location} 
//                     // onChange={handleChange} 
//                   />
//                 ) : (
//                   formData.location
//                 )}
//               </p>
//               <p><strong>Date:</strong> 
//                 {isEditing ? (
//                   <input 
//                     type="text" 
//                     name="date" 
//                     value={formData.date} 
//                     // onChange={handleChange} 
//                   />
//                 ) : (
//                   formData.date
//                 )}
//               </p>
//               <p><strong>Time:</strong> 
//                 {isEditing ? (
//                   <input 
//                     type="text" 
//                     name="time" 
//                     value={formData.time} 
//                     // onChange={handleChange} 
//                   />
//                 ) : (
//                   formData.time
//                 )}
//               </p>
//               <p><strong>Duration:</strong> 
//                 {isEditing ? (
//                   <input 
//                     type="text" 
//                     name="duration" 
//                     value={formData.duration} 
//                     // onChange={handleChange} 
//                   />
//                 ) : (
//                   formData.duration
//                 )}
//               </p>
//               {/* {isEditing ? (
//                 <button onClick={handleSubmit} className="bg-lime-800 p-2 rounded-md text-white">
//                   Submit
//                 </button>
//               ) : (
//                 <button onClick={toggleEditing} className="bg-lime-800 p-2 rounded-md text-white">
//                   Edit
//                 </button>
//               )} */}
//               <button onClick={closeCard} className="bg-lime-800 p-2 rounded-md text-white">
//                 Close
//               </button>
//             </div>
//           </div>
//         )}

//         {!formData && (
//           <div className="bg-gray-100 p-5 rounded-md shadow-md max-w-xl flex flex-col gap-3">
//             <p className='text-sm'><strong>Category:</strong> {initialCategory.description}</p>
//             <p className='text-sm'><strong>Urgency:</strong> {initialCategory.urgency}</p>
//             <button onClick={openCard} className="bg-lime-800 p-2 rounded-md text-white">
//               Open
//             </button>
//           </div>
//         )}
//       </div> 
      
//       <Footer/>
//     </div>
//   );
// };

// export default Requests;
import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from "../components/ui/Footer";

const Requests: React.FC = () => {
  type FormData = {
    category: string;
    urgency: string;
    description: string;
    location: string;
    date: string;
    time: string;
    duration: number;
  };

  const initialCategory: FormData = {
    category: "transport",
    urgency: "Urgent",
    description: "Lorem ipsum dolor sit amet.",
    location: "surat",
    date: "2024-2-26",
    time: "10:30",
    duration: 0
  };

  const [formData, setFormData] = useState<FormData>(initialCategory);
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({
    category: false,
    urgency: false,
    description: false,
    location: false,
    date: false,
    time: false,
    duration: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    const { value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

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

  const handleCancel = (field: string) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: initialCategory[field as keyof FormData]
    }));
    setIsEditing(prevState => ({
      ...prevState,
      [field]: false
    }));
  };

  return (
    <div>
      <Navbar/>
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
                <thead>
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
                </thead>
                <tbody>
                  <tr>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                      {isEditing.category ? (
                        <input
                          type="text"
                          value={formData.category}
                          onChange={(e) => handleInputChange(e, 'category')}
                        />
                      ) : (
                        formData.category
                      )}
                    </td>
                 
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {isEditing.urgency ? (
                        <input
                          type="text"
                          value={formData.urgency}
                          onChange={(e) => handleInputChange(e, 'urgency')}
                        />
                      ) : (
                        formData.urgency
                      )}
                    </td>
                  
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {isEditing.description ? (
                        <textarea
                          value={formData.description}
                          onChange={(e) => handleInputChange(e, 'description')}
                        />
                      ) : (
                        formData.description
                      )}
                    </td>
                
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {isEditing.location ? (
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => handleInputChange(e, 'location')}
                        />
                      ) : (
                        formData.location
                      )}
                    </td>
                
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {isEditing.date ? (
                        <input
                          type="text"
                          value={formData.date}
                          onChange={(e) => handleInputChange(e, 'date')}
                        />
                      ) : (
                        formData.date
                      )}
                    </td>
                 
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {isEditing.time ? (
                        <input
                          type="text"
                          value={formData.time}
                          onChange={(e) => handleInputChange(e, 'time')}
                        />
                      ) : (
                        formData.time
                      )}
                    </td>
                
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {isEditing.duration ? (
                        <input
                          type="number"
                          value={formData.duration}
                          onChange={(e) => handleInputChange(e, 'duration')}
                        />
                      ) : (
                        formData.duration
                      )}
                    </td>
                  
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {Object.values(isEditing).some(editing => editing) ? (
                        <>
                          <button onClick={handleSave} className="bg-lime-800 p-2 rounded-md text-white mr-2">Save</button>
                          <button onClick={() => setIsEditing({ category: false, urgency: false, description: false, location: false, date: false, time: false, duration: false })} className="bg-red-500 p-2 rounded-md text-white">Cancel</button>
                        </>
                      ) : (
                        <button onClick={() => setIsEditing({ category: true, urgency: true, description: true, location: true, date: true, time: true, duration: true })} className="bg-lime-800 p-2 rounded-md text-white">Edit</button>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Requests;
