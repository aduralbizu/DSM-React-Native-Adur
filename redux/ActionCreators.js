import * as ActionTypes from './ActionTypes';
import { baseUrl, baseUrlComentarios } from '../Comun/comun';

// Finalmente, en el fichero ActionCreators.js implementaremos las funciones (Thunk) y las
// acciones que darán respuesta a los requerimientos de nuestra aplicación. Por ahora, lo 
// único que vamos a hacer es crear las funciones que realizaran el “fetching” de los datos 
// desde nuestra interfaz REST API. Dichas funciones tendrán una implementación basada 
// en “promises” haciendo uso del dispatch().


// las funciones thunks se utilizan para crear acciones asíncronas o acciones complejas que necesitan
//  realizar operaciones asíncronas antes de despachar una acción estándar.

// export const fetchComentarios = () => (dispatch) => { // a fetchComentarios que se utiliza para realizar una solicitud HTTP para obtener comentarios de una URL específica 
//     return fetch(baseUrlComentarios + 'comentarios.json') //.json, importante
//         .then(response => {
//            //console.log(response);
//             if (response.ok) {
//                 return response;
//             } else {
//                 var error = new Error('Error ' + response.status + ': ' + response.statusText);
//                 error.response = response;
//                 throw error;
//             }
//         },
//             error => {
//                 var errmess = new Error(error.message);
//                 throw errmess;
//             })
//         .then(response => response.json())
//         .then(comentarios => dispatch(addComentarios(comentarios))) // comentarios es el JSON obtenido de la respuesta de la solicitud HTTP. Se obtendra después de que la promesa encargada de convertir a json sea devuelta
            
//         .catch(error => dispatch(comentariosFailed(error.message)));
// };



export const fetchComentarios = () => (dispatch) => { // a fetchComentarios que se utiliza para realizar una solicitud HTTP para obtener comentarios de una URL específica 
    return fetch(baseUrlComentarios + 'comentarios.json') //.json, importante
        .then(response => {
           //console.log(response);
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(comentarios => {
            // Convierte el objeto de comentarios en un array para manejarlo fácilmente
            const comentariosArray = Object.keys(comentarios).map(key => ({ // evitar problemas cuando indice en firebase no es 0,1,2.. y es el que genera automaticamente con axios.post
                id: key,
                ...comentarios[key]
            }));
            dispatch(addComentarios(comentariosArray)); // comentarios es el JSON obtenido de la respuesta de la solicitud HTTP. Se obtendra después de que la promesa encargada de convertir a json sea devuelta

        })
            
            
        .catch(error => dispatch(comentariosFailed(error.message)));
};
//función doblemente anidada para no tener que pasar dispatch como argumento

// Una vez que se obtienen los comentarios (en formato JSON), se despacha una acción de Redux utilizando dispatch()

// Se encadenan dos funciones then() para manejar la respuesta de la solicitud. La primera función then() verifica si la respuesta de la solicitud es exitosa (código de estado 200). Si la respuesta es exitosa, se devuelve la respuesta. Si no lo es, se genera un nuevo error con detalles sobre el error de la solicitud. Este error se lanza usando throw, lo que provocará que la promesa se rechace y se pase al siguiente catch().
// Parseo de la respuesta: Después de que se obtiene la respuesta exitosa, se utiliza otra función then() para parsear la respuesta como JSON utilizando response.json().

// En el contexto de Redux, "despachar" una acción significa enviar esa acción al store de Redux para que sea procesada por los reducers y, en consecuencia, actualice el estado de la aplicación.
// Cuando hago dispatch, iré a los reducers

// Las acciones son objetos responsables de proporcionar información a los 

// reducers para que actúen en base a ellas:

export const comentariosFailed = (errmess) => ({
    type: ActionTypes.COMENTARIOS_FAILED,
    payload: errmess
});

export const addComentarios = (comentarios) => ({
    type: ActionTypes.ADD_COMENTARIOS,
    payload: comentarios
}); //La función flecha devuelve un objeto, no hace falta poner return

export const fetchExcursiones = () => (dispatch) => {

    dispatch(excursionesLoading());

    return fetch(baseUrl + 'excursiones')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(excursiones => dispatch(addExcursiones(excursiones)))
        .catch(error => dispatch(excursionesFailed(error.message)));
};

export const excursionesLoading = () => ({
    type: ActionTypes.EXCURSIONES_LOADING
});

export const excursionesFailed = (errmess) => ({
    type: ActionTypes.EXCURSIONES_FAILED,
    payload: errmess
});

export const addExcursiones = (excursiones) => ({
    type: ActionTypes.ADD_EXCURSIONES,
    payload: excursiones
});

export const fetchCabeceras = () => (dispatch) => {

    dispatch(cabecerasLoading());

    return fetch(baseUrl + 'cabeceras')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(cabeceras => dispatch(addCabeceras(cabeceras)))
        .catch(error => dispatch(cabecerasFailed(error.message)));
};

export const cabecerasLoading = () => ({
    type: ActionTypes.CABECERAS_LOADING
});

export const cabecerasFailed = (errmess) => ({
    type: ActionTypes.CABECERAS_FAILED,
    payload: errmess
});

export const addCabeceras = (cabeceras) => ({
    type: ActionTypes.ADD_CABECERAS,
    payload: cabeceras
});

export const fetchActividades = () => (dispatch) => {

    dispatch(actividadesLoading());

    return fetch(baseUrl + 'actividades')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(actividades => dispatch(addActividades(actividades)))
        .catch(error => dispatch(actividadesFailed(error.message)));
};

export const actividadesLoading = () => ({
    type: ActionTypes.ACTIVIDADES_LOADING
});

export const actividadesFailed = (errmess) => ({
    type: ActionTypes.ACTIVIDADES_FAILED,
    payload: errmess
});

export const addActividades = (actividades) => ({
    type: ActionTypes.ADD_ACTIVIDADES,
    payload: actividades
});

export const postFavorito = (excursionId) => (dispatch) => {
    setTimeout(() => {
        dispatch(addFavorito(excursionId)); 
    }, 2000);
};

// La función postFavorito() (la cual es una función Thunk) se limita a introducir un 
// retardo de dos segundos, para “simular” la comunicación con el servidor, para,
// a continuación, despachar la función addFavorito que será la encargada de 
// devolver la acción de tipo ADD_FAVORITO


export const addFavorito = (excursionId) => ({
    type: ActionTypes.ADD_FAVORITO,
    payload: excursionId
});

export const postComentario = (excursionId, valoracion, autor, comentario) => (dispatch) => {
    let dia = new Date().toString();
    console.log(excursionId, valoracion, autor, comentario, dia);
    setTimeout(() => {
        dispatch(addComentario(excursionId, valoracion, autor, comentario, dia));
    }, 2000);
};
export const addComentario = (excursionId, valoracion, autor, comentario, dia) => ({
    type: ActionTypes.ADD_COMENTARIO,
    payload: {
        excursionId: excursionId,
        valoracion: valoracion,
        comentario: comentario,
        autor: autor,
        dia: dia
    }
});
