import { API_URL } from "../../utils/Variable";
import Axios from "axios";
// const API_GetProductSummary = API_URL + 'api/values/GetProductSummary';
// const API_PutProductSummary = API_URL + 'api/values/PutProductSummary';
// const API_PostProductSummary = API_URL + 'api/values/PostProductSummary';
// const API_DeleteProductSummary = API_URL + 'api/values/product/{id}';

const API_GetProductSummary = API_URL + 'api/microsite/productList';
const API_PutProductSummary = API_URL + 'api/microsite/product';
const API_PostProductSummary = API_URL + 'api/microsite/product';
const API_DeleteProductSummary = API_URL + 'api/microsite/product/{id}';

export const GetProductSummary = async () => {
    const result = await Axios.get(
        API_GetProductSummary
      );
      return await (result.data);
}
export const PutProductSummary = async (reqparam) => {
    const result = await Axios.put(
        API_PutProductSummary, reqparam, //{timeout: TIMEOUT}
      );
      return await (result.data);
}
export const PostProductSummary = async (reqparam) => {
    const result = await Axios.post(
      API_PostProductSummary, reqparam, //{timeout: TIMEOUT}
      );
      return await (result.data);
}

export const DeleteProductSummary = async (reqparam) => {
  console.log('mau delete nih');
  console.log(reqparam);
  const result = await Axios.delete(
    API_DeleteProductSummary.replace('{id}',reqparam), 
    );
    return await (result.data);
}