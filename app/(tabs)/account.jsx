import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useRouter } from 'expo-router';
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from 'react';
import {database} from "@/services/appwrite";

export default function AccountScreen() {
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
      <View style={styles.imageAndInfo}>
        <View style={styles.imageView}>
          <Image style={styles.image} source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/500px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg"}}/>
        </View>
        <View style={styles.info}>
          <Text style={styles.userNameText}>
            {user?.name || 'No Name'}
          </Text>
          <Text style={styles.emailText}>
            {user?.email || 'No Email'}
          </Text>
          <TouchableOpacity style={styles.changeAvatarButton}>
            <Text style={styles.changeAvatarButtonText}>Change Avatar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.sectionTitleText}>
        <Text style={styles.text}>Dashboard</Text>
      </View>
      <View style={styles.dashboardView}>
        <View style={styles.rowDashboardView}>
          <View style={styles.dasboardElement}>
            <Text style={styles.textMain}>
              Total Rides:
            </Text>
            <Text style={styles.amountText}>
              {userData?.totalRides ?? 0}
            </Text>
          </View>
          <View style={styles.dasboardElement}>
            <Text style={styles.textMain}>
              Total Miles:
            </Text>
            <Text style={styles.amountText}>
              1200
            </Text>
          </View>
        </View>
        <View style={styles.rowDashboardView}>
          <View style={styles.dasboardElement}>
            <Text style={styles.textMain}>
              Points Earned:
            </Text>
            <Text style={styles.amountText}>
            {userData?.points ?? 0}
            </Text>
          </View>
          <View style={styles.dasboardElement}>
          <Text style={styles.textMain}>
              No Idea:
            </Text>
            <Text style={styles.amountText}>
              12000
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.sectionTitleText}>
        <Text style={styles.text}>Driver Mode</Text>
      </View>
      <View style={styles.driverModeView}>
        <TouchableOpacity style={styles.driverModeButton}>
          <Text style={styles.driverModeButtonText}>
            Start Driving
          </Text>
        </TouchableOpacity>
        <Text style={styles.wantToDriveText}>
          Want to drive with us?
        </Text>
        <TouchableOpacity style={styles.applyHereButton}>
          <Text style={styles.applyHereButtonText}>
            Apply Here
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logOutButton} onPress={logout}>
        <Text style={styles.logOutButtonText} >
          Log out
        </Text>
      </TouchableOpacity>
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
  sectionTitleText: {
    width: "100%",
    marginVertical: "1%",
  },
  text: {
    color: "white",
    fontWeight: 'bold',
    fontSize: RFValue(18),
  },
  imageAndInfo: {
    alignItems: 'center',
    width: "98%",
    height: "20%",
    flexDirection:'row',
    padding: 5,
    marginVertical: "1%",
  },
  imageView: {
    width: "35%",
    height: "90%",
    backgroundColor: "black",
    borderRadius: 20,
  },
  info: {
    width: "60%",
    height: "90%",
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    marginLeft: "5%",
    padding: 15
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  userNameText: {
    fontWeight: 'bold',
    fontSize: RFValue(16),
    marginVertical: RFValue(2),
  },
  emailText: {
    fontSize: RFValue(10),
    marginVertical: RFValue(2),
    marginTop: RFValue(6)
  },
  changeAvatarButton: {
    backgroundColor: "black",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "7%",
    borderRadius: 20,
    padding: 2
  },
  changeAvatarButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue(14)
  },
  dashboardView: {
    width: "98%",
    height: "40%",
    backgroundColor: 'white',
    borderRadius: 20,
    marginVertical: "1%",
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowDashboardView: {
    height: "45%",
    width: "98%",
    margin: RFValue(4),
    flexDirection: 'row'
  },
  dasboardElement: {
    width: "46%",
    marginHorizontal: '2%',
    height: '100%',
    backgroundColor: '#D9D9D9',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textMain: {
    fontSize: RFValue(16),
    marginVertical: '2%'
  },
  amountText: {
    fontWeight: 'bold',
    fontSize: RFValue(30),
    marginVertical: '2%'
  },
  driverModeView: {
    width: "98%",
    height: "20%",
    backgroundColor: 'white',
    borderRadius: 20,
    marginVertical: "1%",
    alignItems:'center',
    justifyContent: 'center',
  },
  driverModeButton: {
    backgroundColor: "black",
    width: "50%",
    height: "25%",
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: RFValue(4),
  },
  driverModeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue(16),
  },
  wantToDriveText: {
    fontWeight: 'bold',
    marginVertical: RFValue(2),
    fontSize: RFValue(12)
  },
  applyHereButton: {
    marginVertical: RFValue(2)
  },
  applyHereButtonText: {
    fontWeight: 'bold',
    fontSize: RFValue(12),
    textDecorationLine: 'underline',
  },
  logOutButton: {
    backgroundColor: 'red',
    width: "80%",
    alignItems: 'center',
    height: "5%",
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: "3%",
  },
  logOutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue(16)
  }

});
