import axios from "axios";
import {
  FRIEND_GET_SUCCESS,
  MESSAGE_GET_SUCCESS,
  MESSAGE_SEND_SUCCESS,
  SEEN_MESSAGE,
  THEME_GET_SUCCESS,
  THEME_SET_SUCCESS,
} from "../types/messengerType";
import { url } from "../../config";

export const getToken = async () => {
  const getToken = await localStorage.getItem("authToken");
  const token = JSON.parse(getToken);
  return token.token;

  //  return getToken
};

export const getFriends = (id) => async (dispatch) => {
  try {
    let token = await getToken();
    const response = await axios.get(`${url}/api/user/chatAllUsers`, {
      headers: {
        authorization: token,
      },
    });
    if (response) {
      console.log(response, "response===>");
      dispatch({
        type: FRIEND_GET_SUCCESS,
        payload: {
          friends: response?.data,
        },
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

export const messageSend = (data) => async (dispatch) => {
  try {
    let token = await getToken();
    const response = await axios.post(`${url}/api/message`, data, {
      headers: {
        authorization: token,
      },
    });
    dispatch({
      type: MESSAGE_SEND_SUCCESS,
      payload: {
        message: response.data,
      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getMessage = (id) => {
  return async (dispatch) => {
    try {
      let token = await getToken();
      const response = await axios.get(`${url}/api/message/${id}`, {
        headers: {
          authorization: token,
        },
      });

      dispatch({
        type: MESSAGE_GET_SUCCESS,
        payload: {
          message_get_success: true,
          message: response?.data?.data,
        },
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const markMessageAsSeen = (messageId) => {
  return async (dispatch) => {
    try {
      const token = await getToken();
      const response = await axios.post(
        `${url}/api/seen-message`,
        { messageId },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch({
        type: SEEN_MESSAGE,
        payload: {
          seen_message: true,
          message: response?.data?.data,
        },
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};
