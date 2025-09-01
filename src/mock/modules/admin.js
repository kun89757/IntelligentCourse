import Mock from "mockjs"
var Random = Mock.Random;

const data = Mock.mock({
    'userList|55': [{
            userId: '@increment',
            username: '@cname',
            nickname: '@name',
            roleId: 1,
            phone: "17551841982",
            email: '@email',
            password: '12345678'
        }
    ],
    'conceptList|55': [{
            conceptId: '@increment',
            conceptName: '@cname',
            subjectId: "@increment"
        }
    ],
    'courseList|55': [{
            courseId: '@increment',
            courseName: '@name',
            imageURL: 'https://pic2.zhimg.com/v2-af9bc9bbd93d06eeddce562571a8c94e_720w.jpg?source=172ae18b',
            videoCount: '56',
            createUserName: "@cname",
        }
    ],
    'tagList|55': [{
      id: '@increment',
      tagName: '@cname',
    }],
    'subjectList|55': [{
      id: '@increment',
      subjectName: '@cname',
    }],
    'userConcept|10': [{
      conceptId: '@increment',
      conceptName: '数据结构'
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

Mock.mock(RegExp('http://localhost:8888/user/getList'), 'get', (options) => {
    console.log(options);
    const size = getQuery(options.url, 'size');
    const page = getQuery(options.url, 'page');
    const startIndex = (page - 1) * size
    const endIndex = size * page
    const totalPage = Math.ceil(data.userList.length / size)
    const newDataArr =
        page > totalPage ? [] : data.userList.slice(startIndex, endIndex)
    return {
        code: 200,
        success: true,
        message: '获取用户列表成功',
        data: {
            list: newDataArr,
            count: data.userList.length
        }
    }
})

Mock.mock(RegExp('http://localhost:8888/concept/getList'), 'get', (options) => {
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

Mock.mock(RegExp('http://localhost:8888/tag/getList'), 'get', (options) => {
    console.log(options);
    const size = getQuery(options.url, 'size');
    const page = getQuery(options.url, 'page');
    const startIndex = (page - 1) * size
    const endIndex = size * page
    const totalPage = Math.ceil(data.tagList.length / size)
    const newDataArr =
        page > totalPage ? [] : data.tagList.slice(startIndex, endIndex)
    return {
        code: 200,
        success: true,
        message: '获取标签列表成功',
        data: {
            list: newDataArr,
            count: data.tagList.length
        }
    }
})

Mock.mock(RegExp('http://localhost:8888/subject/getList'), 'get', (options) => {
    console.log(options);
    const size = getQuery(options.url, 'size');
    const page = getQuery(options.url, 'page');
    const startIndex = (page - 1) * size
    const endIndex = size * page
    const totalPage = Math.ceil(data.subjectList.length / size)
    const newDataArr =
        page > totalPage ? [] : data.subjectList.slice(startIndex, endIndex)
    return {
        code: 200,
        success: true,
        message: '获取用户列表成功',
        data: {
            list: newDataArr,
            count: data.subjectList.length
        }
    }
})

Mock.mock(RegExp('http://localhost:8888/course/getList'), 'get', (options) => {
    console.log(options);
    const size = getQuery(options.url, 'size');
    const page = getQuery(options.url, 'page');
    const startIndex = (page - 1) * size
    const endIndex = size * page
    const totalPage = Math.ceil(data.courseList.length / size)
    const newDataArr =
        page > totalPage ? [] : data.courseList.slice(startIndex, endIndex)
    return {
        code: 200,
        success: true,
        message: '获取课程列表成功',
        data: {
            list: newDataArr,
            count: data.courseList.length
        }
    }
})

Mock.mock(RegExp('http://localhost:8888/course/getUncheckedList'), 'get', (options) => {
    console.log(options);
    const size = getQuery(options.url, 'size');
    const page = getQuery(options.url, 'page');
    const startIndex = (page - 1) * size
    const endIndex = size * page
    const totalPage = Math.ceil(data.courseList.length / size)
    const newDataArr =
        page > totalPage ? [] : data.courseList.slice(startIndex, endIndex)
    return {
        code: 200,
        success: true,
        message: '获取未审核课程列表成功',
        data: {
            list: newDataArr,
            count: data.courseList.length
        }
    }
})

Mock.mock(RegExp('http://localhost:8888/user/add'), 'post', options => {
  console.log(options);
  const params = JSON.parse(options.body);
  data.userList.unshift(
    Mock.mock({
      userId: '@increment',
      username: params.username,
      nickname: params.nickname,
      roleId: params.roleId,
      email: params.email,
      phone: params.phone,
      password: params.password
    })
  )
  return {
    code: 200
  }
})

Mock.mock(RegExp('http://localhost:8888/concept/add'), 'post', options => {
  console.log(options);
  const params = JSON.parse(options.body);
  data.conceptList.unshift(
    Mock.mock({
      conceptId: '@increment',
      conceptName: params.conceptName,
    })
  )
  return {
    code: 200
  }
})

Mock.mock(RegExp('http://localhost:8888/concept/update'), 'post', options => {
  console.log(options);
  const params = JSON.parse(options.body);
  const editIndex = data.conceptList.findIndex(item => {
    return item.conceptId === params.conceptId;
  })
  data.conceptList[editIndex] = params;
  return {
    code: 200
  }
})

Mock.mock(RegExp('http://localhost:8888/concept/del'), 'post', options => {
  console.log(options);
  const params = JSON.parse(options.body);
  const deleteIndex = data.conceptList.findIndex(item => {
    return item.conceptId === params.conceptId;
  })
  data.conceptList.splice(deleteIndex, 1);
  return {
    code: 200,
  }
})

Mock.mock(RegExp('http://localhost:8888/user/del'), 'post', options => {
  console.log(options);
  const params = JSON.parse(options.body);
  const deleteIndex = data.userList.findIndex(item => {
    return item.id === params.id;
  })
  data.userList.splice(deleteIndex, 1);
  return {
    code: 200,
  }
})

Mock.mock(RegExp('http://localhost:8888/user/update'), 'post', options => {
  console.log(options);
  const params = JSON.parse(options.body);
  const editIndex = data.userList.findIndex(item => {
    return item.id === params.id;
  })
  data.userList[editIndex] = params;
  return {
    code: 200
  }
})

Mock.mock(RegExp('http://localhost:8888/image/upload'), 'post', options => {
  console.log(options);
  return {
    code: 200
  }
})

Mock.mock(RegExp('http://localhost:8888/video/upload'), 'post', options => {
  console.log(options);
  return {
    code: 200,
    data: {
      uuid: Random.id()
    }
  }
})

Mock.mock(RegExp('http://localhost:8888/course/startUpload'), 'get', options => {
  console.log(options);
  return {
    code: 200,
    data: {
      uploadUUID: Random.id()
    }
  }
})

Mock.mock(RegExp('http://localhost:8888/course/submitUpload'), 'post', options => {
  console.log(options);
  return {
    code: 200,
  }
})

Mock.mock(RegExp('http://localhost:8888/course/checkUpload'), 'post', options => {
  console.log(options);
  return {
    code: 200,
  }
})

Mock.mock(RegExp('http://localhost:8888/image/setAvatar'), 'post', options => {
  console.log(options);
  return {
    code: 200,
  }
})

Mock.mock(RegExp('http://localhost:8888/recommendation/getUserRecommendation'), 'get', options => {
  console.log(options);
  return {
    code: 200,
    data : {
      userConcept: data.userConcept
    }
  }
})

Mock.mock(RegExp('http://localhost:8888/recommendation/update'), 'post', options => {
  console.log(options);
  return {
    code: 200
  }
})

Mock.mock(RegExp('http://localhost:8888/subject/getById'), 'get', options => {
  console.log(options);
  return {
    code: 200,
    data: {
      id: Random.id(),
      subjectName: Random.name()
    }
  }
})

Mock.mock(RegExp('http://localhost:8888/conceptExtraction/extract'), 'post', options => {
  console.log(options);
  return {
    code: 200,
    data: data.conceptList
  }
})