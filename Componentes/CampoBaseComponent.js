import React, { Component } from 'react';
import Constants from 'expo-constants';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import { View, Platform, StyleSheet, Image, Text } from 'react-native';
import { Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Home from './HomeComponent';
import ContactoComponent from './ContactoComponent';
import QuienesSomos from './QuienesSomosComponent';
import { colorGaztaroaClaro, colorGaztaroaOscuro } from '../Comun/comun';
import { connect } from 'react-redux';
import { fetchExcursiones, fetchComentarios, fetchCabeceras, fetchActividades } from '../redux/ActionCreators';
import MapaComponent from './MapaComponent';

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        comentarios: state.comentarios,
        cabeceras: state.cabeceras,
        actividades: state.actividades
    }
} //  es una función que se utiliza para mapear parte del estado de Redux a las propiedades del componente

const mapDispatchToProps = dispatch => ({
    fetchExcursiones: () => dispatch(fetchExcursiones()),
    fetchComentarios: () => dispatch(fetchComentarios()),
    fetchCabeceras: () => dispatch(fetchCabeceras()),
    fetchActividades: () => dispatch(fetchActividades()),
}) //  es una función que se utiliza para mapear las acciones de Redux a las propiedades del componente.

// mapDispatchToProps: Esta función toma la función dispatch de Redux como argumento y devuelve un objeto que vincula las acciones
//  de Redux a funciones que serán accesibles en el componente. De esta manera, el componente puede despachar acciones simplemente 
//  llamando a estas funciones, lo que desencadena las actualizaciones correspondientes en el estado de Redux.

// Pasos:

// 1- Se llama al action creator fetchExcursiones
// 2- El action creator, en este caso fetchExcursiones, 
// devuelve una función thunk. Esto es posible gracias al middleware Redux Thunk
// 3 - La función thunk se ejecuta inmediatamente después de ser llamada debido al middleware Redux Thunk. 
// Dentro de esta función, tienes acceso a dispatch.
// Antes de pasar al reducer, el middleware Redux Thunk, realiza acciones adicionales, como manejar operaciones asíncronas.
// 4 - La función thunk puede realizar operaciones asíncronas, como una solicitud HTTP 
// 5 - si la solicitud HTTP es exitosa, se despacha la acción addExcursiones(excursiones) para agregar las excursiones al estado de la aplicación. 
// Si hay un error, se despacha la acción excursionesFailed(error.message) para manejar el error. 
// El reducer correspondiente maneja cada acción y actualiza el estado de la aplicación en consecuencia, produciendo un nuevo estado.

// En Redux, los middlewares, como Redux Thunk, interceptan las acciones antes de que lleguen a los reducers. 
// Esto significa que cuando haces dispatch de una función thunk, Redux Thunk la intercepta y la ejecuta antes de que llegue al reducer.
// Cuando haces dispatch de una función thunk, en realidad estás pasando una función que tiene acceso a dispatch como su argumento. 

// dispatch no es un middleware en sí mismo. En el contexto de Redux, dispatch es una función proporcionada por 
// el store que se utiliza para enviar acciones a través de la cadena de middlewares y, finalmente, al reducer.

const Stack = createNativeStackNavigator(); //Se crea un Stack Navigator utilizando createNativeStackNavigator de React Navigation. Este Stack Navigator se utilizará para gestionar la navegación entre las diferentes pantallas de la aplicación.
const Drawer = createDrawerNavigator();

