import Mock from "mockjs"
Mock.mock('http://localhost:8888/course/getRecommend', {
    "ret" : 0,
    "code": 200,
    "data": [
        {"courseId": 1, "imageURL": 'https://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/1c950a7b02087bf4e82e5dedf0d3572c10dfcff0.jpg'},
        {"videoId": 2, "imageURL": 'https://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/1c950a7b02087bf4e82e5dedf0d3572c10dfcff0.jpg'},
        {"videoId": 3, "imageURL": 'https://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/1c950a7b02087bf4e82e5dedf0d3572c10dfcff0.jpg'},
        {"videoId": 4, "imageURL": 'https://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/1c950a7b02087bf4e82e5dedf0d3572c10dfcff0.jpg'},
        {"videoId": 5, "imageURL": 'https://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/1c950a7b02087bf4e82e5dedf0d3572c10dfcff0.jpg'},
    ]
});

Mock.mock('http://localhost:8888/conceptRecommend/getMyTop50', {
    "ret" : 0,
    "code": 200,
    "data": {
        "recommendation": [
            {"conceptId": 1, "conceptName": "数据结构"},
            {"conceptId": 2, "conceptName": "数据结构"},
            {"conceptId": 3, "conceptName": "数据结构"},
            {"conceptId": 4, "conceptName": "数据结构"},
            {"conceptId": 5, "conceptName": "数据结构"},
            {"conceptId": 6, "conceptName": "数据结构"},
            {"conceptId": 7, "conceptName": "数据结构"},
            {"conceptId": 8, "conceptName": "数据结构"},   
        ]
    }
});

Mock.mock(RegExp('http://localhost:8888/course/getDetail'), {
    "ret" : 0,
    "code": 200,
    "data": {
        "imageSrc" : 'https://pic2.zhimg.com/v2-af9bc9bbd93d06eeddce562571a8c94e_720w.jpg?source=172ae18b',
        "courseName" : '数据结构',
        "subjectId" : 1,
        "courseHistory": {
            'videoId': 2,
            'videoName': 'funnyBunny',
            'videoURL': 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
        },
        "videoList" : [
            {"videoId" : "1", "videoName" : "1-1线性表", 'videoURL': 'https://media.w3.org/2010/05/sintel/trailer.mp4'},
            {"videoId" : "2", "videoName" : "1-2线性表", 'videoURL': 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'},
            {"videoId" : "3", "videoName" : "2-1线性表", 'videoURL': 'https://media.w3.org/2010/05/sintel/trailer.mp4'},
            {"videoId" : "4", "videoName" : "2-2线性表", 'videoURL': 'https://media.w3.org/2010/05/sintel/trailer.mp4'},
            {"videoId" : "5", "videoName" : "2-3线性表", 'videoURL': 'https://media.w3.org/2010/05/sintel/trailer.mp4'},
            {"videoId" : "6", "videoName" : "2-4线性表", 'videoURL': 'https://media.w3.org/2010/05/sintel/trailer.mp4'},
            {"videoId" : "7", "videoName" : "2-5线性表", 'videoURL': 'https://media.w3.org/2010/05/sintel/trailer.mp4'},
            {"videoId" : "8", "videoName" : "2-6线性表", 'videoURL': 'https://media.w3.org/2010/05/sintel/trailer.mp4'},
            {"videoId" : "9", "videoName" : "1-1线性表", 'videoURL': 'https://media.w3.org/2010/05/sintel/trailer.mp4'},
            {"videoId" : "10", "videoName" : "1-2线性表", 'videoURL': 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'},
            {"videoId" : "11", "videoName" : "2-1线性表", 'videoURL': 'https://media.w3.org/2010/05/sintel/trailer.mp4'},
            {"videoId" : "12", "videoName" : "2-2线性表", 'videoURL': 'https://media.w3.org/2010/05/sintel/trailer.mp4'},
            {"videoId" : "13", "videoName" : "2-3线性表", 'videoURL': 'https://media.w3.org/2010/05/sintel/trailer.mp4'},
            {"videoId" : "14", "videoName" : "2-4线性表", 'videoURL': 'https://media.w3.org/2010/05/sintel/trailer.mp4'},
            {"videoId" : "15", "videoName" : "2-5线性表", 'videoURL': 'https://media.w3.org/2010/05/sintel/trailer.mp4'},
            {"videoId" : "16", "videoName" : "2-6线性表", 'videoURL': 'https://media.w3.org/2010/05/sintel/trailer.mp4'},
            {"videoId" : "17", "videoName" : "1-1线性表", 'videoURL': 'https://media.w3.org/2010/05/sintel/trailer.mp4'},
            {"videoId" : "18", "videoName" : "1-2线性表", 'videoURL': 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'},
            {"videoId" : "19", "videoName" : "2-1线性表", 'videoURL': 'https://media.w3.org/2010/05/sintel/trailer.mp4'},
            {"videoId" : "20", "videoName" : "2-2线性表", 'videoURL': 'https://media.w3.org/2010/05/sintel/trailer.mp4'},
            {"videoId" : "21", "videoName" : "2-3线性表", 'videoURL': 'https://media.w3.org/2010/05/sintel/trailer.mp4'},
            {"videoId" : "22", "videoName" : "2-4线性表", 'videoURL': 'https://media.w3.org/2010/05/sintel/trailer.mp4'},
            {"videoId" : "23", "videoName" : "2-5线性表", 'videoURL': 'https://media.w3.org/2010/05/sintel/trailer.mp4'},
            {"videoId" : "24", "videoName" : "2-6线性表", 'videoURL': 'https://media.w3.org/2010/05/sintel/trailer.mp4'},
        ],
        "courseDescribe" : "程序设计是一门基础课程。对于计算机相关专业而言，程序设计是专业基础知识，是进一步学习其他专业知识的第一步阶梯；对于非计算机专业而言，程序设计的学习有助于理解计算机的能力所在，理解哪些是计算机擅长解决的问题，怎样的方式方法是计算机擅长的手段，从而能更好地利用计算机来解决本专业领域内的问题",
        "courseChapter" : ["1-1线性表","1-1线性表","1-1线性表","1-1线性表","1-1线性表"],
    }
});

Mock.mock(RegExp('http://localhost:8888/concept/getConceptListByVideoId'), {
    'code': 200,
    'data': [
            {"conceptId": 1, "conceptName": '图卷积'},
            {"conceptId": 2, "conceptName": '图卷积'},
            {"conceptId": 3, "conceptName": '图卷积'},
            {"conceptId": 4, "conceptName": '图卷积'},
            {"conceptId": 5, "conceptName": '图卷积'},
            {"conceptId": 6, "conceptName": '图卷积'},
            {"conceptId": 7, "conceptName": '图卷积'},
            {"conceptId": 8, "conceptName": '图卷积'},
    ]
})

Mock.mock(RegExp('http://localhost:8888/course/getLastVideoIndex'), {
    'code': 200,
    'data': {
        'index': 1,
        'videoURL': 'https://media.w3.org/2010/05/sintel/trailer.mp4'
    }
})