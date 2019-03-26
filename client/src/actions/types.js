export default {
    auth: {
        SET_CURRENT_ADMIN: 'SET_CURRENT_ADMIN',
        login: {
            SUCCESS: 'LOGIN_ADMIN_SUCCESS'
        },
        logout: {
            SUCCESS: 'LOGOUT_ADMIN_SUCCESS'
        },
        ERROR: 'GET_AUTH_ERRORS'
    },
    admin: {
        url: 'admins',
        create: {
            BEGIN: 'CREATE_ADMIN_BEGIN',
            SUCCESS: 'CREATE_ADMIN_SUCCESS'
        },
        filter: {
            BEGIN: 'FILTER_ADMINS_BEGIN',
            SUCCESS: 'FILTER_ADMINS_SUCCESS'
        },
        get: {
            BEGIN: 'GET_ADMIN_BEGIN',
            SUCCESS: 'GET_ADMIN_SUCCESS'
        },
        edit: {
            BEGIN: 'EDIT_ADMIN_BEGIN',
            SUCCESS: 'EDIT_ADMIN_SUCCESS'
        },
        delete: {
            BEGIN: 'DELETE_ADMIN_BEGIN',
            SUCCESS: 'DELETE_ADMIN_SUCCESS'
        },
        ERROR: 'GET_ADMIN_ERRORS'
    },
    volunteer: {
        url: 'admins',
        clientUrl: 'volunteers',
        create: {
            BEGIN: 'CREATE_VOLUNTEER_BEGIN',
            SUCCESS: 'CREATE_VOLUNTEER_SUCCESS'
        },
        filter: {
            BEGIN: 'FILTER_VOLUNTEERS_BEGIN',
            SUCCESS: 'FILTER_VOLUNTEERS_SUCCESS'
        },
        get: {
            BEGIN: 'GET_VOLUNTEER_BEGIN',
            SUCCESS: 'GET_VOLUNTEER_SUCCESS'
        },
        edit: {
            BEGIN: 'EDIT_VOLUNTEER_BEGIN',
            SUCCESS: 'EDIT_VOLUNTEER_SUCCESS'
        },
        delete: {
            BEGIN: 'DELETE_VOLUNTEER_BEGIN',
            SUCCESS: 'DELETE_VOLUNTEER_SUCCESS'
        },
        ERROR: 'GET_VOLUNTEER_ERRORS'
    },
    member: {
        url: 'members',
        create: {
            BEGIN: 'CREATE_MEMBER_BEGIN',
            SUCCESS: 'CREATE_MEMBER_SUCCESS'
        },
        filter: {
            BEGIN: 'FILTER_MEMBERS_BEGIN',
            SUCCESS: 'FILTER_MEMBERS_SUCCESS'
        },
        get: {
            BEGIN: 'GET_MEMBER_BEGIN',
            SUCCESS: 'GET_MEMBER_SUCCESS'
        },
        edit: {
            BEGIN: 'EDIT_MEMBER_BEGIN',
            SUCCESS: 'EDIT_MEMBER_SUCCESS'
        },
        delete: {
            BEGIN: 'DELETE_MEMBER_BEGIN',
            SUCCESS: 'DELETE_MEMBER_SUCCESS'
        },
        ERROR: 'GET_MEMBER_ERRORS'
    },
    activity: {
        url: 'activities',
        create: {
            BEGIN: 'CREATE_ACTIVITY_BEGIN',
            SUCCESS: 'CREATE_ACTIVITY_SUCCESS'
        },
        filter: {
            BEGIN: 'FILTER_ACTIVITIES_BEGIN',
            SUCCESS: 'FILTER_ACTIVITIES_SUCCESS'
        },
        get: {
            BEGIN: 'GET_ACTIVITY_BEGIN',
            SUCCESS: 'GET_ACTIVITY_SUCCESS'
        },
        edit: {
            BEGIN: 'EDIT_ACTIVITY_BEGIN',
            SUCCESS: 'EDIT_ACTIVITY_SUCCESS'
        },
        delete: {
            BEGIN: 'DELETE_ACTIVITY_BEGIN',
            SUCCESS: 'DELETE_ACTIVITY_SUCCESS'
        },
        ERROR: 'GET_ACTIVITY_ERRORS'
    }
};
