import ElderRequestCard from "./ElderRequestCard";
import Navbar from "./Navbar";
import acceptRequestService from "@/services/acceptRequest.service";
import { useEffect, useState } from "react";
import AddReviewPage from "./AddReviewPage";

import Footer from "@/components/ui/Footer";
import { useUser } from "@/context/UserContext";

const ElderRequest: React.FC = () => {
  const { user } = useUser();
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [acceptedRequestData, setAcceptedRequestData] = useState<any[]>([]);
  const [acceptedRequestId, setAcceptedRequestId] = useState<string | null>(
    null
  ); // Track the ID of the accepted request

  const accessToken = localStorage.getItem("accessToken");
  // const currentUserId = localStorage.getItem("id");
  const id = user?.id;
  useEffect(() => {
    fetchAcceptedRequestData();
  }, []);
  console.log(user?.userType);
  console.log(user?.id);

  const fetchAcceptedRequestData = () => {
    console.log("Id insdie eldeReqeust: ", id);
    acceptRequestService.getAcceptedRequest(accessToken, id).then((res) => {
      console.log("res ", res);

      setAcceptedRequestData(res);
    });
  };

  const handleAccept = (id: string) => {
    setAcceptedRequestId(id); // Set the ID of the accepted request
  };
  const handleReview = () => {
    setShowReviewPopup(true); // Open the AddReviewPage as a modal
  };

  // Filter out other cards based on the accepted request ID
  const filteredRequests = acceptedRequestId
    ? acceptedRequestData.filter(
        (request: { id: any }) => request.id === acceptedRequestId
      )
    : acceptedRequestData;

  return (
    <div>
      <Navbar />
      <div className="px-10 py-3 overflow-scroll h-96">
        <div>
          <h1 className="text-center text-3xl mb-5 text-lime-800 font-bold">
            ACCEPTED REQUEST LIST
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {filteredRequests.map(
              (acceptedrequest: { id: string }, index: any) => (
                <ElderRequestCard
                  acceptedrequest={acceptedrequest}
                  key={index}
                  onAccept={() => handleAccept(acceptedrequest.id)}
                  onReview={handleReview}
                  showDoneButton={acceptedRequestId === acceptedrequest.id}
                />
              )
            )}
          </div>
        </div>
        {showReviewPopup && (
          <AddReviewPage onClose={() => setShowReviewPopup(false)} />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ElderRequest;
