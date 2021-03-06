import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Viewer, Entity } from 'resium';
import { Cartesian3 } from 'cesium';

function Map() {

    return (
        <Viewer full>
            <Entity position={Cartesian3.fromDegrees(0, 0, 0)} point={{pixelSize: 20}} />
        </Viewer>
    );

}

export default hot(Map);