import Footer from "@/components/ui/Footer";
import ElderRequestCard from "./ElderRequestCard";
import Navbar from "./Navbar";
import acceptRequestService from "@/services/acceptRequest.service";
import { useEffect, useState } from "react";
import AddReviewPage from "./AddReviewPage";
import VolunteerDetails from "./Review";

const ElderRequest: React.FC = () => {
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [acceptedRequestData, setAcceptedRequestData] = useState<any[]>([]);
  const [acceptedRequestId, setAcceptedRequestId] = useState<string | null>(
    null
  ); // Track the ID of the accepted request
  const [isRequestAccepted, setIsRequestAccepted] = useState(false);

  const accessToken = localStorage.getItem("accessToken");
  const currentUserId = localStorage.getItem("id");

  useEffect(() => {
    fetchAcceptedRequestData();
  }, []);

  const fetchAcceptedRequestData = () => {
    acceptRequestService
      .getAcceptedRequest(accessToken, currentUserId)
      .then((res) => {
        setAcceptedRequestData(res);
      });
  };

  const handleAccept = (id: string) => {
    setIsRequestAccepted(true);
    setAcceptedRequestId(id); // Set the ID of the accepted request
  };
  const handleReview = () => {
    setShowReviewPopup(true); // Open the AddReviewPage as a modal
  };
  const renderRequests = () => {
    if (isRequestAccepted && acceptedRequestId) {
      // Find the accepted request and render it
      const acceptedRequest = acceptedRequestData.find(
        (request) => request.id === acceptedRequestId
      );
      if (acceptedRequest) {
        return (
          <ElderRequestCard
            acceptedrequest={acceptedRequest}
            onAccept={() => handleAccept(acceptedRequest.id)}
            onReview={handleReview}
            showDoneButton={true}
          />
        );
      }
    } else {
      // Render all requests
      return acceptedRequestData.map((request, index) => (
        <ElderRequestCard
          acceptedrequest={request}
          key={index}
          onAccept={() => handleAccept(request.id)}
          onReview={handleReview}
          showDoneButton={false}
        />
      ));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-10 py-3 overflow-scroll h-96">
        <div>
          <h1 className="text-center text-3xl mb-5 text-lime-800 font-bold">
            ACCEPTED REQUEST LIST
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {renderRequests()}
          </div>
        </div>
        {showReviewPopup && (
          <AddReviewPage onClose={() => setShowReviewPopup(false)} />
        )}
        <VolunteerDetails acceptedrequest={acceptedRequestData} />
      </div>

      <Footer />
    </div>
  );
};

export default ElderRequest;
