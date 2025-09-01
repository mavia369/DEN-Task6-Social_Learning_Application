import { View, Text, Modal, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { colors } from '../../theme/theme';
import { Button } from "react-native-paper";

const DeleteModal = (props) => {
  return (
    <Modal
      visible={props.showDelModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => props.setShowDelModal(false)}
    >
      <TouchableWithoutFeedback onPress={() => props.setShowDelModal(false)}>
        <View style={styles.modalBackground}>
          {/* To prevent closing when tapping inside the modal */}
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Are you sure you want to delete this task?
              </Text>

              <View style={styles.buttonRow}>
                <Button
                  labelStyle={styles.buttonLabel}
                  onPress={() => props.setShowDelModal(false)}
                >
                  Cancel
                </Button>

                <Button
                  style={styles.confirmButton}
                  labelStyle={[styles.buttonLabel, styles.confirmLabel]}
                  onPress={() => {
                    props.setShowDelModal(false);
                    props.onConfirmDelete();
                  }}
                >
                  Confirm
                </Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  modalContent: {
    padding: 24,
    backgroundColor: colors.white,
    borderRadius: 30,
    elevation: 10,
    borderColor: colors.danger,
    borderWidth: 2
  },
  modalText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
    color: colors.SecondaryDark
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  buttonLabel: {
    fontSize: 15,
    paddingHorizontal: 16,
    color: colors.SecondaryLight,
  },
  confirmButton: {
    backgroundColor: colors.danger,
  },
  confirmLabel: {
    color: colors.white,
  },
});

export default DeleteModal;