function CalendarioNavegador({ navigation }) {
    return (//stackNavigator, que define un conjunto de pantallas apiladas una encima de la otra. Este StackNavigator gestionará la navegación entre las pantallas definidas dentro de él.
        <Stack.Navigator
            initialRouteName="Calendar" // sEsto especifica la ruta inicial dentro del StackNavigator. En este caso, la pantalla inicial será "Calendar". 
            headerMode="float" //headerMode especifica el modo en que se muestran los encabezados de las pantallas dentro del StackNavigator. En este caso, se establece en "float", lo que significa que los encabezados flotarán sobre el contenido de la pantalla. cuando hablamos de "encabezados", nos referimos a las barras superiores que contienen elementos como el título de la pantalla y botones de navegación (como el botón "Atrás"). 
            screenOptions={{
                headerTintColor: '#fff', //color del texto del encabezado 
                headerStyle: { backgroundColor: colorGaztaroaOscuro }, // estilo del encabezado
                headerTitleStyle: { color: '#fff' }, //Estilo del texto del título del encabezado
            }}
        >
            <Stack.Screen
                name="Calendar"
                component={Calendario}
                options={{
                    title: 'Calendario Gaztaroa',
                    headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />)
                }}
            />
            <Stack.Screen // <Stack.Screen> define una pantalla dentro del StackNavigator.
                name="DetalleExcursion"
                component={DetalleExcursion}
                options={{
                    title: 'Detalle Excursión',
                }}
            />
        </Stack.Navigator>
    );
}

function HomeNavegador({ navigation }) {
    return ( // <Stack.Navigator> actúa como un contenedor para las diferentes pantallas y rutas que deseas gestionar mediante la navegación basada en pilas
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro },
                headerTitleStyle: { color: '#fff' }, //En style puedo poner el estilo que me venga en gana
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    title: 'Campo Base',
                    headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />)
                }}
            />
        </Stack.Navigator>
    );
}

function ContactoNavegador({ navigation }) {
    return ( // <Stack.Navigator> actúa como un contenedor para las diferentes pantallas y rutas que deseas gestionar mediante la navegación basada en pilas
        <Stack.Navigator
            initialRouteName="ContactoHijo"
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro },
                headerTitleStyle: { color: '#fff' },
            }}
        >
            <Stack.Screen
                name="ContactoHijo"
                component={ContactoComponent}
                options={{
                    title: 'Contacto',
                    headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />)
                }}
            />
        </Stack.Navigator>
    );
}

function QuienesSomosNavegador({ navigation }) {
    return ( // <Stack.Navigator> actúa como un contenedor para las diferentes pantallas y rutas que deseas gestionar mediante la navegación basada en pilas
        <Stack.Navigator
            initialRouteName="Quiénes somos hijo"
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro },
                headerTitleStyle: { color: '#fff' }
            }}
        >
            <Stack.Screen
                name="Quiénes somos hijo"
                component={QuienesSomos}
                options={{
                    title: 'Quiénes somos',
                    headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />)
                    // React Navigation dispara una acción para alternar la visibilidad del drawer, es decir, si el drawer está cerrado, lo abrirá, y si está abierto, lo cerrará.
                }}
            />
        </Stack.Navigator>
    );
}

function MapaNavegador({ navigation }) {
    return ( // <Stack.Navigator> actúa como un contenedor para las diferentes pantallas y rutas que deseas gestionar mediante la navegación basada en pilas
        <Stack.Navigator
            initialRouteName="mapa"
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro },
                headerTitleStyle: { color: '#fff' }
            }}
        >
            <Stack.Screen
                name="mapa"
                component={MapaComponent}
                options={{
                    title: 'Ubicación',
                    headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />)
                    // React Navigation dispara una acción para alternar la visibilidad del drawer, es decir, si el drawer está cerrado, lo abrirá, y si está abierto, lo cerrará.
                }}
            />
        </Stack.Navigator>
    );
}

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <SafeAreaView style={styles.container} forceInset={{ // En React Native, SafeAreaView es un componente proporcionado por la biblioteca react-native-safe-area-context, que se utiliza para garantizar que el contenido de una aplicación se muestre dentro de las áreas seguras de la pantalla de un dispositivo móvil. Estas áreas seguras son aquellas que no están cubiertas por barras de estado, barras de navegación, notches u otros elementos del sistema operativo que pueden superponerse al contenido de la aplicación.
                // this component only supports iOS 10+ with no support for older iOS versions or Android.
                //Si quito SafeAreaView, se verá mejor con mi xiaomi
                top: 'always',
                horizontal: 'never' // safeAreaView es un componente proporcionado por react-native-safe-area-context que garantiza que el contenido se renderice dentro de las áreas seguras del dispositivo, evitando que se solape con elementos como la barra de estado o la barra de navegación. 
                // forceInset se utiliza aquí para asegurar que haya un relleno en la parte superior (top) para evitar que el contenido se superponga con la barra de estado. 
                // In some cases you might need more control over which paddings are applied.
            }}>
                <View style={styles.drawerHeader}>
                    <View style={{ flex: 1 }}>
                        <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/dsm-gaztaroa.appspot.com/o/logo.png?alt=media' }} style={styles.drawerImage} />
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.drawerHeaderText}> Gaztaroa</Text>
                    </View>
                </View>
                <DrawerItemList {...props} />
            </SafeAreaView>
        </DrawerContentScrollView>
    )
}
// DrawerContentScrollView: Function that returns React element to render as the content of the drawer, for example, navigation items
// The default component for the drawer is scrollable and only contains links for the routes in the RouteConfig. You can easily override the default component to add a header, footer, or other content to the drawer. 
// This is what we are doing here, we are customizing it

