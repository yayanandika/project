import { API_URL } from "../../utils/Variable";
import Axios from "axios";
const API_GetCompanyDetails = API_URL + 'api/microsite/companyDetails';
const API_PutCompanyDetails = API_URL + 'api/microsite/companyDetails';

export const GetCompanyDetails = async () => {
    const result = await Axios.get(
        API_GetCompanyDetails
      );
      return await (result.data);
}
export const PutCompanyDetails = async (reqparam) => {
    const result = await Axios.put(
        API_PutCompanyDetails, reqparam,
      );
      return await (result.data);
}