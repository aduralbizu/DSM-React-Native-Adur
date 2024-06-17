import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from '@rneui/themed';
import { StyleSheet } from 'react-native';
import { baseUrl } from '../Comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        cabeceras: state.cabeceras,
        actividades: state.actividades
    }
}

function RenderItem(props) {

    const item = props.item;

    if (props.isLoading) {
        return (
            <IndicadorActividad />
        );
    }
    else if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }
    else {
        if (item != null) {
            return (
                <Card>
                    <Card.Divider />
                    <View style={styles.textoContainer}>
                        <Text style={styles.titulo}>{item.nombre}</Text>
                    </View>
                    <Card.Image source={{ uri: baseUrl + item.imagen }} />
                    <Text style={{ margin: 20 }}>
                        {item.descripcion}
                    </Text>
                </Card>
            );
        }
        else {
            return (<View></View>);
        }
    }

}

class Home extends Component {


    render() {

        return ( // En el desarrollo de aplicaciones móviles utilizando React Native, <ScrollView> es un componente que proporciona una vista desplazable que puede contener una lista de elementos o contenido que no cabe completamente en la pantalla. Permite al usuario desplazarse verticalmente a través del contenido que contiene.
            <ScrollView>
                <RenderItem item={this.props.cabeceras.cabeceras.filter((cabecera) => cabecera.destacado)[0]} />
                <RenderItem item={this.props.excursiones.excursiones.filter((excursion) => excursion.destacado)[0]}
                    isLoading={this.props.excursiones.isLoading}
                    errMess={this.props.excursiones.errMess}
                />
                <RenderItem item={this.props.actividades.actividades.filter((actividad) => actividad.destacado)[0]} />
            </ScrollView>
        ); //Filter: Estoy eligiendo el primer destacado para cada caso
    }
}

const styles = StyleSheet.create({
    titulo: {
        color: 'chocolate',
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5,
        zIndex: 1, // Asegura que el texto esté sobre la imagen
    },
    textoContainer: {
        position: 'absolute', //position: 'absolute', lo que permite que el texto se superponga sobre la imagen. The element is removed from the normal document flow, and no space is created for the element in the page layout. The element is positioned relative to its closest positioned ancestor (if any) or to the initial containing block.
        top: 20,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center', // Centra horizontalmente
    }
});

export default connect(mapStateToProps)(Home);
