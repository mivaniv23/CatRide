import { Text, View, StyleSheet, ImageBackground, Image, ScrollView, TouchableOpacity } from 'react-native';
import backgroundImage from "../../assets/images/Group1.png";
import { RFValue } from 'react-native-responsive-fontsize';
import * as Progress from 'react-native-progress';
import RewardsComponent from '../../components/rewardsComponent';
import QuestsComponent from '../../components/questsComponent';
import {database} from "@/services/appwrite";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from 'react';

const quests = [
  {
    id: 1,
    imageUrl: "https://pngfre.com/wp-content/uploads/Darts-4-1024x1024.png",
    description: "Request 3 rides in a week",
    progress: 0.6,
    current: 3,
    goal: 5,
  },
  {
    id: 2,
    imageUrl: "https://pngfre.com/wp-content/uploads/Darts-4-1024x1024.png",
    description: "Be a driver for 2 rides",
    progress: 0.25,
    current: 1,
    goal: 4,
  },
  {
    id: 3,
    imageUrl: "https://pngfre.com/wp-content/uploads/Darts-4-1024x1024.png",
    description: "Add 3 friends to your account",
    progress: 0.33,
    current: 1,
    goal: 3,
  },
];

const offers = [
  {
    id: 1,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png",
    promoName: "Starbucks",
    description: "Get a 20% discount on your next order",
    pointsRequired: 200,
  },
  {
    id: 2,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Dunkin%27_2022.svg/500px-Dunkin%27_2022.svg.png",
    promoName: "Dunkin",
    description: "Free coffee with any donut purchase",
    pointsRequired: 150,
  },
  {
    id: 3,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/340px-McDonald%27s_Golden_Arches.svg.png",
    promoName: "Blue 51",
    description: "Free drink at Blue 51 with points",
    pointsRequired: 300,
  },
  {
    id: 4,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Amazon_2024.svg/2880px-Amazon_2024.svg.png",
    promoName: "Amazon",
    description: "Get a $10 Amazon gift card",
    pointsRequired: 500,
  },
  // Add more offers as needed...
];

