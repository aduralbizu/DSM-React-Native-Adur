import React, { Component } from 'react';
import { ListItem, Avatar } from '@rneui/themed';
import { SafeAreaView, FlatList } from 'react-native';
import { EXCURSIONES } from '../Comun/excursiones';

class Calendario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES
        };
    }

    render() { //  render() es un método fundamental en los componentes de React. Este método es obligatorio y se utiliza para definir la interfaz de usuario (UI) que el componente debe representar

        const { navigate } = this.props.navigation; //Para navegar a otra página. this.props.navigation: Esta prop proporciona acceso a la navegación en React Navigation desde el componente de pantalla actual. Contiene métodos como navigate, goBack, push, pop, entre otros, así como propiedades como state y setParams.

        const renderCalendarioItem = ({ item, index }) => {
            return (
                <ListItem
                    key={index}
                    onPress={() => navigate('DetalleExcursion', { excursionId: item.id })} // Cuando navegas de una pantalla a otra en React Navigation, puedes pasar parámetros a la nueva pantalla. Estos parámetros se pueden acceder desde la pantalla receptora a través de this.props.route.params.
                    bottomDivider>
                    <Avatar source={require('./imagenes/40Años.png')} />
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
        );
    }
}

export default Calendario;
