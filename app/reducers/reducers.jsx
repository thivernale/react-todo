var uuid = require('node-uuid');
var moment = require('moment');

export var searchTextReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_SEARCH_TEXT':
            return action.searchText;
        default:
            return state;
    };
};

export var showCompletedReducer = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE_SHOW_COMPLETED':
            return !state;
        default:
            return state;
    }
};

export var todosReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                action.todo
            ];
        case 'UPDATE_TODO':
            return state.map((a) => {
                if (a.id === action.id) {
                    return {
                        ...a,
                        ...action.updates
                    };
                } else {
                    return a;
                }
            });
        case 'TOGGLE_EDIT':
            return state.map((a) => {
                if (a.id === action.id) {
                    return {
                        ...a,
                        edit: action.edit
                    };
                } else {
                    return a;
                }
            });
        case 'SET_EDIT_TEXT':
            return state.map((a) => {
                if (a.id === action.id) {
                    return {
                        ...a,
                        text: action.text
                    };
                } else {
                    return a;
                }
            });
        case 'DELETE_TODO':
            return state.filter((a) => {
                return a.id !== action.id;
            });
        case 'ADD_TODOS':
            return [
                ...state,
                ...action.todos
            ];
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
};

export var authReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                uid: action.uid
            };
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};
