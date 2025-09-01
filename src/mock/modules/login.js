import Mock from "mockjs"
Mock.mock('http://localhost:8888/account/login', {
    "ret" : 0,
    "code": 200,
    "message": 'response接收到了',
    "token": 5000,
    "data": {
        
    }
});

Mock.mock('http://localhost:8888/account/signup', {
    "ret" : 0,
    "code": 200,
    "data": {
    }
});

Mock.mock('http://localhost:8888/captcha/signupEmailCaptcha', {
    "ret" : 0,
    "code": 200,
    "data": {

    }
});

Mock.mock('http://localhost:8888/captcha/resetPasswordEmailCaptcha', {
    "ret" : 0,
    "code": 200,
    "data": {

    }
});

Mock.mock('http://localhost:8888/user/sendPhone', {
    "ret" : 0,
    "code": 200,
    "data": {

    }
});

Mock.mock('http://localhost:8888/user/verifyEmail', {
    "ret" : 0,
    "code": 200,
    "data": {
        "token": 5000,

        "isCommonUser": true,
    }
});

Mock.mock('http://localhost:8888/user/verifyPhone', {
    "ret" : 0,
    "code": 200,
    "data": {
        "token": 5000,

        "isCommonUser": true,
    }
});

Mock.mock('http://localhost:8888/user/updatePassword', {
    "ret" : 0,
    "code": 200,
    "data": {

    }
});