import { Avatar, Card, ListItem } from "@rneui/base";
import { Text, ScrollView, View } from 'react-native';
import { Component } from "react";
import { HISTORIA } from "../Comun/historia";
import { ACTIVIDADES } from "../Comun/actividades";
import { FlatList } from "react-native-gesture-handler";

function Historia(props) {
    const item = props.item;

    return (
        <Card>
            <Card.Title>{item.nombre}</Card.Title>
            <Card.Divider />
            <Text style={{ margin: 20 }}>
                {item.descripcion}
            </Text>
        </Card>
    );
}

class QuienesSomos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            historia: HISTORIA,
            actividades: ACTIVIDADES
        };
    }

    render() {

        const renderActividadesItem = ({ item, index }) => {
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

            <ScrollView>
                <Historia item={this.state.historia} />

                <Card>
                    <Card.Title>"Actividades y recursos"</Card.Title>
                    <Card.Divider />
                    <FlatList scrollEnabled={false}
                        data={this.state.actividades}
                        renderItem={renderActividadesItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView>

        );
    }
}

export default QuienesSomos;