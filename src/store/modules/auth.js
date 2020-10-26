import api from '../../api/imgur';
import qs from 'qs';
import { router } from "../../main";

const state = {
     token: window.localStorage.getItem("imgur_token"),
};

const getters = {
    isLoggedIn: (state) =>  {
       return !!state.token;
    }
};

const actions = {
    login: () => {
      api.login();
    },
    finalizeLogin: ({commit} , hash) => {
         const query = qs.parse(hash.replace("#", ''));
         
         commit("setToken", query.access_token);
         window.localStorage.setItem('imgur_token', query.access_token);  
         

         router.push("/");
         
    },
    // commit is used to call mutations
    logout: ({commit}) => {
        commit('setToken', null);
        window.localStorage.removeItem("imgur_token");
    }
};


const mutations = {
      setToken: (state, token) => {
          state.token = token;
      }
};

export default {
    state,
    getters,
    actions,
    mutations
}

//  https://api.imgur.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&response_type=token&state=APPLICATION_STATE