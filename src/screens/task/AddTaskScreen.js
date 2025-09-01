import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button, RadioButton } from 'react-native-paper';
import Icon from '@react-native-vector-icons/material-design-icons';
import DatePicker from 'react-native-date-picker';
import Toast from "../../components/Toast";
import { colors } from '../../theme/theme';
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from '../../components/Header'

const AddTaskScreen = ({ navigation }) => {
  const userId = auth().currentUser?.uid;
  const [title, setTitle] = useState('');
  const [description, setdescription] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('');

  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleAddTask = async () => {
    const finalTitle = title.trim() !== '' ? title : 'Untitled Task';
    const finalDescription = description.trim() !== '' ? description : 'No description';
    const finalDate = date !== '' ? date : 'No date selected';
    const finalPriority = priority !== '' ? priority : 'Not set';

    try {
      const taskRef = database().ref(`/users/${userId}/tasks`).push();
      await taskRef.set({
        title: finalTitle,
        description: finalDescription,
        date: finalDate,
        priority: finalPriority,
        status: "pending"
      });
    } catch (error) {
      Toast("Error", "Could not add task");
    }

    Toast('Task Added!');
    navigation.reset({ routes: [{ name: 'BottomTabs', state: { routes: [{ name: 'Tasks' }] } }] });
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header title="Add Task" showBackIcon={true} />

      <View style={styles.container}>
        <TextInput
          placeholder='Enter Title'
          value={title}
          mode="outlined"
          multiline={true}
          outlineColor={colors.primaryDark}
          activeOutlineColor={colors.SecondaryLight}
          onChangeText={setTitle}
          style={styles.textInput}
        />

        <TextInput
          placeholder="Description"
          value={description}
          mode="outlined"
          multiline={true}
          outlineColor={colors.primaryDark}
          activeOutlineColor={colors.SecondaryLight}
          onChangeText={setdescription}
          style={styles.textInputDescription}
        />

        <Text style={styles.label}>Date:</Text>

        <View style={styles.datePickerButtonContainer}>
          <Button
            style={styles.datePickerButton}
            labelStyle={styles.datePickerLabel}
            onPress={() => setOpenDatePicker(true)}
          >
            <View style={styles.datePickerContent}>
              <Icon
                name="calendar"
                size={20}
                color={colors.white}
                style={styles.calendarIcon}
              />
              <Text style={styles.datePickerText}>
                {date ? `Selected: ${date}` : 'Select Date'}
              </Text>
            </View>
          </Button>
        </View>

        <DatePicker
          modal
          open={openDatePicker}
          date={selectedDate}
          mode="date"
          buttonColor={colors.SecondaryDark}
          dividerColor='green'
          onConfirm={(dateValue) => {
            setOpenDatePicker(false);
            setSelectedDate(dateValue);
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const day = dateValue.getDate().toString().padStart(2, '0');
            const month = months[dateValue.getMonth()];
            const year = dateValue.getFullYear();
            const formatted = `${day}-${month}-${year}`;
            setDate(formatted);
          }}
          onCancel={() => {
            setOpenDatePicker(false);
          }}
        />

        <Text style={styles.label}>Priority:</Text>

        <RadioButton.Group
          onValueChange={(newValue) => setPriority(newValue)}
          value={priority}
        >
          <View style={styles.radioGroup}>
            {['Low', 'Medium', 'High'].map((priority_, index) => (
              <View key={index} style={styles.optionsContainer}>
                <RadioButton value={priority_} color={colors.SecondaryDark} />
                <Text>{priority_}</Text>
              </View>
            ))}
          </View>
        </RadioButton.Group>

        <View style={styles.submitButtonContainer}>
          <Button
            style={styles.submitButton}
            labelStyle={styles.buttonLabel}
            onPress={handleAddTask}
          >
            Add Task
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.SecondaryDark
  },

  container: {
    flex: 1,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 16,
    paddingTop: 20
  },

  textInput: {
    marginVertical: 10,
    height: 60,
  },

  textInputDescription: {
    marginVertical: 10,
    height: 100,
  },

  label: {
    marginTop: 40,
    marginBottom: 4,
    fontWeight: '500',
    fontSize: 18,
    color: colors.SecondaryDark
  },

  datePickerButtonContainer: {
    alignItems: 'flex-start',
  },

  datePickerButton: {
    backgroundColor: colors.SecondaryLight,
    borderWidth: 1,
  },

  datePickerLabel: {
    color: colors.primaryDark,
  },

  datePickerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  calendarIcon: {
    marginRight: 8,
  },

  datePickerText: {
    color: colors.primaryDark,
    fontWeight: 'bold',
  },

  radioGroup: {
    flexDirection: 'row',
  },

  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  submitButtonContainer: {
    marginTop: 20,
    flex: 1
  },

  submitButton: {
    backgroundColor: colors.SecondaryDark,
    marginTop: 20,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center'
  },

  buttonLabel: {
    fontSize: 20,
    paddingHorizontal: 20,
    color: colors.white
  }
});

export default AddTaskScreen;
