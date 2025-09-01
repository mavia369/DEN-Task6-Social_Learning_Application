import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DeleteModal from "../modals/DeleteModal";
import { colors } from '../../theme/theme';
import Icon from '@react-native-vector-icons/material-design-icons';
import Separator from "../Separator";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Toast from "../Toast";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import { useNavigation } from '@react-navigation/native';

const TaskCard = ({ item }) => {
  const navigation = useNavigation();
  const [showDelModal, setShowDelModal] = useState(false);
  const userId = auth().currentUser?.uid;

  const handleDelete = async (taskId) => {
    try {
      await database().ref(`/users/${userId}/tasks/${taskId}`).remove();
    } catch (error) {
      Toast("Error", "Could not delete task");
    }
    Toast('Task Deleted.');
  };

  const handleMark = async () => {
    if (item.status === 'pending') {
      try {
        await database()
          .ref(`/users/${userId}/tasks/${item.id}/status`)
          .set('done')
      } catch (error) {
        Toast("Error", "Could not change status");
      }
    }
    else if (item.status === 'done') {
      try {
        await database()
          .ref(`/users/${userId}/tasks/${item.id}/status`)
          .set('pending')
      } catch (error) {
        Toast("Error", "Could not change status");
      }
    }
  }

  return (
    <View style={styles.cardContainer}>
      <DeleteModal
        showDelModal={showDelModal}
        setShowDelModal={setShowDelModal}
        onConfirmDelete={() => handleDelete(item.id)}
      />

      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={[styles.statusTxt, {
            color: item.status === 'pending' ? colors.white : colors.SecondaryDark,
            backgroundColor: item.status === 'pending' ? colors.danger : colors.lime,
          }]}
          >{item.status === 'pending' ? 'Pending' : 'Done'}</Text>
        </View>

        <Menu>
          <MenuTrigger>
            <Icon name="dots-vertical" size={28} color={colors.white} />
          </MenuTrigger>

          <MenuOptions customStyles={styles.menuOptions}>
            <MenuOption onSelect={handleMark}>
              <View style={styles.menuRow}>
                <Text
                  style={styles.menuText}>
                  {item.status === 'pending' ? 'Mark as Done' : 'Mark as Pending'}
                </Text>
                <Icon
                  name={item.status === 'pending' ? "check-bold" : "clock-alert"}
                  size={20}
                  color={colors.SecondaryLight}
                  style={styles.menuIcon}
                />
              </View>
            </MenuOption>

            <Separator />

            <MenuOption onSelect={() => navigation.navigate("Edit Task", { task: item })}>
              <View style={styles.menuRow}>
                <Text style={styles.menuText}>Edit</Text>
                <Icon name="pencil" size={20} color={colors.SecondaryLight} style={styles.menuIcon} />
              </View>
            </MenuOption>

            <Separator />

            <MenuOption onSelect={() => setShowDelModal(true)}>
              <View style={styles.menuRow}>
                <Text style={[styles.menuText, styles.dangerText]}>Delete</Text>
                <Icon name="delete" size={20} color={colors.danger} style={styles.menuIcon} />
              </View>
            </MenuOption>
          </MenuOptions>
        </Menu>

      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.footerRow}>
          <Text style={styles.date}>{item.date}</Text>
          <Text
            style={[
              styles.priority,
              {
                backgroundColor:
                  item.priority === 'High' ? colors.danger :
                    item.priority === 'Medium' ? colors.yellow :
                      item.priority === 'Low' ? colors.green : colors.gray,
              }
            ]}
          >
            Priority: {item.priority}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    borderRadius: 30,
    padding: 20,
    backgroundColor: colors.SecondaryLight,
    elevation: 10,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 20,
    color: colors.white,
    fontWeight: 'bold',
  },

  menuOptions: {
    optionsWrapper: {
      backgroundColor: colors.white,
      padding: 8,
      borderRadius: 10,
      elevation: 5,
      position: 'absolute',
      top: 30,
      right: 10,
    },
  },

  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  menuText: {
    color: colors.SecondaryLight,
    fontSize: 16,
  },

  dangerText: {
    color: colors.danger,
  },

  menuIcon: {
    marginLeft: 8,
  },

  description: {
    fontSize: 18,
    marginBottom: 30,
    color: colors.SecondaryLight
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  date: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.SecondaryDark
  },

  priority: {
    fontSize: 15,
    fontWeight: '500',
    padding: 6,
    borderRadius: 10,
    color: 'white',
  },

  footerContainer: {
    backgroundColor: colors.primaryDark,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
    height: 200
  },

  titleContainer: {
    width: '90%'
  },

  statusTxt: {
    fontSize: 16,
    padding: 3,
    fontWeight: '500',
    borderRadius: 6,
    width: '24%',
    textAlign: 'center',
    marginVertical: 10,
  }

});
