import Mock, { Random } from "mockjs"

const data = Mock.mock({
  'conceptList|55': [{
    id: '@increment',
    conceptName: '@name'
  }],
  'videoList|55': [{
    videoId: '@increment',
    videoName: '@name',
    coverURL: 'https://puui.qpic.cn/vcover_hz_pic/0/o8mbrpo92gni5uc1614137102933/0',
    videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    courseId: '@increment'
  }]
})

const getQuery = (url, name) => {
  const isFind = url.indexOf(name) !== -1
if (isFind) {
  const queryArr = url.split('?')[1].split('&')
  for (let i = 0; i < queryArr.length; i++) {
    const result = queryArr[i].split('=')
    if (result[0] === name) {
      return result[1]
    }
  }
}
return null
}

Mock.mock(RegExp('http://localhost:8888/concept/getVideoListByConceptId'), 'get', (options) => {
    console.log(options);
    const size = getQuery(options.url, 'size');
    const page = getQuery(options.url, 'page');
    const startIndex = (page - 1) * size
    const endIndex = size * page
    const totalPage = Math.ceil(data.videoList.length / size)
    const newDataArr =
        page > totalPage ? [] : data.videoList.slice(startIndex, endIndex)
    return {
        code: 200,
        success: true,
        message: '获取概念列表成功',
        data: {
            list: newDataArr,
            count: data.videoList.length
        }
    }
})

Mock.mock(RegExp('http://localhost:8888/concept/getConceptListByCourseId'), 'get', (options) => {
    console.log(options);
    const size = getQuery(options.url, 'size');
    const page = getQuery(options.url, 'page');
    const startIndex = (page - 1) * size
    const endIndex = size * page
    const totalPage = Math.ceil(data.conceptList.length / size)
    const newDataArr =
        page > totalPage ? [] : data.conceptList.slice(startIndex, endIndex)
    return {
        code: 200,
        success: true,
        message: '获取概念列表成功',
        data: {
            list: newDataArr,
            count: data.conceptList.length
        }
    }
})


Mock.mock('http://localhost:8888/complain/startComplain', {
  'code': 200,
  'data': {
    'uploadUUID': Random.id()
  }
})

Mock.mock('http://localhost:8888/complain/uploadImage', {
  'code' :200,
  'data': {
    'imageUUID': Random.id()
  }
})

Mock.mock('http://localhost:8888/complain/uploadFile', {
  'code' :200,
  'data': Random.id()
})

Mock.mock('http://localhost:8888/complain/submitComplain', {
  'code' :200,
  'data': {
  }
})

Mock.mock('http://localhost:8888/rate/rate', {
  'code' :200,
  'data': {
  }
})