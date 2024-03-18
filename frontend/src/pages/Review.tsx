import userService from "@/services/user.service";
import { useEffect, useState } from "react";

import Navbar from "./Navbar";
import Footer from "@/components/ui/Footer";
import UserModel from "@/models/UserModel";

const VolunteerDetails = ({ acceptedrequest }: any) => {
  // console.log("userID : ", acceptedrequest.volunteerId);

  // const userIdAsNumber: number | undefined = parseInt(userId, 10);
  const accessToken = localStorage.getItem("accessToken");

  const [user, setUser] = useState<UserModel>();
  console.log("Review Page", acceptedrequest.volunteerId);
  useEffect(() => {
    userData();
  }, []);

  const userData = () => {
    userService
      .getById(accessToken, acceptedrequest.volunteerId)
      .then((res) => {
        console.log("inside review", res.data);
        setUser(res.data);
      });
  };

  if (!user) {
    return <div></div>;
  }

  return (
    <>
      <div className="flex-1 text-left m-2 p-10 rounded-lg shadow-lg bg-white max-w-2xl mx-auto">
        <div className="flex flex-col gap-4 text-lime-800">
          <p className="text-md">
            <strong className="font-semibold">Name:</strong> {user.firstName}{" "}
            {user.lastName}
          </p>

          <p className="text-md">
            <strong className="font-semibold">Email:</strong> {user.email}
          </p>
          <p className="text-md">
            <strong className="font-semibold">Phone:</strong> {user.phone}
          </p>
          <p className="text-md">
            <strong className="font-semibold">Birth Date:</strong>{" "}
            {user.birthDate}
          </p>
          <p className="text-md">
            <strong className="font-semibold">Address:</strong>{" "}
            <span>{`${user?.address?.street_name} ${user?.address?.suite_number} ${user?.address?.city}${user?.address?.state}, ${user?.address?.country} ${user?.address?.pincode}`}</span>
          </p>
        </div>
        <div className="mt-8 mb-8 flex justify-left gap-5">
          {/* Add any buttons or additional content here */}
        </div>
      </div>
    </>
  );
};

export default VolunteerDetails;
