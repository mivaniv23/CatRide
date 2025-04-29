import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';



export default function RewardsComponent({ modalVisible, setModalVisible, offers }) {
  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>All Rewards</Text>
          <ScrollView style={styles.scrollView}>
            {offers.map((offer) => (
              <View key={offer.id} style={styles.rewardCard}>
                <Image source={{ uri: offer.imageUrl }} style={styles.image} />
                <View style={styles.textContainer}>
                  <Text style={styles.promoName}>{offer.promoName}</Text>
                  <Text style={styles.description}>{offer.description}</Text>
                  <View style={styles.pointsAndButtonRow}>
                    <Text style={styles.points}>Requires {offer.pointsRequired} points</Text>
                    <TouchableOpacity
                      style={styles.claimButton}
                      onPress={() => console.log(`Claimed: ${offer.promoName}`)}
                    >
                      <Text style={styles.claimButtonText}>Claim</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    width: '90%',
    height: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    width: '100%',
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  image: {
    width: RFValue(50),
    height: RFValue(50),
    resizeMode: 'contain',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  promoName: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    fontSize: RFValue(12),
    color: '#333',
    marginVertical: 2,
  },
  pointsAndButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  points: {
    fontSize: RFValue(10),
    color: '#666',
  },
  claimButton: {
    backgroundColor: 'black',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  claimButtonText: {
    color: 'white',
    fontSize: RFValue(12),
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    width: "60%"
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue(12)
  },
});
