
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
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
    category: "",
    urgency: "Urgent",
    description: "Lorem ipsum dolor sit amet.",
    location: "",
    date: "",
    time: "",
    duration: 0
  };

  const [formData, setFormData] = useState<FormData | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const openCard = () => {
    const data: FormData = {
      category: "Transportation",
      urgency: "Urgent",
      description: "Lorem ipsum dolor sit amet.",
      location: "Sample Location",
      date: "2024-02-21",
      time: "14:30",
      duration: 0
    };

    setFormData(data);
    setIsEditing(false); // Enable editing when card opens
  };

  const closeCard = () => {
    setFormData(null);
    setIsEditing(false);
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   if (formData) {
  //     setFormData(prevState => ({
  //       ...prevState,
  //       [name]: value
  //     }));
  //   }
  // };

  function handleSubmit() {
    // Handle form submission here
    setIsEditing(false); // Disable editing after submission
  }

  const toggleEditing = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
    setIsEditing(true); // Set to true when "Edit" button is clicked
  };

  return (
    <div>
      <Navbar/>
      <div className='p-20'>
        
        {formData && (
          <div className="bg-gray-100 p-5 rounded-md shadow-md max-w-xl">
            <div className="flex flex-col text-sm gap-2">
              <p><strong>Category:</strong> 
                {isEditing ? (
                  <input 
                    type="text" 
                    name="category" 
                    value={formData.category} 
                    // onChange={handleChange} 
                  />
                ) : (
                  formData.category
                )}
              </p>
              <p><strong>Urgency:</strong> 
                {isEditing ? (
                  <input 
                    type="text" 
                    name="urgency" 
                    value={formData.urgency} 
                    // onChange={handleChange} 
                  />
                ) : (
                  formData.urgency
                )}
              </p>
              <p><strong>Description:</strong> 
                {isEditing ? (
                  <textarea 
                    name="description" 
                    value={formData.description} 
                    // onChange={handleChange} 
                  />
                ) : (
                  formData.description
                )}
              </p>
              <p><strong>Location:</strong> 
                {isEditing ? (
                  <input 
                    type="text" 
                    name="location" 
                    value={formData.location} 
                    // onChange={handleChange} 
                  />
                ) : (
                  formData.location
                )}
              </p>
              <p><strong>Date:</strong> 
                {isEditing ? (
                  <input 
                    type="text" 
                    name="date" 
                    value={formData.date} 
                    // onChange={handleChange} 
                  />
                ) : (
                  formData.date
                )}
              </p>
              <p><strong>Time:</strong> 
                {isEditing ? (
                  <input 
                    type="text" 
                    name="time" 
                    value={formData.time} 
                    // onChange={handleChange} 
                  />
                ) : (
                  formData.time
                )}
              </p>
              <p><strong>Duration:</strong> 
                {isEditing ? (
                  <input 
                    type="text" 
                    name="duration" 
                    value={formData.duration} 
                    // onChange={handleChange} 
                  />
                ) : (
                  formData.duration
                )}
              </p>
              {/* {isEditing ? (
                <button onClick={handleSubmit} className="bg-lime-800 p-2 rounded-md text-white">
                  Submit
                </button>
              ) : (
                <button onClick={toggleEditing} className="bg-lime-800 p-2 rounded-md text-white">
                  Edit
                </button>
              )} */}
              <button onClick={closeCard} className="bg-lime-800 p-2 rounded-md text-white">
                Close
              </button>
            </div>
          </div>
        )}

        {!formData && (
          <div className="bg-gray-100 p-5 rounded-md shadow-md max-w-xl flex flex-col gap-3">
            <p className='text-sm'><strong>Category:</strong> {initialCategory.description}</p>
            <p className='text-sm'><strong>Urgency:</strong> {initialCategory.urgency}</p>
            <button onClick={openCard} className="bg-lime-800 p-2 rounded-md text-white">
              Open
            </button>
          </div>
        )}
      </div> 
      
      <Footer/>
    </div>
  );
};

export default Requests;
