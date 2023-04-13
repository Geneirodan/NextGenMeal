import {del, get, patch, post} from "./api";

let controller = 'Account';
export const authAPI = {

    info: async () =>
        await get(`${controller}/Info`),

    role: async () =>
        await get(`${controller}/Role`),

    login: async (email, password) =>
        await post(`${controller}/Login`, {email, password}),

    logout: async () =>
        await del(`${controller}/Logout`),

    register: async (name, email, password, confirmPassword) =>
        await post(`${controller}/Register`, {name, email, password, confirmPassword}, {callbackUrl: "/register/confirm"}),

    confirmEmail: async (id, code) =>
        await get(`${controller}/Info`, {id, code}),

    delete: async () =>
        await del(`${controller}/Delete`),

    changeName: async name => await patch(`${controller}/ChangeName`, {name}),

    forgotPassword: async (email, callbackUrl) =>
        await post(`${controller}/ForgotPassword`, {email}, {callbackUrl}),

    resetPassword: async (email, password, confirmPassword, code) =>
        await post(`${controller}/ResetPassword`, {email, password, confirmPassword, code}),

    changePassword: async (oldPassword, newPassword, confirmPassword) =>
        await post(`${controller}/ChangePassword`, {oldPassword, newPassword, confirmPassword}),

}
