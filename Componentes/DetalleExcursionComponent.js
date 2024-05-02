import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { StyleSheet } from 'react-native';
import { ListItem } from '@rneui/base';
import { baseUrl } from '../Comun/comun';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        actividades: state.actividades,
        excursiones: state.excursiones,
        comentarios: state.comentarios,
    }
}



function RenderExcursion(props) {

    const excursion = props.excursion;

    if (excursion != null) {
        return (
            <Card>
                <Card.Divider />
                <View style={styles.textoContainer}>
                    <Text style={styles.titulo}>{excursion.nombre}</Text>
                </View>
                <Card.Image source={{ uri: baseUrl + excursion.imagen }} onPress={() => console.log(baseUrl + excursion.imagen)} />
                <Text style={{ margin: 20 }}>
                    {excursion.descripcion}
                </Text>
                <Icon
                    raised //Adds box shadow to button
                    reverse //Reverses color scheme
                    name={props.favorita ? 'heart' : 'heart-o'} //Si props.favorita es verdadero, se muestra corazón lleno. Si no, corazón vacío
                    type='font-awesome' //  Este prop indica que el tipo de icono es de la familia 'Font Awesome'. Esto significa que el icono se obtiene de la biblioteca de iconos Font Awesome.
                    color='#f50' // Este prop establece el color del icono en color naranja (#f50)
                    onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()} //Si al pulsar props.favorita es cierto, hacemos console.log() avisando de que ya es favorito. En caso contrario, ejecutamos funcion props.Onpress pasada como propiedad
                />

            </Card>
        );
        // Icons are visual indicators usually used to describe action or intent. They are also used for displaying information.
    }
    else {
        return (<View></View>);
    }
}

function RenderComentario(props) {

    const comentarios = props.comentarios;

    const renderComentarioItem = ({ item, index }) => {
        return (
            <ListItem
                key={index}
                bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>{item.comentario}</ListItem.Title>
                    <ListItem.Subtitle>{item.valoracion} Stars</ListItem.Subtitle>
                    <ListItem.Subtitle>-- {item.autor}, {item.dia}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    };
    // El índice en la función renderComentarioItem proviene del keyExtractor definido en la FlatList

    return (
        <Card>
            <Card.Title>Comentarios</Card.Title>
            <Card.Divider />
            <FlatList scrollEnabled={false}
                data={comentarios}
                renderItem={renderComentarioItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    )
}

// keyExtractor es una función utilizada en React Native (y en React en general) para proporcionar una clave única para cada elemento de una lista cuando se está utilizando un componente de lista, como FlatList o SectionList.

//Cards are a great way to display information, usually containing content and actions about a single subject. 
//These actions could include things like buttons to click, links to follow, or options to interact with the content in some way. 

//Card.Divider Add divider to the card which acts as a separator between elements. This, Receives all Divider props.

class DetalleExcursion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoritos: []
        };
    }

    marcarFavorito(excursionId) {
        this.setState({
            favoritos: this.state.favoritos.concat(excursionId) // El método concat() en JavaScript se utiliza para combinar dos o más arrays. Retorna un nuevo array que contiene los elementos de los arrays originales, en el orden en que se proporcionan.
        });
    }

    render() {
        const { excursionId } = this.props.route.params;
        return (
            <ScrollView>
                <RenderExcursion
                    excursion={this.props.excursiones.excursiones[+excursionId]}
                    favorita={this.state.favoritos.some(el => el === excursionId)} //El método .some() en JavaScript se utiliza para verificar si al menos un elemento en un array cumple con una condición dada. Retorna true si al menos un elemento pasa la prueba especificada por la función de callback
                    onPress={() => this.marcarFavorito(excursionId)}
                />
                <RenderComentario comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)} />
            </ScrollView>
        );
    }
}

// La expresión this.state.comentarios.filter() se utiliza en React para filtrar elementos de una matriz (array) de comentarios que se almacenan en el estado de un componente de clase
// ScrollView es un componente proporcionado por React Native que permite desplazar contenido que es más grande que la pantalla

const styles = StyleSheet.create({
    titulo: {
        color: 'white',
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

export default connect(mapStateToProps)(DetalleExcursion);



