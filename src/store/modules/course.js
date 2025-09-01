import Vue from 'vue'
import Vuex from 'vuex'
import { getCarouselApi, getConceptByVideoIdApi, getConceptVideoApi, getCourseDetailApi, getCourseInfoApi, getCourseListApi, getElaborateCoursesApi, getLastVideoIndexApi, getRecommendationApi, playApi } from '@/api/course'

Vue.use(Vuex)

export default({
    namespaced: true,
    state: {
        courseId: -1
    },
    mutations: {
        SET_COURSEID: (state, courseId) => {
            state.courseId = courseId;
        }
    },
    getters: {
        GET_COURSEID: (state) => {
            return state.courseId;
        }
    },
    actions: {
        getCarousel({commit}) {
            return new Promise((resolve, reject) => {
                getCarouselApi({
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        getRecommendation({commit}) {
            return new Promise((resolve, reject) => {
                getRecommendationApi({
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        getCourseInfo({commit}, data) {
            const {courseId} = data;
            return new Promise((resolve, reject) => {
                getCourseInfoApi({
                    courseId
                }).then((response) => {
                    console.log(response);
                    resolve(response);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        getConceptVideo({commit}, data) {
            const {conceptId} = data;
            return new Promise((resolve, reject) => {
                getConceptVideoApi({
                    conceptId
                }).then((response) => {
                    console.log(response);
                    resolve(response);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        getCourseList({commit}, data) {
            let {page, size, courseName, subjectId, tagIds} = data;
            return new Promise((resolve, reject) => {
                getCourseListApi({
                    page,
                    size,
                    courseName,
                    subjectId,
                    tagIds
                }).then((response) => {
                    console.log(response);
                    resolve(response);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        getConceptByVideoId({commit}, data) {
            const { videoId } = data;
            return new Promise((resolve, reject) => {
                getConceptByVideoIdApi({
                    videoId
                }).then((response) => {
                    console.log(response);
                    resolve(response);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        getLastVideoIndex({commit}, data) {
            const { courseId } = data;
            return new Promise((resolve, reject) => {
                getLastVideoIndexApi({
                    courseId
                }).then((response) => {
                    console.log(response);
                    resolve(response);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                })
            })
        }
    }
})