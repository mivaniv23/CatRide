import { Modal, FlatList, Text, View, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useRouter } from 'expo-router';
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import {database} from "@/services/appwrite";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from 'react';

const recentRidesData = [
  {
    id: 1,
    driverFirstName: 'John',
    from: 'Catawba College',
    to: 'Walmart Supercenter',
    avatar: 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png'
  },
];

export default function IndexScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.$id) return;
      try {
        const response = await database.getDocument(
          'catride-db',
          'user-col',
          user.$id
        );
        setUserData(response);
      } catch (error) {
        console.error("Error fetching user document:", error);
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <View style={styles.container}>

      {/* Search Input */}
      <View style={styles.search}>
        <Ionicons name="search" size={24} style={styles.searchIcon}/>
        <TextInput
          style={styles.input}
          placeholder="Where are you going today?"
          placeholderTextColor="black"
          editable={true}
        />
      </View>

      <View style={styles.sectionTitleText}>
        <Text style={styles.text}>Your Current Location</Text>
      </View>

      <View style={styles.mapView}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        tintColor="black"
        showsPointsOfInterest={true}
        showsUserLocation={true}
        userInterfaceStyle="light"
        >
        </MapView>
      </View>

      <View style={styles.sectionTitleText}>
        <Text style={styles.text}>Recent Rides</Text>
      </View>

      <View style={styles.recentRides}>
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false} >
          {recentRidesData.map((ride) => (
            <View key={ride.id} style={styles.rideListItem}>
              <View style={styles.driverInfo}>
                <Image source={{ uri: ride.avatar }} style={styles.avatar} />
                <View style={styles.driverNameDiv}>
                  <Text style={styles.driverText}>Driver:</Text>
                  <Text style={styles.driverName}>{ride.driverFirstName}</Text>
                </View>
              </View>

              <View style={styles.rideDetails}>
                <View style={styles.rideDetailsInDiv1}>
                  <Text style={styles.lastRideTextBold}>From</Text>
                  <Text style={styles.lastRideTextBold}>To</Text>
                </View>
                <View style={styles.rideDetailsInDiv2}>
                  <Text style={styles.lastRideText}>{ride.from}</Text>
                  <Text style={styles.lastRideText}>{ride.to}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.sectionTitleText}>
        <Text style={styles.text}>Rewards</Text>
      </View>

      <View style={styles.rewards}>
        <Text style={styles.rewardsText}>Markiian, you've earned {userData?.points ?? 0} points</Text>
        <TouchableOpacity style={styles.rewardsButton} onPress={() => router.push('/rewards')}>
          <Text style={styles.rewardsButtonText}>Go to Rewards</Text>
        </TouchableOpacity> 
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding:15,
    paddingTop: 0,
    alignItems: "center",
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "98%",
    height: "6%",
    backgroundColor: "white",
    borderRadius: 20,
    marginVertical: "1%",
  },
  input: {
    fontSize: RFValue(12),
    width: "100%"
  },
  searchIcon: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  mapView: {
    borderRadius:25,
    overflow: "hidden",
    width: "98%",
    height: "35%",
    marginVertical: "1%",
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: "100%",
    height: "100%"
},
  sectionTitleText: {
    width: "100%",
    marginVertical: "1%",
  },
  text: {
    color: "white",
    fontWeight: 'bold',
    fontSize: RFValue(18),
  },
  recentRides: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    width: "98%",
    height: "30%",
    marginVertical: "1%",
  },
  rideListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: RFValue(4),
  },
  rideDetails: {
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: "60%",
    height: 50,
    borderRadius: 20
  },
  rewards: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: "10%",
    width: "98%",
    backgroundColor: 'white',
    borderRadius: 25,
    marginVertical: "1%",
  },
  driverInfo: {
    flexDirection: 'row',
    width: "40%",
    height: 60,
    padding: 4,
    alignItems: "center",
  },
  rideDetailsInDiv1: {
    justifyContent: "center",
    alignItems: 'flex-end',
    width: "20%",
    height: 50
  },  
  rideDetailsInDiv2: {
    justifyContent: "center",
    width: "80%",
    height: 50,
  },
  driverText: {
    fontWeight: 'bold',
    fontSize: RFValue(10),
  },
  driverName: {
    fontSize: RFValue(10),
  },
  driverNameDiv: {
    justifyContent: 'center',
    padding:5,
    width: "60%",
    height: 50,
  },
  avatar: {
    width: "35%",
    height: 50,
    marginRight: RFValue(5)
  },
  lastRideText:{
    fontSize: RFValue(10),
    paddingLeft: RFValue(4),
    padding: 1,
    maxWidth: "95%",
    maxHeight: 20
  },
  lastRideTextBold: {
    fontWeight: 'bold',
    padding: 1,
    maxHeight: 20
  },
  rewardsText: {
    fontSize: RFValue(10),
    fontWeight: 'bold',
    marginVertical: "1%",
  },
  rewardsButton: {
    backgroundColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: "1%",
  },
  rewardsButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue(12),
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  requestButton: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  requestButtonText: {
    color: 'white',
    fontSize: RFValue(14),
    fontWeight: 'bold',
  },
  cancelText: {
    color: 'gray',
    textAlign: 'center',
  },
});