// DrawerItemList: La lista de items del drawer que aparecería originalmente 
// <View style={styles.drawerHeader}>: {/*Elementos adicionales, un header en este caso.*/}


function DrawerNavegador() {
    return ( // <Drawer.Navigator> actúa como un contenedor para las pantallas y rutas que deseas que estén disponibles en el menú deslizante
        <Drawer.Navigator // Este componente define la navegación basada en un cajón lateral (drawer)
            initialRouteName="Campo base" //la propiedad initialRouteName se utiliza para especificar qué pantalla debe mostrarse inicialmente cuando se carga el navegador de rutas
            drawerContent={props => <CustomDrawerContent {...props} />} // Aquí se especifica el contenido del cajón lateral utilizando un componente personalizado llamado CustomDrawerContent, que se pasa como una función que toma props como argument. drawerContent={...}: Esta es una prop del Drawer Navigator que acepta un componente React que se utilizará como contenido del cajón lateral. En resumen, {...props} es una forma conveniente de pasar todas las props recibidas por un componente a otro componente dentro de la jerarquía de renderizado.
            screenOptions={{
                headerShown: false, //ningún encabezado en las pantallas
                drawerStyle: {
                    backgroundColor: colorGaztaroaClaro, // Color que se aplicará como el color de fondo del cajón lateral. Viene de nuestras constantes globales
                },
                // El bloque screenOptions que proporcionas se utiliza para definir las opciones de estilo y comportamiento que se aplicarán a todas las pantallas dentro del Drawer.Navigator

            }}
        >
            <Drawer.Screen name="Campo base" component={HomeNavegador}
                options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon
                            name='home'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            />
            <Drawer.Screen name="Quiénes somos" component={QuienesSomosNavegador}
                options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon
                            name='info-circle'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }} />
            <Drawer.Screen name="Calendario" component={CalendarioNavegador}
                options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon
                            name='calendar'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }} />
            <Drawer.Screen name="Ubicación" component={MapaNavegador}
                options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon
                            name='map'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }} />
            <Drawer.Screen name="Contacto" component={ContactoNavegador}
                options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon
                            name='address-card'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }} />
        </Drawer.Navigator>
    );
}

class Campobase extends Component {

    componentDidMount() {
        this.props.fetchExcursiones();
        this.props.fetchComentarios();
        this.props.fetchCabeceras();
        this.props.fetchActividades();

    }

    // El método componentDidMount() es un método del ciclo de vida de los componentes en React que se llama automáticamente después de que un componente se haya montado en el árbol DOM.

    render() {
        return (
            <>
                <NavigationContainer>
                    <View style={{
                        flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : 0/*Constants.statusBarHeight*/
                    }}>
                        <DrawerNavegador />
                    </View>
                </NavigationContainer>
            </>
        );
    }
}
// si la plataforma en la que se está ejecutando la aplicación es iOS. Si es así, se establece el relleno superior en 0, lo que significa que no hay relleno en la parte superior. Si no es iOS (es decir, es Android u otra plataforma), se utiliza Constants.statusBarHeight para establecer el relleno superior. Constants.statusBarHeight es una propiedad de Expo que proporciona la altura de la barra de estado del dispositivo. 
export default connect(mapStateToProps, mapDispatchToProps)(Campobase);

