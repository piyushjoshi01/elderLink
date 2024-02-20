import React, { ChangeEvent, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "../components/ui/Footer";
import UserModel from "@/models/UserModel";
import userService from "@/services/user.service";

const UserProfile = () => {
  const [user, setUser] = useState<UserModel>(new UserModel());
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken") || "Fallback Token";
    if (!accessToken) {
      console.log("No access token available");
      return;
    }
    userService
      .getById(accessToken)
      .then((res) => {
        console.log(res.data);
        const newUser = new UserModel();
        newUser.firstName = res.data.firstName;
        newUser.lastName = res.data.lastName;
        newUser.birthDate = res.data.birthDate;
        newUser.email = res.data.email;
        newUser.phone = res.data.phone;
        newUser.address = res.data.address;
        newUser.password = res.data.password;
        newUser.userType = res.data.userType;
        newUser.creditBalance = res.data.creditBalance;

        setUser(newUser);
      })
      .catch((error) => {
        console.error("Failed to fetch user details", error);
      });
  }, [localStorage.getItem("accessToken")]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedFirstName, setEditedFirstName] = useState<string>(user.firstName);
  const [editedLastName, setEditedLastName] = useState<string>(user.lastName);
  const [editedPhone, setEditedPhone] = useState<string>(user.phone);
  const [editedAddress, setEditedAddress] = useState<{
      street_name: string;
      suite_number: string;
      city: string;
      state: string;
      country: string;
      pincode: string;
  }>({
      street_name: user.address.street_name,
      suite_number: user.address.suite_number,
      city: user.address.city,
      state: user.address.state,
      country: user.address.country,
      pincode: user.address.pincode
  });

  const handleEdit = () => {
      setIsEditing(!isEditing);
  };

  const handleSave = () => {
      // Save changes
      setIsEditing(false);
      // You can perform further actions like API calls to update the user information
  };

  const handleChangeFirstName = (event: ChangeEvent<HTMLInputElement>) => {
      setEditedFirstName(event.target.value);
  };

  const handleChangeLastName = (event: ChangeEvent<HTMLInputElement>) => {
      setEditedLastName(event.target.value);
  };

  const handleChangePhone = (event: ChangeEvent<HTMLInputElement>) => {
      setEditedPhone(event.target.value);
  };

  const handleChangeAddress = (event: ChangeEvent<HTMLInputElement>, key: string) => {
      setEditedAddress({
          ...editedAddress,
          [key]: event.target.value
      });
  };

  const getInitials = (firstName: string, lastName: string) => {
      return `${firstName[0]}${lastName[0]}`;
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-start min-h-screen bg-gray-100 p-6">
        <div className="flex flex-grow">
          <div className="w-1/2 bg-gray-100 p-6 mr-4">
            <h1 className="text-3xl font-bold tracking-wider text-lime-800 mb-4">
              User Profile{" "}
            </h1>
            <div onClick={handleEdit} className="cursor-pointer text-blue-500 mb-2">
                            {isEditing ? "Cancel" : "Edit"}
                        </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex-shrink-0">
              <div className="w-48 h-48 flex items-center justify-center bg-gray-300 text-gray-600 text-4xl font-bold rounded-full">
                                    {getInitials(editedFirstName, editedLastName)}
                                </div>
              </div>
              <div className="ml-6 text-right">
                <div className="rounded-md bg-gray-200 p-2 mb-2 font-medium">
                  <p className="text-lime-800">
                    <strong>User Type:</strong> {user.userType}
                  </p>
                </div>
                <div className="rounded-md bg-lime-800 text-white p-2 mb-4">
                  <p className=" ">
                    <strong>Credit Balance:</strong> {user.creditBalance}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-lime-800 mb-4">
                <strong>First Name:</strong> {isEditing ? <input type="text" value={editedFirstName} onChange={handleChangeFirstName} /> : editedFirstName}{user.firstName}
              </p>
              <p className="text-lime-800 mb-4">
                <strong>Last Name:</strong> {isEditing ? <input type="text" value={editedLastName} onChange={handleChangeLastName} /> : editedLastName}{user.lastName}
              </p>
              <p className="text-lime-800 mb-4">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-lime-800 mb-4">
                <strong>Phone:</strong> {isEditing ? <input type="text" value={editedPhone} onChange={handleChangePhone}/>:editedPhone} {user.phone}
              </p>
              <p className="text-lime-800 mb-4">
                <strong>Birth Date:</strong> {user.birthDate}
              </p>
              {isEditing && (
                                <div>
                                    <p className="text-lime-800 mb-4"><strong>Password:</strong> <input type="password" value={user.password} onChange={() => {}} /></p>
                                    <p className="text-lime-800 mb-4"><strong>Address:</strong></p>
                                    <p className="text-lime-800 mb-4">
                                        <input type="text" value={editedAddress.street_name} onChange={(e) => handleChangeAddress(e, 'street_name')} />, 
                                        <input type="text" value={editedAddress.suite_number} onChange={(e) => handleChangeAddress(e, 'suite_number')} />, 
                                        <input type="text" value={editedAddress.city} onChange={(e) => handleChangeAddress(e, 'city')} />, 
                                        <input type="text" value={editedAddress.state} onChange={(e) => handleChangeAddress(e, 'state')} />, 
                                        <input type="text" value={editedAddress.country} onChange={(e) => handleChangeAddress(e, 'country')} />, 
                                        <input type="text" value={editedAddress.pincode} onChange={(e) => handleChangeAddress(e, 'pincode')} />
                                    </p>
                                </div>
                            )}
                            <div className="flex items-center mb-2">
                                <strong className="text-lime-800 mr-2">Address:</strong>
                                <span>{`${user.address.street_name}, ${user.address.suite_number}, ${user.address.city}, ${user.address.state}, ${user.address.country}, ${user.address.pincode}`}</span>
                            </div>
                            {isEditing && (
                                <button onClick={handleSave} className="px-4 py-2 bg-lime-800 text-white rounded-md">Save</button>
                            )}
              {/* <div className="flex items-center mb-2">
                <strong className="text-lime-800 mr-2">Address:</strong>
                <span>{`${user.address.street_name}, ${user.address.suite_number}, ${user.address.city}, ${user.address.state}, ${user.address.country}, ${user.address.pincode}`}</span>
              </div> */}
            </div>
          </div>
          <div className="w-1/2 bg-gray-100 p-6 ml-4">
            <h1 className="text-3xl font-bold tracking-wider text-lime-800 mb-4">
              Help Requests
            </h1>
            <form className="w-full">
              <div className="mb-4">
                <label
                  htmlFor="request"
                  className="block text-lime-800 font-bold mb-2"
                >
                  Post Request:
                </label>
                <textarea
                  id="request"
                  name="request"
                  className="w-full border h-full rounded-md p-2"
                ></textarea>
              </div>
              <div className="flex justify-between">
                {/* <button
                  type="button"
                  onClick={handleNewRequest}
                  className="px-4 py-2 bg-lime-800 text-white rounded-md"
                >
                  New Request
                </button>
                <button
                  type="button"
                  onClick={handleSubmitRequest}
                  className="px-4 py-2 bg-lime-800 text-white rounded-md"
                >
                  Submit Request
                </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
