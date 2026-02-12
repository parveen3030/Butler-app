import {
	CHANGE_PHONE_NUMBER,
	PHONE_VERIFICATION_CODE,
	VERIFY_OTP,
} from "./endpoints";
import { getRequest, postRequest, putRequest } from "./api";
import { handleError } from "../utils/error";
import { store } from "../redux/store";
import { API_ENDPOINT } from "../config";

export async function phoneVerificationCode(phoneNumber) {
	const postBody = {
		phone: phoneNumber, //"+923418720671",
	};
	return new Promise(async (resolve, reject) => {
		try {
			const response = await postRequest(PHONE_VERIFICATION_CODE, postBody);
			console.log("response is", postBody, response);
			//   const responseData = response.data;
			//   resolve(responseData);
			resolve(true);
		} catch (error) {
			console.log("phone numberrrr", error);
			handleError(error?.response?.data || "");
			reject(error?.response?.data || "");
		}
	});
}
export async function changePhoneNumber({ phoneNumber, id }) {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	var raw = JSON.stringify({
		id: id,
		phone: phoneNumber,
	});
	var requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};
	return fetch(`${API_ENDPOINT}user/change-phone`, requestOptions).then(
		(response) => response.text(),
	);
}

export async function sendPhoneOtp({ otp, id }) {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${store.getState().auth.token}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		id: id,
		otp: otp,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(`${API_ENDPOINT}user/verify-otp`, requestOptions).then(
		(response) => response.text(),
	);
}

export async function verifyOTP(code) {
	const postBody = {
		otp: code,
	};

	console.log("verifyOTP postBody is", postBody);
	return new Promise(async (resolve, reject) => {
		try {
			const response = await postRequest(VERIFY_OTP, postBody);
			console.log("response is", response);

			resolve(response);
		} catch (error) {
			console.log("errrrr varification", error);
			handleError(error?.response?.data || "");
			reject(error?.response?.data || "");
		}
	});
}
export async function forgotPassword(email) {
	const postBody = {
		email: email,
	};
	console.log("=====", postBody);
	return new Promise(async (resolve, reject) => {
		try {
			const response = await postRequest("user/forget-password", postBody);
			resolve(response);
		} catch (error) {
			handleError(error?.response?.data || "");
			reject(error?.response?.data || "");
		}
	});
}
export async function newPassword(token, password) {
	const postBody = {
		token: token,
		password: password,
	};
	return new Promise(async (resolve, reject) => {
		try {
			const response = await postRequest(
				"user/reset-password-after-forget",
				postBody,
			);
			resolve(response);
		} catch (error) {
			handleError(error?.response?.data || "");
			reject(error?.response?.data || "");
		}
	});
}
