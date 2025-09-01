import { getUserInfoApi, getHistoryCoursesApi, uploadImageApi, changePasswordApi, updateNicknameApi, getCurrentUserDetailApi} from '@/api/user';
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default({
    namespaced: true,
    state: {
        email : 'a125516524@163.com',
        avatar: '',
        username: '',
        roleId: -1,
        userId: -1
    },
    mutations: {
        setRoleId: (state, roleId) => {
            state.roleId = roleId;
            localStorage.setItem("roleId", roleId);
        },
        setEmail: (state, email) => {
            state.email = email;
            localStorage.setItem('email', email);
        },
        setAvatar: (state, avatar) => {
            state.avatar = avatar;
            localStorage.setItem('avatar', avatar);
        },
        setUsername: (state, username) => {
            state.username = username;
            localStorage.setItem('username', username);
        },
        setUserId: (state, userId) => {
            state.userId = userId;
            localStorage.setItem('userId', userId);
        }
    },
    actions: {
        getUserInfo({commit}) {
            return new Promise((resolve, reject) => {
                getUserInfoApi({
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        getHistoryCourses({commit}, data) {
            const { page, size } = data;
            return new Promise((resolve, reject) => {
                getHistoryCoursesApi({
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
        uploadImage({commit}, data) {
            const { file, imageName, uploadUUID } = data;
            return new Promise((resolve, reject) => {
                uploadImageApi({
                    file,
                    imageName,
                    uploadUUID
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        changePassword({commit}, data) {
            const {oldPassword, newPassword} = data;
            return new Promise((resolve, reject) => {
                changePasswordApi({
                    oldPassword,
                    newPassword
                }).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        updateNickname({commit}, data) {
            const {nickname, phone} = data;
            return new Promise((resolve, reject) => {
                updateNicknameApi({
                    nickname,
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
        getCurrentUserDetail({commit}) {
            return new Promise((resolve, reject) => {
                getCurrentUserDetailApi({
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