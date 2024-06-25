import { Avatar, Card, ListItem } from "@rneui/base";
import { Text, ScrollView, View } from 'react-native';
import { HISTORIA } from "../Comun/historia";
import { Component } from "react";
import { FlatList } from "react-native-gesture-handler";
import { baseUrl } from "../Comun/comun";
import { connect } from "react-redux";
import { IndicadorActividad } from "./IndicadorActividadComponent";

const mapStateToProps = state => {
    return {
        actividades: state.actividades
    }
}

// mapStateToProps mapea partes del estado a las propiedades del componente. 

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
            historia: HISTORIA
        };
    }

    render() {

        const renderActividadesItem = ({ item, index }) => {
            return (
                <ListItem
                    key={index}
                    bottomDivider>
                    <Avatar source={{ uri:  item.imagen }} />
                    <ListItem.Content>
                        <ListItem.Title>{item.nombre}</ListItem.Title>
                        <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            );
        };

        if (this.props.actividades.isLoading) {
            return (
                <ScrollView>
                    <Historia item={this.state.historia} />
                    <Card>
                        <Card.Title>"Actividades y recursos"</Card.Title>
                        <Card.Divider />
                        <IndicadorActividad />
                    </Card>
                </ScrollView>
            );
        }

        else if (this.props.actividades.errMess) {
            return (
                <ScrollView>
                    <Historia item={this.state.historia} />
                    <Card>
                        <Card.Title>"Actividades y recursos"</Card.Title>
                        <Card.Divider />
                        <Text>{this.props.actividades.errMess}</Text>
                    </Card>
                </ScrollView>
            );
        }
        else {
            return (

                <ScrollView>
                    <Historia item={this.state.historia} />

                    <Card>
                        <Card.Title>"Actividades y recursos"</Card.Title>
                        <Card.Divider />
                        <FlatList scrollEnabled={false}
                            data={this.props.actividades.actividades}
                            renderItem={renderActividadesItem}
                            keyExtractor={item => item.id.toString()}
                        />
                    </Card>
                </ScrollView>

            );
        }
    }
}

export default connect(mapStateToProps)(QuienesSomos);