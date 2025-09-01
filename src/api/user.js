import http from "./http";

export const getUserInfoApi = ()  => {
    return http('get', '/user/getCurrentUser');
}

export const getHistoryCoursesApi = (data)  => {
    return http('get', '/history/getList', data);
}

export const uploadImageApi = data => {
    return http('post', '/complain/uploadImage', data);
}

export const changePasswordApi = data => {
    return http('post', '/account/updatePassword', data);
}

export const updateNicknameApi = data => {
    return http('post', '/user/updateCurrentUserInfo', data);
}

export const getCurrentUserDetailApi = () => {
    return http('get', '/user/getCurrentUserDetail');
}