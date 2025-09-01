import http from "./http";

export const getConceptListByCourseIdApi = data => {
  return http('get', '/concept/getConceptListByCourseId', data);
}

export const getVideoListByConceptIdApi = data => {
  return http('get', '/concept/getVideoListByConceptId', data);
}

export const startComplainApi = () => {
  return http('post', 'complain/startComplain');
}

export const submitComplainApi = (data) => {
  return http('post', 'complain/submitComplain', data);
}

export const rateApi = data => {
  return http('post', 'rate/rate', data);
}

export const getSubjectByIdApi = data => {
  return http('get', 'subject/getById', data);
}