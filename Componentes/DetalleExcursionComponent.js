import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Alert, Modal, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Card, Icon, Input } from '@rneui/themed';
import { Button, ListItem, Avatar } from '@rneui/base';
import { baseUrlFirebase } from '../Comun/comun';
import { connect } from 'react-redux';
import { postFavorito, postComentario, removeFavorito } from '../redux/ActionCreators';
import { colorGaztaroaOscuro, colorGaztaroaClaro } from '../Comun/comun';
import { Rating } from 'react-native-ratings';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from './ConfigFirebase';
import axios from "axios";
import * as Calendar from 'expo-calendar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Toast from 'react-native-toast-message';

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
    removeFavorito: (excursionId) => dispatch(removeFavorito(excursionId)),
    postComentario: (excursionId, valoracion, autor, comentario, imagen) => dispatch(postComentario(excursionId, valoracion, autor, comentario, imagen))
})

function RenderExcursion(props) {

    const excursion = props.excursion;

    // GESTION DEL CALENDARIO
    const openCalendar = async () => {
        const { status } = await Calendar.requestCalendarPermissionsAsync(); // Solicita permisos para acceder al calendario, espera a promesa
        if (status === 'granted') { // Si se conceden los permisos
            // Aquí puedes abrir el calendario, aunque Expo no tiene un método directo para abrir la aplicación de calendario.
            // Puedes crear un evento en el calendario del dispositivo.

            // Obtiene los calendarios del dispositivo
            const calendars = await Calendar.getCalendarsAsync();
            console.log('Calendars:', calendars);

            // Crea los detalles del evento
            // '2024-07-01T10:00:00'
            const eventDetails = {
                title: excursion.nombre, // Título del evento
                startDate: new Date(excursion.fechaInicio),
                endDate: new Date(excursion.fechaFin), // Fecha de finalización del evento, también se establece en la fecha y hora actual
                timeZone: 'GMT', // Zona horaria del evento, en este caso se establece en GMT
                location: excursion.nombre // Ubicación del evento, en este caso se establece como 'Excursion Location'
            };

            // Busca el calendario por defecto (primario) o utiliza el primer calendario encontrado
            // En calendario Xiaomi, no el de google
            const defaultCalendar = calendars.find(calendar => calendar.isPrimary) || calendars[0];

            if (defaultCalendar) {
                // Crea un nuevo evento en el calendario seleccionado
                const newEventId = await Calendar.createEventAsync(defaultCalendar.id, eventDetails);
                // Alert.alert('Se ha creado evento en el calendario para la excursión a fecha prevista.');
                Toast.show({
                    type: 'success',
                    text1: 'Evento creado',
                    text2: 'Se ha creado un evento en el calendario a la fecha prevista.',
                    position: 'top', 
                    visibilityTime: 4000,
                    autoHide: true,
                    topOffset: 40
                });
            }
        } else {
            //Alert.alert('Permiso denegado', 'No se pudo obtener acceso al calendario');
            Toast.show({
                type: 'error',
                text1: 'Permiso denegado',
                text2: 'No se pudo obtener acceso al calendario',
                position: 'top', 
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 40
            });
        }
    };

    if (excursion != null) {
        return (
            <Card>
                <Card.Divider />
                <View style={styles.textoContainer}>
                    <Text style={styles.titulo}>{excursion.nombre}</Text>
                </View>
                <Card.Image source={{ uri: excursion.imagen }} onPress={() => console.log(excursion.imagen)} />
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
                        onPress={() => props.favorita ? props.onRemoveFavorite() : props.onPress()} // alterno entre marcar y desmarcar favorito
                    // onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()} //Si al pulsar props.favorita es cierto, hacemos console.log() avisando de que ya es favorito. En caso contrario, ejecutamos funcion props.Onpress pasada como propiedad
                    />
                    <Icon
                        raised //Adds box shadow to button
                        reverse //Reverses color scheme
                        name='pencil'
                        type='font-awesome' //  Este prop indica que el tipo de icono es de la familia 'Font Awesome'. Esto significa que el icono se obtiene de la biblioteca de iconos Font Awesome.
                        color={colorGaztaroaOscuro} // Este prop establece el color del icono en color naranja (#f50)
                        onPress={() => props.toggleModal()}
                    />
                    <Icon
                        raised
                        reverse
                        name='calendar'
                        type='font-awesome'
                        color={colorGaztaroaClaro}
                        onPress={openCalendar}
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

        const handleonPress = () => {
            props.toggleModal2();
            props.selectImage(item.imagen);
        }

        return (
            <>
                <ListItem
                    key={index}
                    bottomDivider>

                    <ListItem.Content>
                        <ListItem.Title>{item.comentario}</ListItem.Title>
                        <ListItem.Subtitle>{generarEstrellas(item.valoracion)}</ListItem.Subtitle>
                        <ListItem.Subtitle>{item.autor}, {formatDate(item.dia)}</ListItem.Subtitle>
                    </ListItem.Content>
                    {item.imagen && (
                        <TouchableOpacity onPress={() => { handleonPress(item.imagen) }}>
                            <Avatar
                                source={{ uri: item.imagen }}
                                size="medium"
                            />
                        </TouchableOpacity>
                    )}

                </ListItem>


            </>
        );
    };

    return (
        <Card>
            <Card.Title>Comentarios</Card.Title>
            <Card.Divider />
            <FlatList scrollEnabled={false}
                data={comentarios}
                renderItem={renderComentarioItem}
                keyExtractor={(item, index) => `${item.id}-${index}`}
            />
        </Card>
    )
}


// keyExtractor es una función utilizada en React Native (y en React en general) para proporcionar una clave única para cada elemento de una lista cuando se está utilizando un componente de lista, como FlatList o SectionList.

//Cards are a great way to display information, usually containing content and actions about a single subject. 
//These actions could include things like buttons to click, links to follow, or options to interact with the content in some way. 

//Card.Divider Add divider to the card which acts as a separator between elements. This, Receives all Divider props.

// forzosamente asíncronas para que funcionen
const storeFavorite = async (favoriteId) => {
    try {
        let favorites = await AsyncStorage.getItem('favorites'); // obtener favs actuales desde AsyncStorage
        if (favorites) {
            favorites = JSON.parse(favorites); // Si los hay convertirlos en array
            if (!favorites.includes(favoriteId)) {
                favorites.push(favoriteId); // para no añadir nuevamente al pulsar Icon, si ya esta fav
            }
        } else {
            favorites = [favoriteId]; // Si no hay favoritos almacenados, inicializar un nuevo array con favoriteId
        }
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites)); // Guardar el array actualizado de favoritos en AsyncStorage
    } catch (error) {
        console.error("Error saving favorite", error);
    }
};

