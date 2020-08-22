import React, { useState } from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
} from "react-google-maps";
import { StyledInfoWindow } from './styles'

function Map({ country, closeCountries }) {
  
  
  const [selectedCloseCountry, setSelectedCloseCountry] = useState(null);
  return (
    <div data-testid="map">
      {country && (
        <GoogleMap
          defaultZoom={5}
          defaultCenter={{
            lat: country.location.latitude,
            lng: country.location.longitude,
          }}
        >
          <Marker
            position={{
              lat: country.location.latitude,
              lng: country.location.longitude,
            }}
            onClick={() => {
              setSelectedCloseCountry(country);
            }}
            icon={{url: country.flag.svgFile, scaledSize: new window.google.maps.Size(40, 25)}}
          />
          {closeCountries &&
            closeCountries.map((cc, index) => (
              <Marker
                key={cc._id}
                position={{
                  lat: cc.location.latitude,
                  lng: cc.location.longitude,
                }}
                onClick={() => {
                  setSelectedCloseCountry(cc);
                }}
                icon={{url: cc.flag.svgFile, scaledSize: new window.google.maps.Size(40, 25)}}
              />
            ))}

          {selectedCloseCountry && (
            <StyledInfoWindow
              position={{
                lat: selectedCloseCountry.location.latitude,
                lng: selectedCloseCountry.location.longitude,
              }}
              onCloseClick={() => {
                setSelectedCloseCountry(null);
              }}
            >
              <div>
                <h4>Country name: {selectedCloseCountry.name}</h4>
                <h4>
                  Distance to {country.name}:{" "}
                  {Math.floor(selectedCloseCountry.distanceInKm) || 0} km
                </h4>
              </div>
            </StyledInfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
}

export default withScriptjs(withGoogleMap(Map));
