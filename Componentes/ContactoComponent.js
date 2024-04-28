import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from '@rneui/themed';
import { EXCURSIONES } from '../Comun/excursiones';
import { CABECERAS } from '../Comun/cabeceras';
import { ACTIVIDADES } from '../Comun/actividades';
import { CONTACTO } from '../Comun/contacto';


class ContactoComponent extends Component {

    constructor(props) {
        super(props); // En el contexto de React, super(props) se utiliza en el constructor de una clase que extiende de React.Component para llamar al constructor del componente padre con las props proporcionadas. Esto es necesario si estás escribiendo un constructor en una clase que hereda de React.Component y deseas acceder a this.props dentro del constructor.
        this.state = {
            contacto:CONTACTO
        };
    }

    render() {

        const item = this.state.contacto;

        return ( // En el desarrollo de aplicaciones móviles utilizando React Native, <ScrollView> es un componente que proporciona una vista desplazable que puede contener una lista de elementos o contenido que no cabe completamente en la pantalla. Permite al usuario desplazarse verticalmente a través del contenido que contiene.
            <ScrollView>
                <Card>
                    <Card.Title>{item.nombre}</Card.Title>
                    <Card.Divider/>
                    <Text style={{margin: 20}}>
                        {item.descripcion}
                    </Text>
                </Card>
            </ScrollView>
        ); //Filter: Estoy eligiendo el primer destacado para cada caso
    }
}

export default ContactoComponent;