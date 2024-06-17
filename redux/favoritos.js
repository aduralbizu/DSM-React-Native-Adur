import * as ActionTypes from './ActionTypes';

export const favoritos = (state = { favoritos: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITO:

            if (state.favoritos.includes(action.payload)) return state
            else return {...state,  favoritos: [...state.favoritos, action.payload]};

        default:
            return state;
    }
};

// Hacer { ...state, isLoading: false } en el contexto de un reducer de Redux significa crear una nueva versión del estado actual, pero con la propiedad isLoading actualizada a false.

// state = { favoritos: [] }:
// Esto proporciona un estado inicial por defecto si no se proporciona un estado anterior

