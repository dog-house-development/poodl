import axios from 'axios';
import _ from 'lodash';
import AuthActions from '../authActions';

/**
 * Action creator for getting errors
 * @param dispatch  {Function}  the action dispatcher
 * @param type      {String}    the type to create the action for
 * @param errors    {Object}    errors data to send in action payload
 */
export const getErrors = (dispatch, type, errors) => {
    // If unauthorized, logout
    if (errors.response.status === 401) {
        dispatch(AuthActions.logoutAdmin());
    }

    dispatch({
        type: type.ERROR,
        payload: errors.response.data
    });
};

export const ActionHelper = {
    /**
     * Action creator for creating a new doc
     * @param dispatch  {Function}  the action dispatcher
     * @param type      {Object}    the type to create the action for
     * @param data      {Object}    data for the new doc
     * @param onSuccess {Function}  callback for when creating is successful
     */
    create: async (dispatch, type, data, history, onSuccess = _.noop, onFail = _.noop) => {
        dispatch({ type: type.create.BEGIN });
        try {
            const res = await axios.post(`/api/${type.url}/`, data);

            dispatch({
                type: type.create.SUCCESS,
                payload: res.data
            });
            onSuccess(res);
            if (history) {
                history.push(`/${type.clientUrl || type.url}/${res.data._id}`);
            }
        } catch (err) {
            getErrors(dispatch, type, err);
            onFail(err);
        }
    },

    /**
     * Action creator for filtering docs
     * @param dispatch  {Function}  the action dispatcher
     * @param type      {String}    the type to create the action for
     * @param data      {Object}    data for the new doc
     */
    filter: async (dispatch, type, data = {}, onSuccess = _.noop, onFail = _.noop) => {
        dispatch({ type: type.filter.BEGIN });
        try {
            const res = await axios.post(`/api/${type.url}/filter`, data);
            dispatch({
                type: type.filter.SUCCESS,
                payload: res.data
            });
            onSuccess(res);
        } catch (err) {
            getErrors(dispatch, type, err);
            onFail(err);
        }
    },

    /**
     * Action creator for creating getting a single doc by id
     * @param dispatch  {Function}  the action dispatcher
     * @param type      {String}    the type to create the action for
     * @param id        {String}    id of the doc to retrieve
     * @param onFail {Function}  callback for when an error occurs
     */
    get: async (dispatch, type, id, onSuccess = _.noop, onFail = _.noop) => {
        dispatch({ type: type.get.BEGIN });
        try {
            const res = await axios.get(`/api/${type.url}/${id}`);
            dispatch({
                type: type.get.SUCCESS,
                payload: res.data
            });
            onSuccess(res);
        } catch (err) {
            getErrors(dispatch, type, err);
            onFail(err);
        }
    },

    /**
     * Action creator for editing an existing doc
     * @param dispatch  {Function}  the action dispatcher
     * @param type      {String}    the type to create the action for
     * @param id        {String}    id of the doc to edit
     * @param data      {Object}    data to modify the doc
     * @param onSuccess {Function}  callback for when creating is successful
     */
    edit: async (dispatch, type, id, data, onSuccess = _.noop, onFail = _.noop) => {
        dispatch({ type: type.edit.BEGIN });
        try {
            const res = await axios.patch(`/api/${type.url}/${id}`, data);
            dispatch({
                type: type.edit.SUCCESS,
                payload: res.data
            });
            onSuccess(res);
        } catch (err) {
            getErrors(dispatch, type, err);
            onFail(err);
        }
    },

    /**
     * Action creator for deleting an existing doc
     * @param dispatch  {Function}  the action dispatcher
     * @param type      {String}    the type to create the action for
     * @param id        {String}    id of the doc to delete
     * @param onSuccess {Function}  callback for when creating is successful
     */
    delete: async (dispatch, type, id, onSuccess = _.noop, onFail = _.noop) => {
        dispatch({ type: type.delete.BEGIN });
        try {
            const res = await axios.delete(`/api/${type.url}/${id}`);
            // Call on success before dispatch so the props are the same
            // and you can still use them inside of this function.
            onSuccess(res);
            dispatch({
                type: type.delete.SUCCESS,
                payload: res.data
            });
        } catch (err) {
            getErrors(dispatch, type, err);
            onFail(err);
        }
    }
};

export const getDefaultActions = type => {
    return {
        create: (data, history, onSuccess, onFail) => dispatch => {
            return ActionHelper.create(dispatch, type, data, history, onSuccess, onFail);
        },

        filter: (data, onSuccess, onFail) => dispatch => {
            return ActionHelper.filter(dispatch, type, data, onSuccess, onFail);
        },

        get: (id, onSuccess, onFail) => dispatch => {
            return ActionHelper.get(dispatch, type, id, onSuccess, onFail);
        },

        edit: (id, data, onSuccess, onFail) => dispatch => {
            return ActionHelper.edit(dispatch, type, id, data, onSuccess, onFail);
        },

        delete: (id, onSuccess, onFail) => dispatch => {
            return ActionHelper.delete(dispatch, type, id, onSuccess, onFail);
        }
    };
};
