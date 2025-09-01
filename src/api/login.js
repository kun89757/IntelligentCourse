import http from "./http";

export const loginApi = data  => {
    console.log(data);
    return http('post', '/account/login', data);
}

export const registerApi = data => {
    console.log(data);
    return http ('post', '/account/signup', data)
}

export const sendCodeApi = data => {
    console.log(data);
    return http ('get', '/captcha/signupEmailCaptcha', data)
}

export const updatePasswordApi = data => {
    console.log(data);
    return http('post', '/account/resetPassword', data);
}

export const verifyCodeApi = data => {
    console.log(data);
    return http('post', '/account/checkResetPasswordVercode', data);
}

export const sendEmailApi = data => {
    console.log(data);
    return http ('get', '/captcha/loginEmailCaptcha', data)
}

export const sendPhoneApi = data => {
    console.log(data);
    return http ('post', '/user/sendPhone', data)
}

export const verifyEmailApi = data => {
    console.log(data);
    return http('post', '/account/loginByEmail', data);
}

export const verifyPhoneApi = data => {
    console.log(data);
    return http('post', '/user/verifyPhone', data);
}

export const logoutApi = () => {
    return http('post', '/account/logout');
}

export const resetPasswordEmailCaptchaApi = (data) => {
    return http('get', '/captcha/resetPasswordEmailCaptcha', data);
}