const removeFavorite = async (favoriteId) => {
    try {
        let favorites = await AsyncStorage.getItem('favorites');
        if (favorites) {
            favorites = JSON.parse(favorites);
            favorites = favorites.filter(id => id !== favoriteId);
            await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
        }
    } catch (error) {
        console.error("Error removing favorite", error);
    }
};

const loadFavorites = async () => {
    try {
        let favorites = await AsyncStorage.getItem('favorites');
        if (favorites) {
            return JSON.parse(favorites);
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error loading favorites", error);
        return [];
    }
};


class DetalleExcursion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valoracion: 5,
            autor: '',
            comentario: '',
            showModal: false,
            showModal2: false,
            selectedImage: null,
            hasCameraPermission: null,
            camera: null,
            imagen: null,
            showLoadingModal: false,
            loading: false
        }

    }

    async componentDidMount() { // se podria mirar de inicializarlo en App para mejor rendimiento
        const favorites = await loadFavorites();
        favorites.forEach(fav => {
            this.props.postFavorito(fav); // fav indice de excursion, 0,1,2,...
        });
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    toggleModal2 = () => {
        this.setState({ showModal2: !this.state.showModal2 });
    }

    selectImage = (image) => {
        this.setState({ selectedImage: image });
    }

    gestionarComentario = async (excursionId) => {
        this.setState({ showLoadingModal: true, loading: true });

        let dia = new Date().toString();
        const resena = {
            autor: this.state.autor,
            comentario: this.state.comentario,
            dia: dia,
            excursionId: excursionId,
            id: this.props.comentarios.comentarios.length, // logica de aumento de id-> length
            valoracion: this.state.valoracion,
            imagen: null
        }

        const imagenURL = this.state.imagen;
        if (imagenURL) {
            try {
                const response = await fetch(imagenURL);
                const blob = await response.blob();

                const storageRef = ref(storage, `CommentImages/${new Date().getTime()}.jpeg`); // Ruta única imágenes
                const snapshot = await uploadBytes(storageRef, blob, { contentType: 'image/jpeg' });
                console.log('Se subió el archivo');

                let downloadURL = await getDownloadURL(snapshot.ref);
                const indexFin = downloadURL.indexOf("&token");
                downloadURL = downloadURL.substring(0, indexFin);
                resena.imagen = downloadURL;

                this.guardarComentario(resena)

            } catch (error) {
                console.error('Error al subir o obtener la URL de descarga de la imagen', error.message);
                // Manejar el error adecuadamente
            }
        } else {
            this.guardarComentario(resena)
        }
    }

    guardarComentario(resena) {

        this.props.postComentario(resena.excursionId, resena.valoracion, resena.autor, resena.comentario, resena.imagen); // en ActionReducers recibe 4 params, a traves de Maps...

        // axios de forma asincronica por defecto, resuelve promesas
        axios.post(`${baseUrlFirebase}/comentarios.json`, resena)
            .then((response) => {
                console.log("El comentario se ha insertado en la BD");
                this.setState({ loading: false, showLoadingModal: false, imagen: null }); // Finaliza el estado de carga y oculta modal
                this.resetForm();
            })
            .catch((error) => {
                console.log(error);
                alert("Se ha producido un error");
            })

        // destacado en firebase?
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
        storeFavorite(excursionId);
    }

    async openCamera() {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status === 'granted') {
            await ImagePicker.launchCameraAsync().then(result => {
                if (!result.cancelled) {
                    console.log(result);
                    this.setState({ imagen: result.assets[0].uri }); //guardo la uri en el estado
                }
            }).catch(error => {
                Alert.alert('Aviso', 'Cerró la cámara');
            })
        } else {
            Alert.alert('Permiso denegado', 'No se pudo obtener acceso a la cámara');
        }
    }

    async openGallery() {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        // No permissions request is necessary for launching the image library
        if (status === 'granted') {
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            }).then(result => {
                if (!result.cancelled) {
                    console.log(result);
                    this.setState({ imagen: result.assets[0].uri }); //guardo la uri en el estado
                }
            }).catch(error => {
                Alert.alert('Aviso', 'Cerró la galería');
            });

        } else {
            Alert.alert('Permiso denegado', 'No se pudo obtener acceso a la cámara');
        }
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

                    onRemoveFavorite={() => { this.props.removeFavorito(excursionId); removeFavorite(excursionId); }}
                />

                <RenderComentario
                    comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                    toggleModal2={this.toggleModal2} selectImage={this.selectImage} />


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

                        {this.state.imagen && <Image source={{ uri: this.state.imagen }} style={styles.image} />}

                        <View style={styles.container}>
                            <Icon
                                raised //Adds box shadow to button
                                reverse //Reverses color scheme
                                name={'camera'} //Si props.favorita es verdadero, se muestra corazón lleno. Si no, corazón vacío
                                type='font-awesome' //  Este prop indica que el tipo de icono es de la familia 'Font Awesome'. Esto significa que el icono se obtiene de la biblioteca de iconos Font Awesome.
                                color={colorGaztaroaOscuro} // Este prop establece el color del icono en color naranja (#f50)
                                onPress={() => this.openCamera()}
                            />

                            <Icon
                                raised //Adds box shadow to button
                                reverse //Reverses color scheme
                                name={'image'} //Si props.favorita es verdadero, se muestra corazón lleno. Si no, corazón vacío
                                type='font-awesome' //  Este prop indica que el tipo de icono es de la familia 'Font Awesome'. Esto significa que el icono se obtiene de la biblioteca de iconos Font Awesome.
                                color='#f50' // Este prop establece el color del icono en color naranja (#f50)
                                onPress={() => this.openGallery()}
                            />
                        </View>
                        <Button
                            color="transparent"
                            title="ENVIAR"
                            onPress={() => { this.gestionarComentario(excursionId); this.resetForm(); this.toggleModal() }}
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

                {/* Modal de carga: */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.showLoadingModal}
                    onRequestClose={() => this.setState({ showLoadingModal: false })}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                            <ActivityIndicator size="large" color="#0000ff" />
                            {this.state.loading && <Text>Loading...</Text>}
                        </View>
                    </View>
                </Modal>

                {/* Modal de imagen: */}

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showModal2}
                    onRequestClose={() => this.toggleModal2()}
                >
                    <View style={styles.fullScreenContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => this.toggleModal2()}>
                            <Text style={styles.closeButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                        {this.state.selectedImage && (
                            <Image source={{ uri: this.state.selectedImage }} style={styles.fullScreenImage} />
                        )}
                    </View>
                </Modal>



            </ScrollView>
        );
    }
}

//Función para las estrellas:

const generarEstrellas = (valoracion) => {

    switch (valoracion) {
        case 1:
            return (<>★</>);
        case 2:
            return (<>★★</>);
        case 3:
            return (<>★★★</>);
        case 4:
            return (<>★★★★</>);
        case 5:
            return (<>★★★★★</>);
        default:
            break;
    }
}

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son 0-indexed
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

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
        paddingTop: 100,
        paddingBottom: 15
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
    image: {
        width: 100,
        height: 100,
        marginVertical: 20
    },
    container: {
        flexDirection: 'row', // Alinear elementos en una fila horizontal
        justifyContent: 'space-between', // Distribuir los elementos con espacio entre ellos
        paddingHorizontal: 10, // Añadir espacio horizontal entre los íconos y los bordes del contenedor
    },
    fullScreenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000', // Fondo negro para el modal
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff', // Texto blanco para el botón de cerrar
    },
    fullScreenImage: {
        width: '100%',
        height: '85%',
        resizeMode: 'contain', // Ajusta la imagen al tamaño del modal
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);