export default function RewardsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [questsModalVisible, questsSetModalVisible] = useState(false)
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
      <ImageBackground imageStyle={styles.imageStyle} source={backgroundImage} style={styles.image}>
        <Text style={styles.textTotal}>Total Points</Text>
        <Text style={styles.amount}>{userData?.points ?? 0}</Text>
        <TouchableOpacity style={styles.seeRewardsButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.seeRewardsButtonText}>See Rewards</Text>
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.sectionTitle}>
        <Text style={styles.sectionTitleText}>Get Rewarded</Text>
        <TouchableOpacity style={styles.seeAllButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.seeAllButtonText}>See all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rewardsDiv}>
        <ScrollView horizontal style={styles.rewardsScrollView} showsHorizontalScrollIndicator={false}>
          {offers.map((offer) => (
            <View key={offer.id} style={styles.rewardsListItem}>
              <View style={styles.rewardsListItemTop}>
                <Image style={styles.rewardsImage} source={{ uri: offer.imageUrl }} />
                <View style={styles.textView}>
                  <Text style={styles.textMain}>{offer.promoName}</Text>
                  <Text style={styles.textDescription}>
                    {offer.description}
                  </Text>
                </View>
              </View>
              <View style={styles.rewardsListItemBottom}>
                <TouchableOpacity style={styles.buttonClaim}>
                  <Text style={styles.buttonClaimText}>Claim for {offer.pointsRequired} points</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.sectionTitle}>
        <Text style={styles.sectionTitleText}>Quests</Text>
        <TouchableOpacity style={styles.seeAllButton} onPress={() => questsSetModalVisible(true)} >
          <Text style={styles.seeAllButtonText}>See all</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.questsDiv}>
  <ScrollView showsVerticalScrollIndicator={false}>
    {quests.map((quest) => (
      <View key={quest.id} style={styles.questsListItem}>
        <Image style={styles.questImage} source={{ uri: quest.imageUrl }} />
        <View style={styles.questTextContainer}>
          <View style={styles.progressContainer}>
            <Progress.Bar
              progress={quest.current / quest.goal}
              color="#4CAF50"
              unfilledColor="#e0e0e0"
              borderRadius={25}
              height={20}
              width={RFValue(180)}
              style={styles.progressBar}
            >
              <Text style={styles.progressDescription}>{quest.description}</Text>
              </Progress.Bar>
            <Text style={styles.progressText}>
              {quest.current}/{quest.goal}
            </Text>
          </View>
        </View>
      </View>
    ))}
  </ScrollView>
</View>
{/* Rewards Modal */}
<RewardsComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        offers={offers}
      />
{/* Quests Modal */}
<QuestsComponent
        questsModalVisible={questsModalVisible}
        questsSetModalVisible={questsSetModalVisible}
        quests={quests}
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    padding: 15,
    paddingTop: 0,
  },
  image: {
    marginVertical: "1%",
    width: "98%",
    height: "50%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', 
  },
  textTotal: {
    fontSize: RFValue(16),
  },
  amount: {
    fontSize: RFValue(30),
    fontWeight: 'bold'
  },
  seeRewardsButton: {
    marginTop: "1%",
    backgroundColor: 'black',
    paddingHorizontal: "5%",
    padding: 5,
    borderRadius: 30,
  },
  seeRewardsButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue(16),
  },
  sectionTitleText: {
    color: "white",
    fontWeight: 'bold',
    fontSize: RFValue(18),
    width: "85%",
  },
  sectionTitle: {
    width: "100%",
    marginVertical: "1%",
    flexDirection: 'row'
  },
  seeAllButton: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  seeAllButtonText: {
    color: 'white',
    fontSize: RFValue(12),
    fontStyle: 'italic',
  },
  rewardsDiv: {
    width: "98%",
    height: "19%",
    backgroundColor: 'white',
    marginVertical: "1%",
    borderRadius: 25,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 15,
  },
  rewardsScrollView: {
    width: "100%",
    height: "100%",
  },
  rewardsListItem: {
    padding: 10,
    backgroundColor: '#D9D9D9',
    borderRadius: 35,
    width: RFValue(130),
    height: "100%",
    marginRight: 5,
  },
  rewardsListItemTop: {
    height: "60%",
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  rewardsListItemBottom: {
    height: "40%",
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  rewardsImage: {
    resizeMode: 'contain',
    height: "100%",
    width: "40%",
    padding: 2,
    marginRight: 5,
  },
  textView: {
    padding: 5,
    alignItems: 'flex-start',
    height: "100%",
    width: '60%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textMain: {
    fontSize: RFValue(9),
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 2,
  },
  textDescription: {
    fontSize: RFValue(8),
    color: 'black',
    lineHeight: RFValue(8),
  },
  buttonClaim: {
    alignItems: 'center',
    justifyContent: 'center',
    height: RFValue(15),
    width: "100%",
    backgroundColor: 'black',
    padding: 2,
    borderRadius: 25,
    marginRight: 3
  },
  buttonClaimText: {
    color: "white",
    fontWeight: 'bold',
    fontSize: RFValue(8),
  },
  questsDiv: {
    width: "98%",
    height: "19%",
    backgroundColor: 'white',
    marginVertical: "1%",
    borderRadius: 25,
    padding: 10,
  },
  questsListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: RFValue(4),
    justifyContent: 'flex-start',
    padding: 10,
  },
  questImage: {
    width: "12%",
    height: RFValue(40),
    resizeMode: 'contain',
    marginRight: 10,
    padding: 2
  },
  questTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  progressDescription: {
    position: 'absolute',
    top: 2,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: RFValue(8),
    fontWeight: 'bold',
    color: 'black',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  progressBar: {
    borderWidth: 0,
    backgroundColor: "white",
    borderWidth: 2,
    height: "100%",
    marginRight: 10,
  },
  progressText: {
    fontSize: RFValue(10),
    color: 'black',
    textAlign: 'center',
  },
});

