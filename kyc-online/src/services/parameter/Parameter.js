import { API_URL } from "../../utils/Variable";
import Axios from "axios";
//const API_ParameterByModule = API_URL + 'api/values/GetParameters/{0}';
const API_ParameterByModule = API_URL + "api/microsite/listOfValue/{0}";

export const GetParameterByModule = async (reqparam) => {
  const result = await Axios.get(
    API_ParameterByModule.replace("{0}", reqparam)
  );
  return await result.data;
};

export const getTerm1 = async () => {
  var data;
  await Axios.get(API_URL + "api/microsite/listOfValue/termsAndCondition1")
    .then(function (response) {
      data = response.data;
    })
    .catch(function (error) {
      data = error;
    });

  return data;
};

export const getTerm2 = async () => {
  var data;
  await Axios.get(API_URL + "api/microsite/listOfValue/termsAndCondition2")
    .then(function (response) {
      data = response.data;
    })
    .catch(function (error) {
      data = error;
    });
  return data;
};

export const getCompanyType = async () => {
  var data;
  await Axios.get(API_URL + "api/microsite/listOfValue/companyType")
    .then(function (response) {
      data = response.data;
    })
    .catch(function (error) {
      data = error;
    });
  return data;
};
