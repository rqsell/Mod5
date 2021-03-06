import axios from 'axios';
import baseURL from './config.js'
import { NotificationContainer, NotificationManager } from 'react-notifications';


console.log(baseURL)

const token = window.localStorage.getItem('token')
let t = token ? token.substring(0, 15) : null

console.log('TOKEN', t, 'NODE_ENV', process.env.NODE_ENV)


let resetHead = () => {
  return { headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` } }
}

const API = axios.create({ withCredentials: true, baseURL, headers: { Authorization: `Bearer ${token}` } });


const actions = {
  getUser: async () => {
    return await API.get(`/user`, resetHead())
  },
  signUp: async (user) => {
    let res = await API.post('/signup', user, resetHead())
    window.localStorage.setItem('token', res?.data?.token)
    return res
  },
  logIn: async (user) => {
    let res = await API.post('/login', user, resetHead())
    window.localStorage.setItem('token', res?.data?.token)
    return res
  },
  logOut: async () => {
    window.localStorage.removeItem('token')
    return await API.get('/logout', resetHead())
  },
  addalist: async (data) => {
    return await API.post("/AddAList", data, resetHead());
  },
  additem: async (data) => {
    return await API.post("/AddItem", data, resetHead());
  },
  editanitem: async (data) => {
    return await API.post("/EditAnItem", data, resetHead());
  },
  getItem: async (data) => {
    return await API.post("/getAllItems", data, resetHead());
  },
  addFavorites: async (data) => {
    return await API.post("/addFavorites", data, resetHead());
  },
  getList: async (goal) => {
    return await API.get("/GetList", resetHead());
  },
  getListDetails: async (listid) => {
    return await API.get(`/GetList/${listid}`, resetHead());
  },

  DeleteItem: async (id) => {
    return await API.post('/DeleteAnItem', { id }, resetHead())
  },
  deleteFavorite: async() =>
{
  return await API.post("/AddDelete", resetHead())
}
};

API.interceptors.response.use((response) => response, (error) => {
  console.error(error?.response?.data)
  if (error?.response?.data.name !== "JsonWebTokenError")
    NotificationManager.error(String(error?.response?.data.message))
  else
    NotificationManager.error("Please signup or login")

})

export default actions;
