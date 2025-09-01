import Mock from "mockjs"
let Random = Mock.Random
const data = Mock.mock({
    'courseList|55': [{
        courseId: '@increment',
        courseName: '@name',
        createUserName: '@cname',
        imageURL: "https://puui.qpic.cn/vcover_hz_pic/0/o8mbrpo92gni5uc1614137102933/0",
        beginTime: Random.time("yyyy-mm-dd hh:mm:ss"),
        courseIntro: '程序设计是一门基础课程。对于计算机相关专业而言，程序设计是专业基础知识，是进一步学习其他专业知识的第一步阶梯；对于非计算机专业而言，程序设计的学习有助于理解计算机的能力所在，理解哪些是计算机擅长解决的问题，怎样的方式方法是计算机擅长的手段，从而能更好地利用计算机来解决本专业领域内的问题'
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

Mock.mock(RegExp('http://localhost:8888/history/getList'), 'get', (options) => {
    console.log(options);
    const pageSize = getQuery(options.url, 'size');
    const currentPage = getQuery(options.url, 'page');
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = pageSize * currentPage
    const totalPage = Math.ceil(data.courseList.length / pageSize)
    const newDataArr =
        currentPage > totalPage ? [] : data.courseList.slice(startIndex, endIndex)
    return {
        code: 200,
        success: true,
        message: '获取历史课程列表成功',
        data: {
            list: newDataArr,
            count: data.courseList.length
        }
    }
})

Mock.mock('http://localhost:8888/user/getCurrentUser', {
    "ret" : 0,
    "code": 200,
    "data": {
        "email": "a125516524@163.com",
        "avatarURL": 'https://puui.qpic.cn/vcover_hz_pic/0/o8mbrpo92gni5uc1614137102933/0',
        "username": "Nuwanda",
        "nickname": 'Nuwanda',
        "roleId": 1,
        "phone": '17551841982'
    }
});

Mock.mock(('http://localhost:8888/account/updatePassword'), 'post', options => {
    console.log(options);
    return {
        code: 200
    }
})

Mock.mock(('http://localhost:8888/account/updateNickname'), 'post', options => {
    console.log(options);
    return {
        code: 200
    }
})

