import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Platform,
    TouchableOpacity
} from 'react-native';

import backIcon from '../image/back.png'
import themeconfig from '../config/theme'
import {naviHeight, paddingTop} from '../utils/ScreenUtil'
import {height} from 'react-native-dimension';

class CLNavigatorHeader extends Component {
    constructor(props) {
        super(props);
    }

    goback = () => {
        const {goBack} = this.props.navigation;
        goBack();
    }

    render() {
        const {
            title,
            leftTitle,
            leftImage,
            leftAction,
            rightTitle,
            rightImage,
            rightAction,
            leftItem,
        } = this.props;

        let leftaction = leftAction;
        if (leftAction == undefined) {
            leftaction = this.goback;
        }

        let leftimg;
        if (leftItem === null) {
            leftimg = leftImage
        } else if (leftItem == "hide") {

        } else {
            if (leftImage == undefined && leftTitle == undefined) {
                leftimg = backIcon
            } else {
                leftimg = leftImage
            }
        }

        return (
            <View style={[styles.barView, this.props.style]}>
                <View style={styles.showView}>
                    {leftTitle
                        ? <TouchableOpacity
                            style={styles.leftNav}
                            onPress={() => {
                                leftaction()
                            }}>
                            <View
                                style={{
                                    alignItems: 'center'
                                }}>
                                <Text style={styles.barButton}>{leftTitle}</Text>
                            </View>
                        </TouchableOpacity>
                        : (leftimg
                            ? <TouchableOpacity
                                style={styles.leftNav}
                                onPress={() => {
                                    leftaction()
                                }}>
                                <View
                                    style={{
                                        alignItems: 'center'
                                    }}>
                                    <Image source={leftimg}/>
                                </View>
                            </TouchableOpacity>
                            : null)
                    }
                    {title
                        ? <Text style={styles.title}>{title || ''}</Text>
                        : null
                    }
                    {rightTitle
                        ? <TouchableOpacity
                            style={styles.rightNav}
                            onPress={() => {
                                rightAction()
                            }}>
                            <View
                                style={{
                                    alignItems: 'center'
                                }}>
                                <Text style={styles.barButton}>{rightTitle}</Text>
                            </View>
                        </TouchableOpacity>
                        : (rightImage
                            ? <TouchableOpacity
                                style={styles.rightNav}
                                onPress={() => {
                                    rightAction()
                                }}>
                                <View
                                    style={{
                                        alignItems: 'center'
                                    }}>
                                    <Image
                                        source={rightImage}
                                        style={{
                                            width: 24,
                                            height: 22
                                        }}/>
                                </View>
                            </TouchableOpacity>
                            : null)
                    }

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    barView: {
        height: naviHeight,
        backgroundColor: themeconfig.maincolor
    },
    showView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: paddingTop,
        height: 44
    },
    title: {
        color: 'white',
        fontSize: 18.0
    },
    leftNav: {
        position: 'absolute',
        top: 8,
        bottom: 8,
        left: 8,
        justifyContent: 'center'
    },
    rightNav: {
        position: 'absolute',
        right: 8,
        top: 8,
        bottom: 8,
        justifyContent: 'center'
    },
    barButton: {
        color: 'white',
        fontSize: 18
    }
})

export default CLNavigatorHeader