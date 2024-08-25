import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useHandleRowClick = () => {
  const navigate = useNavigate();

  return useCallback(
    (event, mediaType, id, personDetails) => {
      event.preventDefault();
      // console.log(`Navigating to /details/${mediaType}/${id}`);
      navigate(`/details/${mediaType}/${id}`, { state: { personDetails } });
    },
    [navigate]
  );
};

export default useHandleRowClick;
