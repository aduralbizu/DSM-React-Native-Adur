import { configureStore } from '@reduxjs/toolkit'
import { excursiones } from './excursiones';
import { comentarios } from './comentarios';
import { cabeceras } from './cabeceras';
import { actividades } from './actividades';
import thunk from 'redux-thunk';
import { favoritos } from './favoritos';


export const ConfigureStore = () => { //Esta función encargada de combinar los cuatro reducers. será la responsable de crear el store de nuestro Redux y de combinar los cuatro reducers. Además, también asociará a dicho store el middleware que emplearemos en nuestro Redux: Thunk
    const store = configureStore({ // Dentro de la función ConfigureStore, se utiliza la función configureStore para crear el store de Redux
        reducer: {
            excursiones: excursiones,
            comentarios: comentarios,
            cabeceras: cabeceras,
            actividades: actividades,
            favoritos: favoritos
        }, //  Este es el objeto de configuración que se pasa a configureStore. En él, se especifica un objeto reducer, que asigna cada reducer individual a una clave correspondiente.
    });

    return store;
}