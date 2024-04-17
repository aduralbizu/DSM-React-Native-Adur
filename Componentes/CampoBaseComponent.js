import React, { Component } from 'react';
import Calendario from './CalendarioComponent';
import { EXCURSIONES } from '../Comun/excursiones';

class CampoBase extends Component { // Esto significa que Campobase es un componente de React que hereda todas las funcionalidades de un componente de clase de React
    constructor(props) {
        super(props);//  Se define el constructor de lalase padre (Component) con props como argumento. Esto es necesario si quieres acceder a this.props dentro del constructor.
        this.state = { //this.state: estado del componente
            excursiones: EXCURSIONES //propiedad + VALOR proveniente de fichero JavaScript de la carpeta comun.
        };
    }

    render() { // En el contexto de React, el método render() es un método obligatorio en todos los componentes de clase. Es llamadp cada vez que el estado de una clase cambia
        // Este método es responsable de definir la estructura de la interfaz de usuario que el componente debe representar.
        // La estructura de la interfaz de usuario (UI) se refiere a la disposición y organización de los elementos visuales que componen una aplicación, página web o cualquier sistema interactivo con el que un usuario pueda interactuar.
        return (
            <Calendario excursiones={this.state.excursiones} />
        );
    }
}

export default CampoBase;