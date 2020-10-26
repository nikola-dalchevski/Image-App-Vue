import api from "../../api/imgur";
import {router} from "../../main";

const state = {
     images: []
}

const getters = {
 allImages: (state) => {
     return state.images;
 }
}

const actions = {
   fetchImages: async ({rootState, commit}) => {
      const {token} = rootState.auth;
    const response = await api.fetchImages(token);
    commit("setImages", response.data.data);
  },
  uploadImages: async ({rootState}, images) => {
      //get the access token
         const { token } = rootState.auth;
      //Call our API module to do the uplad
         await api.upload(images,token);
      //Redirect our user to image list component
       router.push("/");
  }
}

const mutations = {
    setImages: (state, images) => {
         state.images = images;
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}