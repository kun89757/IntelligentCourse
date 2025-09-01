import http from "./http";

export const getUserListApi = (data)  => {
    return http('get', '/user/getList', data);
}

export const addUserApi = (data) => {
    return http('post', '/user/add', data);
}

export const deleteUserApi = (data) => {
    return http('delete', '/user/del', data);
}

export const editUserApi = (data) => {
    return http('post', '/user/update', data);
}

export const getTagsApi = (data) => {
    return http('get', '/tag/getList', data);
}

export const getSubjectsApi = (data) => {
    return http('get', '/subject/getList', data);
}

export const startUploadApi = () => {
    return http('get', '/course/startUpload');
}

export const submitUploadApi = (data) => {
    return http('post', '/course/submitUpload', data);
}

export const getConceptListApi = (data)  => {
    return http('get', '/concept/getList', data);
}

export const addConceptApi = data => {
    return http('post', '/concept/add', data);
}

export const deleteConceptApi = (data) => {
    return http('delete', '/concept/del', data);
}

export const editConceptApi = (data) => {
    return http('post', '/concept/update', data);
}

export const getUncheckedListApi = (data)  => {
    return http('get', '/course/getUncheckedList', data);
}

export const courseAuditionApi = data => {
    return http('post', '/course/checkUpload', data);
}

export const editRecommendationApi = data => {
    return http('post', '/recommendation/update', data)
}

export const getMyConceptTopNApi = data => {
    return http('get', '/concept/getMyTopN', data);
}

export const getConceptTopNApi = data => {
    return http('get', '/concept/getTopN', data);
}

export const getMyCourseTopNApi = data => {
    return http('get', '/course/getMyTopN', data);
}

export const getCourseTopNApi = data => {
    return http('get', '/course/getTopN', data);
}

export const getMyVideoTopNApi = data => {
    return http('get', '/video/getMyTopN', data);
}

export const getVideoTopNApi = data => {
    return http('get', '/video/getTopN', data);
}

export const getTop50Api = data => {
    return http('get', '/conceptRecommend/getTop50', data);
}

export const extractApi = data => {
    return http('post', '/conceptExtraction/extract', data);
}

export const conceptRecommendDelApi = data => {
    return http('get', 'conceptRecommend/del', data);
}

export const getVideoViewsApi = () => {
    return http('get', '/analysis/getVideoViews');
}

export const getTeacherCountApi = () => {
    return http('get', '/analysis/getTeacherCount');
}

export const getCourseCountApi = () => {
    return http('get', '/analysis/getCourseCount');
}

export const getMostPopularTeacherApi = () => {
    return http('get', '/analysis/getMostPopularTeacher');
}

export const getMostPopularCourseApi = () => {
    return http('get', '/analysis/getMostPopularCourse');
}