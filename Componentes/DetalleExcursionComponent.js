import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Alert, Modal, StyleSheet, Pressable } from 'react-native';
import { Card, Icon, Input } from '@rneui/themed';
import { Button, ListItem } from '@rneui/base';
import { baseUrl } from '../Comun/comun';
import { connect } from 'react-redux';
import { postFavorito, postComentario } from '../redux/ActionCreators';
import { colorGaztaroaOscuro } from '../Comun/comun';
import { Rating, AirbnbRating } from 'react-native-ratings';


const mapStateToProps = state => {
    return {
        actividades: state.actividades,
        excursiones: state.excursiones,
        comentarios: state.comentarios,
        favoritos: state.favoritos
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
    postComentario: (excursionId, valoracion, autor, comentario) => dispatch(postComentario(excursionId, valoracion, autor, comentario))
})

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
                <View style={styles.iconContainer}>
                    <Icon
                        raised //Adds box shadow to button
                        reverse //Reverses color scheme
                        name={props.favorita ? 'heart' : 'heart-o'} //Si props.favorita es verdadero, se muestra corazón lleno. Si no, corazón vacío
                        type='font-awesome' //  Este prop indica que el tipo de icono es de la familia 'Font Awesome'. Esto significa que el icono se obtiene de la biblioteca de iconos Font Awesome.
                        color='#f50' // Este prop establece el color del icono en color naranja (#f50)
                        onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()} //Si al pulsar props.favorita es cierto, hacemos console.log() avisando de que ya es favorito. En caso contrario, ejecutamos funcion props.Onpress pasada como propiedad
                    />
                    <Icon
                        raised //Adds box shadow to button
                        reverse //Reverses color scheme
                        name='pencil'
                        type='font-awesome' //  Este prop indica que el tipo de icono es de la familia 'Font Awesome'. Esto significa que el icono se obtiene de la biblioteca de iconos Font Awesome.
                        color={colorGaztaroaOscuro} // Este prop establece el color del icono en color naranja (#f50)
                        onPress={() => props.toggleModal()}
                    />
                </View>
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
            valoracion: 5,
            autor: '',
            comentario: '',
            showModal: false
        }
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    gestionarComentario(excursionId) {
        
        this.props.postComentario(excursionId, this.state.valoracion, this.state.autor, this.state.comentario); // en ActionReducers recibe 4 params, a traves de Maps...
        this.toggleModal(); //alterno apertura y cierre modal
    }

    resetForm() {
        this.setState({
            valoracion: 3,
            autor: '',
            comentario: '',
            dia: '',
            showModal: false
        });
    }

    marcarFavorito(excursionId) {
        this.props.postFavorito(excursionId)
    }

    render() {
        const { excursionId } = this.props.route.params;
        return (
            <ScrollView>
                <RenderExcursion
                    excursion={this.props.excursiones.excursiones[+excursionId]}
                    favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                    toggleModal={() => { this.toggleModal() }}
                    showModal={this.state.showModal}
                />
                <RenderComentario comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)} />

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => { this.toggleModal() }} // Este método se llama cuando el modal se cierra.
                    onRequestClose={() => { this.toggleModal() }} // Lanzamos este evento al intentar cerrar el modal el usuario
                >
                    <View style={styles.modal}>
                        <Rating
                            showRating
                            startingValue={5}
                            onFinishRating={rating => { this.setState({ valoracion: rating }) }}
                            style={styles.rating}
                        />
                        <Input
                            placeholder='Autor'
                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                            onChangeText={value => this.setState({ autor: value })}
                        />
                        <Input
                            placeholder='Comentario'
                            leftIcon={{ type: 'font-awesome', name: 'comment' }}
                            onChangeText={value => this.setState({ comentario: value })}
                        />

                        <Button
                            color="transparent"
                            title="ENVIAR"
                            onPress={() => { this.gestionarComentario(excursionId); this.resetForm(); }}
                            titleStyle={styles.buttonText}
                        // gestiono comentario y reseteo 
                        />
                        <Button
                            color="transparent"
                            title="CANCELAR"
                            onPress={() => { this.toggleModal(); this.resetForm() }}
                            titleStyle={styles.buttonText}
                        // gestiono comentario y reseteo 
                        />
                    </View>
                </Modal>
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
    },
    iconContainer: {
        flexDirection: 'row',  // Alinea los elementos horizontalmente
        justifyContent: 'center',  // Centra los elementos horizontalmente
        alignItems: 'center',  // Centra los elementos verticalmente
    },
    rating: {
        paddingTop: 100
    },
    modal: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 30, // Añade márgenes horizontalmente
    },
    buttonText: {
        color: colorGaztaroaOscuro,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);




