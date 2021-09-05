import base from "../axios/axiosBase";
import setTickets from "../actions/currentProjectSlice";
import { v4 } from "uuid";
import { useDispatch } from "react-redux";

const useGetProjectTickets = async (id, requestData, setRequestData) => {
  //   const dispatch = useDispatch();
  setRequestData({ ...requestData, loading: true });
  try {
    const resp = await base.get(`/tickets/projects/${id}`);
    setRequestData({
      ...requestData,
      loading: false,
      data: resp.data.json_list,
    });
  } catch (error) {
    setRequestData({ ...requestData, loading: false, error: error });
    console.log(error);
  }
};

export const GetProjectTickets = (id, requestData, setRequestData) => {
  return useGetProjectTickets(id, requestData, setRequestData);
};
