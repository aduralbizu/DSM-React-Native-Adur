import React, { Component } from 'react';
import Calendario from './CalendarioComponent';
import { EXCURSIONES } from '../Comun/excursiones';
import DetalleExcursion from './DetalleExcursionComponent';
import { View } from 'react-native';

class CampoBase extends Component { // Esto significa que Campobase es un componente de React que hereda todas las funcionalidades de un componente de clase de React
    constructor(props) {
        super(props);//  Se define el constructor de lalase padre (Component) con props como argumento. Esto es necesario si quieres acceder a this.props dentro del constructor.
        this.state = { //this.state: estado del componente
            excursiones: EXCURSIONES, //propiedad + VALOR proveniente de fichero JavaScript de la carpeta comun.
            seleccionExcursion: null // Se ha creado una nueva variable de estado: seleccionExcursion. Su objetivo es almacenar el identificador de la excursión que se desea renderizar
        };
    }

    onSeleccionExcursion(excursionId) { //Esta función se llama desde dentro de la función onPress. Actualiza el estado, específicamente, seleccionExcursion.
        this.setState({ seleccionExcursion: excursionId }) 
    }

    render() { // En el contexto de React, el método render() es un método obligatorio en todos los componentes de clase. Es llamadp cada vez que el estado de una clase cambia
        // Este método es responsable de definir la estructura de la interfaz de usuario que el componente debe representar.
        // La estructura de la interfaz de usuario (UI) se refiere a la disposición y organización de los elementos visuales que componen una aplicación, página web o cualquier sistema interactivo con el que un usuario pueda interactuar.
        return (
            <View>
                <DetalleExcursion excursion={this.state.excursiones.filter((excursion)=> excursion.id === this.state.seleccionExcursion)[0]}></DetalleExcursion>
                <Calendario excursiones={this.state.excursiones} onPress = {(excursionId) => this.onSeleccionExcursion(excursionId)}/>
            </View>

        );
    }
}

//Onpress es la función que recibe el calendario. A pesar de ser un nombre en inglés, el nombre podría ser cualquiera.
//Es necesario incorporar un View que englobe los dos componentes dentro de la función return
//Un componente View es un elemento rectangular sin estilo propio que actúa como un contenedor flexible para otros componentes, como texto, imágenes, botones, etc. Puedes pensar en él como un contenedor invisible que ayuda a organizar y posicionar otros elementos en la pantalla de la aplicación.

export default CampoBase;