// connect es una función proporcionada por React Redux que se utiliza para conectar componentes React a la store de Redux.
// Aquí implementamos un patrón de conexión
// Lo que hace esta expresión es conectar el componente Campobase al store de Redux,
//  utilizando las funciones mapStateToProps y mapDispatchToProps para mapear el estado y las acciones necesarias al componente. 
// mapStateToProps: lee
// mapDispatchToProps: escribe


// La función connect es un componente de la biblioteca React Redux que se utiliza para conectar un componente de React a un
//  store de Redux. Su función principal es proporcionar a los componentes de React acceso al estado de Redux y la capacidad 
//  de despachar acciones para actualizar ese estado.

// contenedor para la navegación en la aplicación. Proporciona un contexto de navegación que permite a los componentes hijos acceder al estado de la navegación, como las rutas y la navegación entre pantallas.

// createStackNavigator es un método proporcionado por React Navigation que te permite crear un stack navigator en tu aplicación React Native. Un stack navigator gestiona la navegación entre diferentes pantallas apilándolas una encima de la otra.
// In React Navigation, <NavigationContainer> is a component used as the root of your navigation structure. It's typically used to wrap the entire app's navigation components.
// In a typical React Native app, the NavigationContainer should be only used once in your app at the root. You shouldn't nest multiple NavigationContainers unless you have a specific use case for them.
// En el contexto de React Navigation, las "Screens" (pantallas) son componentes de React que representan las diferentes pantallas o vistas de una aplicación.

// class CampoBase extends Component { // Esto significa que Campobase es un componente de React que hereda todas las funcionalidades de un componente de clase de React
//     constructor(props) {
//         super(props);//  Se define el constructor de lalase padre (Component) con props como argumento. Esto es necesario si quieres acceder a this.props dentro del constructor.
//         this.state = { //this.state: estado del componente
//             excursiones: EXCURSIONES, //propiedad + VALOR proveniente de fichero JavaScript de la carpeta comun.
//             seleccionExcursion: null // Se ha creado una nueva variable de estado: seleccionExcursion. Su objetivo es almacenar el identificador de la excursión que se desea renderizar
//         };
//     }

//     onSeleccionExcursion(excursionId) { //Esta función se llama desde dentro de la función onPress. Actualiza el estado, específicamente, seleccionExcursion.
//         this.setState({ seleccionExcursion: excursionId })
//     }

//     render() { // En el contexto de React, el método render() es un método obligatorio en todos los componentes de clase. Es llamadp cada vez que el estado de una clase cambia
//         // Este método es responsable de definir la estructura de la interfaz de usuario que el componente debe representar.
//         // La estructura de la interfaz de usuario (UI) se refiere a la disposición y organización de los elementos visuales que componen una aplicación, página web o cualquier sistema interactivo con el que un usuario pueda interactuar.
//         return (
//             <View>
//                 <DetalleExcursion excursion={this.state.excursiones.filter((excursion)=> excursion.id === this.state.seleccionExcursion)[0]}></DetalleExcursion>
//                 <Calendario excursiones={this.state.excursiones} onPress = {(excursionId) => this.onSeleccionExcursion(excursionId)}/>
//             </View>
//         );
//     }
// }

// //Onpress es la función que recibe el calendario. A pesar de ser un nombre en inglés, el nombre podría ser cualquiera.
// //Es necesario incorporar un View que englobe los dos componentes dentro de la función return
// //Un componente View es un elemento rectangular sin estilo propio que actúa como un contenedor flexible para otros componentes, como texto, imágenes, botones, etc. Puedes pensar en él como un contenedor invisible que ayuda a organizar y posicionar otros elementos en la pantalla de la aplicación.

// export default CampoBase;

const styles = StyleSheet.create({
    container: {
        flex: 1, //Para asegurarse de que el contenido del componente ocupe todo el espacio disponible en la pantalla
    },
    drawerHeader: {
        backgroundColor: colorGaztaroaOscuro,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});

