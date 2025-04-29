import { View, Text, StyleSheet } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

const Map = () => {
    return (
        <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        tintColor="black"
        showsPointsOfInterest='false'
        showsUserLocation={true}
        userInterfaceStyle="light"

        >
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        width: "100%",
        height: "100%"
    },
});
export default Map;