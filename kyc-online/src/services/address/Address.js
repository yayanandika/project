import { API_URL } from "../../utils/Variable";
import Axios from "axios";
const API_GetProvience = API_URL + 'api/microsite/province';
const API_GetCity = API_URL + 'api/microsite/regency/{province}';
const API_GetKecamatan = API_URL + 'api/microsite/district/{regency}';
const API_GetKelurahan = API_URL + 'api/microsite/village/{district}';

export const GetProvience = async () => {
    const result = await Axios.get(
        API_GetProvience, 
      );
      return await (result.data);
}
export const GetCity = async (reqparam) => {
    const result = await Axios.get(
        API_GetCity.replace('{province}',reqparam), 
      );
      return await (result.data);
}
export const GetKecamatan = async (reqparam) => {
    const result = await Axios.get(
        API_GetKecamatan.replace('{regency}',reqparam), 
      );
      return await (result.data);
}
export const GetKelurahan = async (reqparam) => {
    const result = await Axios.get(
        API_GetKelurahan.replace('{district}',reqparam), 
      );
      return await (result.data);
}