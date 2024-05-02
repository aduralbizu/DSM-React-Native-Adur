import * as ActionTypes from './ActionTypes'; //Importo todo del fichero.

export const actividades = (//  Este es el reducer encargado de manejar el estado relacionado con las actividades en la aplicación
                                    state  = { isLoading: true, 
                                    errMess: null,
                                    actividades:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_ACTIVIDADES:
        return {...state, isLoading: false, errMess: null, actividades: action.payload}; // {...state}: Esto crea una copia superficial (shallow copy) del objeto state. Es decir, se crea un nuevo objeto que tiene todas las mismas propiedades y valores que el objeto state original. spués de copiar todas las propiedades del objeto state, se añaden o actualizan algunas propiedades específicas.
        // En una shallow copy, solo se copian las referencias a los objetos internos, no los objetos en sí.
        case ActionTypes.ACTIVIDADES_LOADING:
            return {...state, isLoading: true, errMess: null, actividades: []}

        case ActionTypes.ACTIVIDADES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
    }
};

// Recordemos que la función de los reducers es modificar el estado de nuestra aplicación, a partir de la acción que se realice.

// Dichos reducers se construyen empleando un 
// procedimiento estándar, en el que se identifica el tipo de acción a la que se pretende 
// dar respuesta, mediante un CASE, para posteriormente actualizar y devolver el estado 
// de la aplicación

// Como vemos, mediante un switch/case se identifica el tipo de acción a realizar, para 
// posteriormente devolver (return) el estado (state) con los valores apropiados en función 
// del tipo de acción a realizar. En definitiva, el reducer es el encargado de actualizar el 
// estado de la aplicación, a partir de la acción que recibe.