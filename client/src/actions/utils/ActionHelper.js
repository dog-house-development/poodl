import axios from 'axios';
import _ from 'lodash';

/**
 * Action creator for getting errors
 * @param dispatch  {Function}  the action dispatcher
 * @param type      {String}    the type to create the action for
 * @param errors    {Object}    errors data to send in action payload
 */
const getErrors = (dispatch, type, errors) => {
    dispatch({
        type: type.ERROR,
        payload: errors.response.data
    });
};

export default {
    /**
     * Action creator for creating a new doc
     * @param dispatch  {Function}  the action dispatcher
     * @param type      {String}    the type to create the action for
     * @param data      {Object}    data for the new doc
     * @param redirect  {boolean}   redirect to the page for the newly created doc
     */
    create: (dispatch, type, data, history, onSuccess = _.noop) => {
        dispatch({ type: type.create.BEGIN });
        axios
            .post(`/api/${type.url}/`, data)
            .then(res => {
                dispatch({
                    type: type.create.SUCCESS,
                    payload: res.data
                });
                onSuccess();
                if (history) {
                    history.push(`/${type.clientUrl || type.url}/${res.data._id}`);
                }
                return res.data;
            })
            .catch(err => getErrors(dispatch, type, err));
    },

    /**
     * Action creator for filtering docs
     * @param dispatch  {Function}  the action dispatcher
     * @param type      {String}    the type to create the action for
     * @param data      {Object}    data for the new doc
     */
    filter: (dispatch, type, data = {}) => {
        dispatch({ type: type.filter.BEGIN });
        axios
            .post(`/api/${type.url}/filter`, data)
            .then(res => {
                dispatch({
                    type: type.filter.SUCCESS,
                    payload: res.data
                });
                return res.data;
            })
            .catch(err => getErrors(dispatch, type, err));
    },

    /**
     * Action creator for creating getting a single doc by id
     * @param dispatch  {Function}  the action dispatcher
     * @param type      {String}    the type to create the action for
     * @param id        {String}    id of the doc to retrieve
     */
    get: (dispatch, type, id) => {
        dispatch({ type: type.get.BEGIN });
        axios
            .get(`/api/${type.url}/${id}`)
            .then(res => {
                dispatch({
                    type: type.get.SUCCESS,
                    payload: res.data
                });
                return res.data;
            })
            .catch(err => getErrors(dispatch, type, err));
    },

    /**
     * Action creator for editing an existing doc
     * @param dispatch  {Function}  the action dispatcher
     * @param type      {String}    the type to create the action for
     * @param id        {String}    id of the doc to edit
     * @param data      {Object}    data to modify the doc
     */
    edit: (dispatch, type, id, data, onSuccess = _.noop) => {
        dispatch({ type: type.edit.BEGIN });
        axios
            .patch(`/api/${type.url}/${id}`, data)
            .then(res => {
                dispatch({
                    type: type.edit.SUCCESS,
                    payload: res.data
                });

                onSuccess();
            })
            .catch(err => getErrors(dispatch, type, err));
    },

    /**
     * Action creator for deleting an existing doc
     * @param dispatch  {Function}  the action dispatcher
     * @param type      {String}    the type to create the action for
     * @param id        {String}    id of the doc to delete
     */
    delete: (dispatch, type, id, onSuccess = _.noop) => {
        dispatch({ type: type.delete.BEGIN });
        axios
            .delete(`/api/${type.url}/${id}`)
            .then(res => {
                dispatch({
                    type: type.delete.SUCCESS,
                    payload: res.data
                });

                onSuccess();
            })
            .catch(err => getErrors(dispatch, type, err));
    }
};
