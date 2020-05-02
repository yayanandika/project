import { API_URL } from "../../utils/Variable";
import Axios from "axios";
const API_GetCompanyAddress = API_URL + 'api/microsite/companyAddress';
const API_PutCompanyAddress = API_URL + 'api/microsite/companyAddress';

export const GetCompanyAddress = async () => {
    const result = await Axios.get(
        API_GetCompanyAddress
      );
      return await (result.data);
}
export const PutCompanyAddress = async (reqparam) => {
    const result = await Axios.put(
        API_PutCompanyAddress, reqparam
      );
      return await (result.data);
}