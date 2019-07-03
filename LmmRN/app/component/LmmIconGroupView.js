import React from 'react';
import { View,FlatList,TouchableOpacity,StyleSheet,Image,Text } from 'react-native';

class LmmIconGroupView extends React.Component {

    _keyGroupExtractor = (item) => {
        return item.id
    }

    _renderIconItem = ({item}) => {

        let iconWidth = this.props.width / this.props.colnum;
        let iconImageWidth = this.props.width / this.props.colnum / 2;

        return (<TouchableOpacity onPress={() => {
                this.props.iconOnPress(item)
            }}>
                <View style={[styles.iconContainer,
                    {width: iconWidth}]}>
                    <Image style={{
                        marginTop:5,
                        width: iconImageWidth,
                        height: iconImageWidth,
                    }} 
                    source={item.icon}/>
                    <Text style={styles.iconTitle}>
                        {item.title}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    render(){
        return <View>
            <FlatList
                keyExtractor={this._keyGroupExtractor}
                data={this.props.data}
                renderItem={this._renderIconItem}
                numColumns={this.props.colnum}/>
        </View>
    }
   
}

const styles = StyleSheet.create({
    iconContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
    },
    iconTitle: {
        marginTop: 5,
        marginBottom:5,
        fontSize: 12,
        width: 70,
        textAlign: 'center',
        alignItems: 'center'
    },
});

export default LmmIconGroupView;