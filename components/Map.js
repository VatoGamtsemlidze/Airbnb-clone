import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import {useState} from "react";
import {getCenter} from "geolib";

function Map({searchResults}){

    const [selectedLocation, setSelectedLocation] = useState({});

    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat,
    }))

    const center = getCenter(coordinates)

    const [viewport, setViewport] = useState({
        width:'100%',
        height:'100%',
        latitude: center.latitude,
        Longitude: center.longitude,
        zoom:11,
    });


    return(
        <ReactMapGL
            mapStyle="mapbox://styles/vatexa/ckuwq7tm396jx17mrdf0thc0n"
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {searchResults.map((result,index) => (
                <div key={index}>
                    <Marker longitude={result.long} latitude={result.lat}>
                        <p onClick={() => setSelectedLocation(result)} className="cursor-pointer text-2xl animate-bounce">
                            📌
                        </p>
                    </Marker>
                {/*On marker Click*/}
                    {selectedLocation.long === result.long ? (
                        <Popup
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    ) : null}
                </div>
            ))}
        </ReactMapGL>
    )
}
export default Map;