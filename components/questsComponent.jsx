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
import * as Progress from 'react-native-progress';



export default function QuestsComponent({ questsModalVisible, questsSetModalVisible, quests }) {
  return (
    <Modal
      visible={questsModalVisible}
      transparent
      animationType="slide"
      onRequestClose={() => questsSetModalVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>All Quests</Text>
          <ScrollView style={styles.scrollView}>
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
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => questsSetModalVisible(false)}
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
