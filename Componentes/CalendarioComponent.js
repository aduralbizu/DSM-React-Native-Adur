import React, { Component } from 'react';
import { ListItem, Avatar } from '@rneui/themed';
import { SafeAreaView, FlatList } from 'react-native';
import { EXCURSIONES } from '../Comun/excursiones';
import { baseUrl } from '../Comun/comun';

class Calendario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES
        };
    }

    render() { //  render() es un método fundamental en los componentes de React. Este método es obligatorio y se utiliza para definir la interfaz de usuario (UI) que el componente debe representar

        const { navigate } = this.props.navigation; //Para navegar a otra página. this.props.navigation: Esta prop proporciona acceso a la navegación en React Navigation desde el componente de pantalla actual. Contiene métodos como navigate, goBack, push, pop, entre otros, así como propiedades como state y setParams.
        // La prop navigation que se está utilizando en const { navigate } = this.props.navigation; es una prop especial proporcionada por React Navigation. Esta prop es pasada automáticamente a los componentes de pantalla (Screens) por el componente de navegación principal (StackNavigator, TabNavigator, etc.) y proporciona acceso a métodos y propiedades relacionadas con la navegación.
        // Los corchetes se utilizan en JavaScript para realizar la "destructuración" de objetos. En el caso específico que mencionas, const { navigate } = this.props.navigation;, se está utilizando destructuración para extraer la propiedad navigate del objeto this.props.navigation.
        
        const renderCalendarioItem = ({ item, index }) => {
            return (
                <ListItem
                    key={index}
                    onPress={() => navigate('DetalleExcursion', { excursionId: item.id })} // Cuando navegas de una pantalla a otra en React Navigation, puedes pasar parámetros a la nueva pantalla. Estos parámetros se pueden acceder desde la pantalla receptora a través de this.props.route.params.
                    // The header provided by the native stack navigator will automatically include a back button when it is possible to go back from the active screen (if there is only one screen in the navigation stack, there is nothing that you can go back to, and so there is no back button)
                    bottomDivider>
                    <Avatar source={{uri: baseUrl + item.imagen}} /> 

                    <ListItem.Content>
                        <ListItem.Title>{item.nombre}</ListItem.Title>
                        <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            );
        };

        return (
            <SafeAreaView>
                <FlatList
                    data={this.state.excursiones}
                    renderItem={renderCalendarioItem}
                    keyExtractor={item => item.id.toString()}
                />
            </SafeAreaView>
        ); //En React Native, FlatList es un componente utilizado para renderizar listas de datos en una aplicación móvil de manera eficiente.
   // renderItem: Takes an item from data and renders it into the list.
    }
}

export default Calendario;
