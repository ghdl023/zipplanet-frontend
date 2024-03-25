import { defaultInstance } from "../core";

/**
 * 메일 인증
 * @param {*} param
 * @returns
 */
export const mailSend = async (params) => {
    try {
        const {data} = await defaultInstance.post('api/mail/sendMail', params);
        return data;
    } catch (e) {
        console.log(e);
    }
};