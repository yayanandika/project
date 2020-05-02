import { API_URL } from "../../utils/Variable";
import Axios from "axios";

export const checkCustomer = async (body) => {
  var data;
  await Axios.post(API_URL + "api/microsite/checkCustomer", body)
    .then(function (response) {
      data = response.data;
    })
    .catch(function (error) {
      data = error;
    });

  return data;
};
