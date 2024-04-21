import React, { Component } from 'react';
import Constants from 'expo-constants';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import { Platform, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator(); //Se crea un Stack Navigator utilizando createNativeStackNavigator de React Navigation. Este Stack Navigator se utilizará para gestionar la navegación entre las diferentes pantallas de la aplicación.

function CalendarioNavegador() {
    return (//stackNavigator, que define un conjunto de pantallas apiladas una encima de la otra. Este StackNavigator gestionará la navegación entre las pantallas definidas dentro de él.
        <Stack.Navigator
            initialRouteName="Calendar" // sEsto especifica la ruta inicial dentro del StackNavigator. En este caso, la pantalla inicial será "Calendar". 
            headerMode="float" //headerMode especifica el modo en que se muestran los encabezados de las pantallas dentro del StackNavigator. En este caso, se establece en "float", lo que significa que los encabezados flotarán sobre el contenido de la pantalla. cuando hablamos de "encabezados", nos referimos a las barras superiores que contienen elementos como el título de la pantalla y botones de navegación (como el botón "Atrás"). 
            screenOptions={{
                headerTintColor: '#fff', //color del texto del encabezado 
                headerStyle: { backgroundColor: '#015afc' }, // estilo del encabezado
                headerTitleStyle: { color: '#fff' }, //Estilo del texto del título del encabezado
            }}
        > 
            <Stack.Screen
                name="Calendar"
                component={Calendario}
                options={{
                    title: 'Calendario Gaztaroa',
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

class Campobase extends Component {
    render() {
        return (
            <NavigationContainer>
                <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
                    <CalendarioNavegador />
                </View>
            </NavigationContainer>
        );
    }
}
// si la plataforma en la que se está ejecutando la aplicación es iOS. Si es así, se establece el relleno superior en 0, lo que significa que no hay relleno en la parte superior. Si no es iOS (es decir, es Android u otra plataforma), se utiliza Constants.statusBarHeight para establecer el relleno superior. Constants.statusBarHeight es una propiedad de Expo que proporciona la altura de la barra de estado del dispositivo. 
export default Campobase;

// createStackNavigator es un método proporcionado por React Navigation que te permite crear un stack navigator en tu aplicación React Native. Un stack navigator gestiona la navegación entre diferentes pantallas apilándolas una encima de la otra.
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