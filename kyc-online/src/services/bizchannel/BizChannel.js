import { API_URL } from "../../utils/Variable";
import Axios from "axios";
const API_GetBizChannelAdmin = API_URL + 'api/microsite/bizChannelAdmin';
//const API_GetBizChannelAdmin = 'http://localhost:62324/api/values/BizChannelAdmin';
const API_GetBizChannel = API_URL + 'api/microsite/bizChannel';
const API_UpdateBizchannel = API_URL + 'api/microsite/bizChannel';

export const GetBizChannelAdmin = async () => {
  const result = await Axios.get(
    API_GetBizChannelAdmin
    );
    return await (result.data);
}
export const GetBizChannel = async () => {
    const result = await Axios.get(
        API_GetBizChannel
      );
      return await (result.data);
}
export const PutBizchannel = async (reqparam) => {
    const result = await Axios.put(
        API_UpdateBizchannel, reqparam
      );
      return await (result.data);
}