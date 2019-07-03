import {requireNativeComponent} from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

class LmmBaiduMapView extends React.Component {
    render() {
        return <LmmBaiduMap {...this.props}/>;
    }
}

LmmBaiduMapView.propTypes = {
    /**
     * A Boolean value that determines whether the user may use pinch
     * gestures to zoom in and out of the map.
     */
    center: PropTypes.shape({lat: PropTypes.number.isRequired, lng: PropTypes.number.isRequired})
};

var LmmBaiduMap = requireNativeComponent('LmmBaiduMap', LmmBaiduMapView);

// requireNativeComponent automatically resolves 'RNTMap' to 'RNTMapManager'
module.exports = LmmBaiduMapView;