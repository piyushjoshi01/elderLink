import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import acceptRequestService from "@/services/acceptRequest.service";
import userService from "@/services/user.service";
import requestService from "@/services/request.service";
import creditTransferService from "@/services/creditTransfer.service";

const ElderRequestCard = ({
  acceptedrequest,
  onAccept,
  showDoneButton,
  onReview,
}: any) => {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [requestCategory, setRequestCategory] = useState("");
  const [requestDescription, setRequestDescription] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    userData();
    requestData();
  }, []);

  const handleAccept = () => {
    const formdata = {
      elderPersonId: acceptedrequest.elderPersonId,
      volunteerId: acceptedrequest.volunteerId,
      requestId: acceptedrequest.requestId,
      actionType: "ACCEPTED",
    };
    acceptRequestService
      .getAccepted(
        localStorage.getItem("accessToken"),
        acceptedrequest.id,
        formdata
      )
      .then(() => {
        onAccept();
      });
    alert("Are you sure? This will Credit 3 credit to John Snow");
  };

  const handleDone = () => {
    const data = {
      senderId: acceptedrequest.elderPersonId,
      recipientId: acceptedrequest.volunteerId,
      requestId: acceptedrequest.requestId,
      hoursCredited: 2,
    };
    creditTransferService
      .credited(localStorage.getItem("accessToken"), data)
      .then((res) => {
        console.log(res);
        return "Credit Transfered";
      });

    onReview();
  };

  const userData = () => {
    userService
      .getById(localStorage.getItem("accessToken"), acceptedrequest.volunteerId)
      .then((res) => {
        setUserFirstName(res.data.firstName);
        setUserLastName(res.data.lastName);
      });
  };

  const requestData = () => {
    requestService
      .getById(localStorage.getItem("accessToken"), acceptedrequest.requestId)
      .then((res) => {
        setRequestCategory(res.requestCategory);
        setRequestDescription(res.requestDescription);
        setRequestDate(res.date);
      });
  };
  const isBeforeSetDate = () => {
    const currentDate = new Date();
    const setDate = new Date(requestDate);
    return currentDate < setDate;
  };

  return (
    <div className="bg-white p-8 rounded-md max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl shadow-lg">
      <h2 className="text-2xl text-lime-800 font-bold mb-4 font-bold tracking-wider">
        Request Details
      </h2>
      <div className="mb-4 text-left">
        <p
          className="text-lime-800 cursor-pointer rounded hover:bg-lime-200"
          onClick={() => navigate("/review")}
        >
          <strong>Volunteer Name:</strong> {userFirstName} {userLastName}
        </p>
        <p className="text-lime-800">
          <strong>Category:</strong> {requestCategory}
        </p>
        <p className="text-lime-800">
          <strong>Description:</strong> {requestDescription}
        </p>

        <div className="flex justify-center">
          {showDoneButton ? (
            <button
              disabled={isBeforeSetDate()} // Disable button based on date comparison
              className={`w-30 mx-2 px-6 py-3 text-sm ${
                isBeforeSetDate()
                  ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                  : "text-white bg-lime-800 hover:bg-lime-400 hover:text-lime-800"
              } capitalize transition-colors duration-300 transform rounded-2xl font-bold focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50`}
              onClick={handleDone}
            >
              Done
            </button>
          ) : (
            <button
              className="w-30 mx-2 px-6 py-3 text-sm text-white capitalize transition-colors duration-300 transform bg-lime-800 rounded-2xl hover:bg-lime-400 hover:text-lime-800 font-bold focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              onClick={handleAccept}
            >
              Accept
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElderRequestCard;
