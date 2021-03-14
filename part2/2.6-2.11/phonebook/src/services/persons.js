import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newobject) => {
  return axios.post(baseUrl, newobject);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const updatePerson = (id, newobject) => {
  return axios.put(`${baseUrl}/${id}`, newobject);
};

export default {
  create: create,
  getAll: getAll,
  deletePerson: deletePerson,
  updatePerson: updatePerson,
};
