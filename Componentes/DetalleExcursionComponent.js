import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from '@rneui/themed';
import { EXCURSIONES } from '../Comun/excursiones';
import { StyleSheet } from 'react-native';

function RenderExcursion(props) {

    const excursion = props.excursion;

    if (excursion != null) {
        return (
            <Card>
                <Card.Divider />
                <View style={styles.textoContainer}>
                    <Text style={styles.titulo}>{excursion.nombre}</Text>
                </View>
                <Card.Image source={require('./imagenes/40Años.png')}></Card.Image>
                <Text style={{ margin: 20 }}>
                    {excursion.descripcion}
                </Text>
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

//Cards are a great way to display information, usually containing content and actions about a single subject. 
//These actions could include things like buttons to click, links to follow, or options to interact with the content in some way. 

//Card.Divider Add divider to the card which acts as a separator between elements. This, Receives all Divider props.

class DetalleExcursion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES
        };
    }
  
    render(){
        const {excursionId} = this.props.route.params;
        return(<RenderExcursion excursion={this.state.excursiones[+excursionId]} />);
    }
}

const styles = StyleSheet.create({
    titulo: {
        color: 'chocolate',
        fontSize: 30,
        fontWeight: 'bold',
        padding: 5,
        zIndex: 1, // Asegura que el texto esté sobre la imagen
    },
    textoContainer: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center', // Centra horizontalmente
    }
});

export default DetalleExcursion;


