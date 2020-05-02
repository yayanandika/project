import { API_URL } from "../../utils/Variable";
import Axios from "axios";
//export const API_PutDocumentUpload = 'http://localhost:62324/api/values/UpdateUploadDocl';
//const API_GetdocumentDetails = 'http://localhost:62324/api/values/documentDetails';
export const API_PutDocumentUpload = API_URL + 'api/microsite/companyDocument/';
const API_GetdocumentDetails = API_URL + 'api/microsite/documentDetails';
const API_PutdocumentDetails = API_URL + 'api/microsite/documentDetails';

export const GetdocumentDetails = async () => {
    const result = await Axios.get(
        API_GetdocumentDetails
      );
      return await (result.data);
}
export const PutdocumentDetails = async (reqparam) => {
    const result = await Axios.put(
        API_PutdocumentDetails, reqparam
      );
      return await (result.data);
}