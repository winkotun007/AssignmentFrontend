import { Box, CardContent, LinearProgress } from "@mui/material";
import {  useParams } from "react-router-dom";
import RegistrationEditForm from "./RegistrationEdit";
import {  IVisitorsEdit } from "../models";
import fetchData from "../api/fetchData";
import { endpoint } from "../api/enpoints";
import { useEffect, useState } from "react";

const RegisterEditMain = () => {

  const params = useParams();
  const visitorId = params.slug;

  const [isLoading, setIsLoading] = useState(true);
  const [visitorData, setVisitorData] = useState<IVisitorsEdit>();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchVisitor = async () => {
      try {
        const requestData = { Id: visitorId?.toString() };
        const visitorDataResponse = await fetchData<IVisitorsEdit>(endpoint.VisitorByID, requestData);
        setVisitorData(visitorDataResponse.data);
        setIsLoading(false);
      } catch (error) {
        setError(error as Error);
        setIsLoading(false);
      }
    };

    if (visitorId) {
      fetchVisitor();
    }
  }, [visitorId]);

  return (
    <Box>
      <CardContent>
        {isLoading && <LinearProgress />}
        {!isLoading && visitorData && (
          <RegistrationEditForm Id={visitorId?.toString()} data={visitorData} />
        )}
         {error && <p>Error fetching visitor data: {error.message}</p>} 
      </CardContent>
    </Box>
  );
}

export default RegisterEditMain;