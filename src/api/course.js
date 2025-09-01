import http from "./http";

export const getCarouselApi = ()  => {
    return http('get', '/course/getRecommend');
}

export const getRecommendationApi = ()  => {
    return http('get', '/conceptRecommend/getMyTop50');
}

export const getCourseInfoApi = (data) => {
    return http('get', '/course/getDetail', data);
}

export const getConceptVideoApi = (data) => {
    return http('get', '/courseInfo/getConceptVideo', data);
}

export const getCourseListApi = data => {
    return http('get', '/course/getList', data);
}

export const getConceptByVideoIdApi = data => {
    return http('get', '/concept/getConceptListByVideoId', data);
}

export const getLastVideoIndexApi = data => {
    return http('get', '/course/getLastVideoIndex', data);
}