import React from 'react';
import { ListItem, Avatar } from '@rneui/themed';
import { SafeAreaView, FlatList } from 'react-native';

function Calendario(props) {

    const renderCalendarioItem = ({ item, index }) => { //Index es la posición del elemento en la lista.
        return (
            <ListItem key={index} onPress={() => props.onPress(item.id)} bottomDivider>

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
                data={props.excursiones}
                renderItem={renderCalendarioItem}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>

    );

}

// ListItem:  Este es un componente de React Native llamado ListItem, que parece mostrar un elemento individual en la lista
{/* <SafeAreaView> es un componente proporcionado por React Native que se utiliza para garantizar que el contenido de una aplicación móvil se muestre correctamente en dispositivos con pantallas que tienen recortes, como la muesca en la parte superior del iPhone (iOS) o barras de notificaciones en dispositivos Android. */ }

//BottomDivider: bottomDivider es una prop específica del componente ListItem en React Native. Cuando se establece en true, agrega un divisor en la parte inferior del elemento ListItem.

//flatlist: A performant interface for rendering basic, flat lists, s
//Data: An array (or array-like list) of items to render.
//Renderitem: Takes an item from data and renders it into the list. Una función que renderiza cada elemento de la lista.
// item (Object): The item from data being rendered.
// index (number): The index corresponding to this item in the data array.
// keyExtractor Used to extract a unique key for a given item at the specified index. En este caso, index es la clave generada por la función keyExtractor. Se pasa a través de la función de renderizado como parte del objeto que recibe, el cual contiene item y index.

export default Calendario;
