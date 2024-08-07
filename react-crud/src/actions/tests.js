import {
    CREATE_TEST,
    RETRIEVE_TESTS,
    UPDATE_TEST,
    DELETE_TEST
} from "./types";

import TestService from "../services/TestService"; 

export const createTest = (scenario, test, orig, agr, cat, n_ugts, objet_du_test) => async (dispatch) => {
    try {
      const res = await TestService.create({ scenario, test, orig, agr, cat, n_ugts, objet_du_test});
  
      dispatch({
        type: CREATE_TEST,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
};

export const retrieveTests = () => async (dispatch) => {
    try {
      const res = await TestService.getAll();
  
      dispatch({
        type: RETRIEVE_TESTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
};

export const updateTest = (id, data) => async (dispatch) => {
    try {
      const res = await TestService.update(id, data);
  
      dispatch({
        type: UPDATE_TEST,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
};

export const deleteTest = (id) => async (dispatch) => {
    try {
      await TestService.remove(id);
  
      dispatch({
        type: DELETE_TEST,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
};

export const findTestsByTitle = (scenario) => async (dispatch) => {
    try {
      const res = await TestService.findByTitle(scenario);
  
      dispatch({
        type: RETRIEVE_TESTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
};

