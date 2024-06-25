import React, { Component } from 'react';
import { Text, ScrollView, View, Linking } from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { CONTACTO } from '../Comun/contacto';

import * as MailComposer from "expo-mail-composer";



class ContactoComponent extends Component {

    constructor(props) {
        super(props); // En el contexto de React, super(props) se utiliza en el constructor de una clase que extiende de React.Component para llamar al constructor del componente padre con las props proporcionadas. Esto es necesario si estás escribiendo un constructor en una clase que hereda de React.Component y deseas acceder a this.props dentro del constructor.
        this.state = {
            contacto: CONTACTO
        };
    }

    handleEmailPress = () => {
        // const { email } = this.state.contacto;
        MailComposer.composeAsync({
            recipients: ["gaztaroa@gaztaroa.com"],
            subject: 'Info Gaztaroa',
            body: 'Escribe aquí cualquier duda...'
        }).then(result => {
            if (result.status === 'sent') {
                console.log('Email enviado');
            } else {
                console.log('Se canceló el envío');
            }
        }).catch(error => console.log('Error al enviar el correo', error));
    };

    handlePhonePress = () => {
        const phoneNumber = 'tel:+34 948 277151'; // Reemplaza con el número de teléfono deseado
        Linking.openURL(phoneNumber).catch(error => console.log('Error al abrir la aplicación de teléfono', error));
    };

    render() {

        const item = this.state.contacto;

        return ( // En el desarrollo de aplicaciones móviles utilizando React Native, <ScrollView> es un componente que proporciona una vista desplazable que puede contener una lista de elementos o contenido que no cabe completamente en la pantalla. Permite al usuario desplazarse verticalmente a través del contenido que contiene.
            <ScrollView>
                <Card>
                    <Card.Title>{item.nombre}</Card.Title>
                    <Card.Divider />
                    <Text style={{ margin: 20 }}>
                        {item.descripcion}
                    </Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                    <Icon
                        name='email'
                        type='material'
                        color='red'
                        onPress={this.handleEmailPress}
                    />

                    <Icon
                        name='phone'
                        type='material'
                        color='#517fa4'
                        onPress={this.handlePhonePress}
                    />
                </View>
                </Card>
            </ScrollView>
        ); //Filter: Estoy eligiendo el primer destacado para cada caso
    }
}

export default ContactoComponent;