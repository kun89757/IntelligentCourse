import { addUserApi, getUserListApi, deleteUserApi, editUserApi, getTagsApi, getSubjectsApi, startUploadApi, submitUploadApi, getConceptListApi, addConceptApi, deleteConceptApi, editConceptApi, getUncheckedListApi, courseAuditionApi, editRecommendationApi, getMyCourseTopNApi, getCourseTopNApi, getConceptTopNApi, getMyConceptTopNApi, getMyVideoTopNApi, getVideoTopNApi, getTop50Api, extractApi, conceptRecommendDelApi, getVideoViewsApi, getTeacherCountApi, getCourseCountApi, getMostPopularTeacherApi, getMostPopularCourseApi} from '@/api/admin'
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
        getUserList({commit}, data) {
            const { page, size, username, nickname, roleId, email, phone} = data;
            return new Promise((resolve, reject) => {
                getUserListApi({
                    page,
                    size,
                    username,
                    nickname,
                    roleId,
                    email,
                    phone
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        addUser({commit}, data) {
            const {username, nickname, roleId, email, phone, password} = data;
            return new Promise((resolve, reject) => {
                addUserApi({
                    username,
                    nickname,
                    roleId,
                    email,
                    phone,
                    password
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        deleteUser({commit}, data) {
            const { userId } = data;
            return new Promise((resolve, reject) => {
                deleteUserApi({
                    userId
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        editUser({commit}, data) {
            const { userId, username, nickname, roleId, email, phone, password} = data;
            return new Promise((resolve, reject) => {
                editUserApi({
                    userId,
                    username,
                    nickname,
                    roleId,
                    email,
                    phone,
                    password
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        getTags({commit}, data) {
            const { page, size, tagName} = data;
            return new Promise((resolve, reject) => {
                getTagsApi({
                    page,
                    size,
                    tagName
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        getSubjects({commit}, data) {
            const { page, size, subjectName } = data;
            return new Promise((resolve, reject) => {
                getSubjectsApi({
                    page,
                    size,
                    subjectName
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        startUpload({commit}) {
            return new Promise((resolve, reject) => {
                startUploadApi({
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        submitUpload({commit}, data) {
            const { uploadUUID, courseName, courseDescribe, subjectId, tagIdList, videoUUIDList, conceptsList } = data;
            return new Promise((resolve, reject) => {
                submitUploadApi({
                    uploadUUID,
                    courseName,
                    courseDescribe,
                    subjectId,
                    tagIdList,
                    videoUUIDList,
                    conceptsList,
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        getConceptList({commit}, data) {
            const { page, size, conceptName} = data;
            return new Promise((resolve, reject) => {
                getConceptListApi({
                    page,
                    size,
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
        addConcept({commit}, data) {
            const {conceptName, subjectId} = data;
            return new Promise((resolve, reject) => {
                addConceptApi({
                    conceptName,
                    subjectId
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        deleteConcept({commit}, data) {
            const { conceptId } = data;
            return new Promise((resolve, reject) => {
                deleteConceptApi({
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
        editConcept({commit}, data) {
            const { conceptId, conceptName, subjectId} = data;
            return new Promise((resolve, reject) => {
                editConceptApi({
                    conceptId,
                    conceptName,
                    subjectId
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        getUncheckedList({commit}, data) {
            const { page, size } = data;
            return new Promise((resolve, reject) => {
                getUncheckedListApi({
                    page,
                    size
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        courseAudition({commit}, data) {
            const {courseId, passed} = data;
            return new Promise((resolve, reject) => {
                courseAuditionApi({
                    courseId,
                    passed
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        getUserRecommendation({commit}, data) {
            const { userId } = data;
            return new Promise((resolve, reject) => {
                getUserRecommendationApi({
                    userId
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        editRecommendation({commit}, data) {
            const { userId, conceptId, conceptName } = data;
            return new Promise((resolve, reject) => {
                editRecommendationApi({
                    userId,
                    conceptId,
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
        getMyCourseTopN({commit}, data) {
            const { n } = data;
            return new Promise((resolve, reject) => {
                getMyCourseTopNApi({
                    n
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        getCourseTopN({commit}, data) {
            const { n } = data;
            return new Promise((resolve, reject) => {
                getCourseTopNApi({
                    n
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        getMyConceptTopN({commit}, data) {
            const { n } = data;
            return new Promise((resolve, reject) => {
                getMyConceptTopNApi({
                    n
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        getConceptTopN({commit}, data) {
            const { n } = data;
            return new Promise((resolve, reject) => {
                getConceptTopNApi({
                    n
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        getMyVideoTopN({commit}, data) {
            const { n } = data;
            return new Promise((resolve, reject) => {
                getMyVideoTopNApi({
                    n
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        getVideoTopN({commit}, data) {
            const { n } = data;
            return new Promise((resolve, reject) => {
                getVideoTopNApi({
                    n
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        getTop50({commmit}, data) {
            const { userId } = data;
            return new Promise((resolve, reject) => {
                getTop50Api({
                    userId
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        extract({commit}, data) {
            const {text} = data;
            return new Promise((resolve, reject) => {
                extractApi({
                    text
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        conceptRecommendDel({commit}, data) {
            const { userId, conceptId } = data;
            return new Promise((resolve, reject) => {
                conceptRecommendDelApi({
                    userId,
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
        getVideoViews({commit}) {
            return new Promise((resolve, reject) => {
                getVideoViewsApi({
                })
                .then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        getTeacherCount({commt}) {
            return new Promise((resolve, reject) => {
                getTeacherCountApi({      
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        getCourseCount({commit}) {
            return new Promise((resolve, reject) => {
                getCourseCountApi({
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        getMostPopularTeacher({commit}) {
            return new Promise((resolve, reject) => {
                getMostPopularTeacherApi({
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        getMostPopularCourse({commit}) {
            return new Promise((resolve, reject) => {
                getMostPopularCourseApi({
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