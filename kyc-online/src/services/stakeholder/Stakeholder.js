import axios from "axios";
import { API_URL } from "../../utils/Variable";

export const getList = async () => {
  var data;
  await axios
    .get(API_URL + "api/microsite/stakeholderManagement")
    .then(function (response) {
      data = response.data;
      console.log(data);
      
    })
    .catch(function (error) {
      data = error;
    });

  return data;
};

export const addStakeHolder = async (body, formdata) => {
  var data;
  let config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  await axios
    .post(API_URL + "api/microsite/stakeholder", body)
    .then(async function (response) {
      console.log(response);
      await axios
        .put(
          API_URL +
            "api/microsite/stakeholderManagementDocument/stakeholder/" +
            response.data.id,
          formdata,
          config
        )
        .then(function (response) {
          data = response;
        })
        .catch(function (error) {
          data = error + " formdata";
        });
    })
    .catch(function (error) {
      data = error + " data";
    });

  return data;
};

export const deleteStakeHolder = async (id) => {
  var data;
  await axios
    .delete(API_URL + "api/microsite/stakeholder/" + id)
    .then(function (response) {
      data = response;
    })
    .catch(function (error) {
      data = error;
    });

  return data;
};

export const updateStakeHolder = async (body) => {
  var data;
  await axios
    .put(API_URL + "api/microsite/stakeholder", body)
    .then(function (response) {
      data = response;
    })
    .catch(function (error) {
      data = error;
    });

  return data;
};
