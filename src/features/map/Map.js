import React from 'react';
import { Viewer, Entity } from 'resium';
import { hot } from 'react-hot-loader/root';
import { Cartesian3 } from 'cesium';

function Map() {

    render() {
        return (
            <Viewer full>
                <Entity position={Cartesian3.fromDegrees(0, 0, 0)} point={ 0, auto} />
            </Viewer>
        );
    }

}
