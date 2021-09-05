import base from "../axios/axiosBase";

const useUpdateTicket = async (
  inputValues,
  setRequestData,
  requestData,
  GetProjectTickets
) => {
  setRequestData({ ...requestData, loading: true });
  try {
    const resp = await base.put(`/ticket/${inputValues.ticketId}`, {
      project_id: inputValues.project_id,
      assignee_id: inputValues.assignee,
      title: inputValues.title,
      description: inputValues.description,
      status: inputValues.status,
      reporter_id: inputValues.reporter,
    });
    setRequestData({
      ...requestData,
      loading: false,
      success: resp.data,
    });
    GetProjectTickets();
  } catch (error) {
    setRequestData({
      ...requestData,
      loading: false,
      error: error,
    });
  }
};

export const UpdateTicket = (
  inputValues,
  setRequestData,
  requestData,
  GetProjectTickets
) => {
  return useUpdateTicket(
    inputValues,
    setRequestData,
    requestData,
    GetProjectTickets
  );
};
