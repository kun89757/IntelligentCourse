import { getConceptListByCourseIdApi, getSubjectByIdApi, getVideoListByConceptIdApi, rateApi, startComplainApi, submitComplainApi } from '@/api/concept';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default({
  namespaced: true,
  state: {

  },
  mutations: {

  },
  actions: {
    getConceptListByCourseId({commit}, data) {
      const { page, size, courseId, conceptName } = data;
      return new Promise((resolve, reject) => {
        getConceptListByCourseIdApi({
          page,
          size,
          courseId,
          conceptName
        }).then(response => {
            console.log(response);
            resolve(response);
        }).catch(error => {
            console.log(error);
            reject(error);
        })
      })
    },
    getVideoListByConceptId({commit}, data) {
      const {page, size, conceptId} = data;
      return new Promise((resolve, reject) => {
        getVideoListByConceptIdApi({
          page,
          size,
          conceptId
        }).then(response => {
          console.log(response);
          resolve(response);
        }).catch(error => {
            console.log(error);
            reject(error);
      })
      })
    },
    startComplain({commit}) {
      return new Promise((resolve, reject) => {
        startComplainApi({
        }).then(response => {
          console.log(response);
          resolve(response);
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    submitComplain({commit}, data) {
      const { complainContent, imageUUIDList, uploadUUID, fileUUIDList } = data;
      return new Promise((resolve, reject) => {
        submitComplainApi({
          complainContent,
          imageUUIDList,
          uploadUUID,
          fileUUIDList
        }).then(response => {
          console.log(response);
          resolve(response);
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    rate({commit}, data) {
      const { content, stars } = data;
      return new Promise((resolve, reject) => {
        rateApi({
          content,
          stars
        }).then(response => {
          console.log(response);
          resolve(response);
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    getSubjectById({commit}, data) {
      const { subjectId } = data;
      return new Promise((resolve, reject) => {
        getSubjectByIdApi({
          subjectId
        }).then(response => {
          console.log(response);
          resolve(response);
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    }
  }
})