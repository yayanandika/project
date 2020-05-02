import { API_URL } from "../../utils/Variable";
import Axios from "axios";
const API_GetMeetRMDate = API_URL + 'api/microsite/meetingDate';
const API_PutMeetRMDate = API_URL + 'api/microsite/meetingDate';

export const GetMeetRMDate = async () => {
    const result = await Axios.get(
        API_GetMeetRMDate
      );
      return await (result.data);
}
export const PutMeetRMDate = async (reqparam) => {
    const result = await Axios.put(
        API_PutMeetRMDate, reqparam,
      );
      return await (result.data);
}