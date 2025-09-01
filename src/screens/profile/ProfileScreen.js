import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { ActivityIndicator } from 'react-native-paper';
import { colors } from '../../theme/theme';
import { useState, useCallback } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';

const ProfileScreen = ({ navigation }) => {
    const [showLogoutLoader, setShowLogoutLoader] = useState(false);
    const [showPageLoader, setShowPageLoader] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [totalTasks, setTotalTasks] = useState(null)
    const [pendingTasks, setPendingTasks] = useState(null)
    const [doneTasks, setDoneTasks] = useState(null)

    useFocusEffect(
        useCallback(() => {
            const user = auth().currentUser;

            if (user) {
                setName(user.displayName);
                setEmail(user.email);
            }

            const tasksRef = database().ref(`/users/${user.uid}/tasks`);
            const onTasksChange = tasksRef.on('value', snapshot => {
                if (snapshot.exists()) {
                    let tasks = snapshot.val();
                    let total = Object.keys(tasks).length;
                    let pending = 0;
                    let done = 0;

                    Object.values(tasks).forEach(task => {
                        if (task.status === "pending") {
                            pending++;
                        } else if (task.status === "done") {
                            done++;
                        }
                    });

                    setTotalTasks(total);
                    setPendingTasks(pending);
                    setDoneTasks(done);
                } else {
                    setTotalTasks(0);
                    setPendingTasks(0);
                    setDoneTasks(0);
                }
            });

            const profileRef = database().ref(`/users/${user.uid}/profileImage`);
            const onProfileChange = profileRef.on('value', snapshot => {
                if (snapshot.exists()) {
                    setProfileImage(snapshot.val());
                }
                setShowPageLoader(false);
            });

            return () => {
                profileRef.off('value', onProfileChange);
                tasksRef.off('value', onTasksChange);
            };
        }, [])
    );

    const handleLogout = async () => {
        setShowLogoutLoader(true);
        await auth().signOut();
    };

    const handlePickImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && !response.errorCode) {
                const uri = response.assets[0].uri;
                setProfileImage(uri);

                // Save the URI in Realtime Database
                const userId = auth().currentUser.uid;
                database()
                    .ref(`/users/${userId}/profileImage`)
                    .set(uri)
                    .then(() => console.log("Image URI saved in database"))
                    .catch(err => console.error("Error saving image URI:", err));
            }
        });
    };

    if (showPageLoader) {
        return (
            <View style={styles.pageLoaderContainer}>
                <ActivityIndicator size={50} color={colors.SecondaryDark} />
            </View>
        )
    }

    return (
        <View style={styles.safeContainer}>
            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={handlePickImage} style={styles.profileImgContainer}>
                    {
                        profileImage ? (
                            <Image
                                source={{ uri: profileImage }}
                                style={styles.profileImg}
                            />
                        ) : (
                            <Image
                                source={require('../../assets/images/user.png')}
                                style={styles.defProfileImg}
                            />
                        )
                    }
                </TouchableOpacity>
                <View style={styles.nameEmailContainer}>
                    <View>
                        <Text style={styles.nameLabelTxt}>Name:</Text>
                        <Text style={styles.nameLabelTxt}>Email:</Text>
                    </View>
                    <View style={styles.nameEmailTxtContainer}>
                        <Text style={styles.nameTxt}>{name}</Text>
                        <Text style={styles.nameTxt}>{email}</Text>
                    </View>
                </View>
            </View>


            <View style={styles.taskCountContainer}>
                <View style={styles.taskRow}>
                    <Text style={styles.taskLabel}>Total Tasks:</Text>
                    <Text style={styles.taskValue}>{totalTasks}</Text>
                </View>
                <View style={styles.taskRow}>
                    <Text style={styles.taskLabel}>Pending Tasks:</Text>
                    <Text style={styles.taskValue}>{pendingTasks}</Text>
                </View>
                <View style={styles.taskRow}>
                    <Text style={styles.taskLabel}>Done Tasks:</Text>
                    <Text style={styles.taskValue}>{doneTasks}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.scoreContainer}
                onPress={() => { navigation.navigate('Quiz History') }}
            >
                <Text style={styles.highScoreHeading}>
                    Quiz History
                </Text>
            </TouchableOpacity>

            <View style={styles.logoutBtnContainer}>
                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    {
                        showLogoutLoader ?
                            <ActivityIndicator size={24} color={'white'} />
                            :
                            <Text style={styles.logoutBtnTxt}>Log out</Text>
                    }
                </TouchableOpacity>
                <Text style={styles.versionTxt}>Version 1.0.0</Text>
            </View>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    safeContainer: {
        backgroundColor: colors.primaryLight,
        flex: 1,
        padding: 10
    },

    logoutBtn: {
        backgroundColor: colors.danger,
        borderRadius: 10,
        marginTop: 40,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    logoutBtnTxt: {
        color: colors.white,
        fontSize: 18,
        fontWeight: '600'
    },

    versionTxt: {
        fontSize: 16,
        marginVertical: 8,
        textAlign: 'center',
        color: colors.gray
    },

    logoutBtnContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },

    pageLoaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.primaryLight
    },

    profileContainer: {
        backgroundColor: colors.SecondaryLight,
        borderRadius: 20,
        marginTop: 10,
        padding: 14,
    },

    profileImgContainer: {
        height: 100,
        width: 100,
        borderRadius: 50,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    profileImg: {
        height: 90,
        width: 90,
        borderRadius: 50,
        borderColor: colors.primaryDark,
        borderWidth: 4,
    },

    defProfileImg: {
        height: 90,
        width: 90,
        borderRadius: 50,
        borderColor: colors.primaryDark,
        borderWidth: 3
    },

    nameEmailContainer: {
        flexDirection: 'row',
        backgroundColor: colors.primaryDark,
        borderRadius: 10,
        paddingHorizontal: 10
    },

    nameLabelTxt: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 50,
        color: colors.SecondaryDark
    },

    nameTxt: {
        fontSize: 18,
        lineHeight: 50,
        color: colors.SecondaryLight
    },

    nameEmailTxtContainer: {
        flex: 1,
        marginLeft: 10
    },

    scoreContainer: {
        width: "100%",
        height: "10%",
        backgroundColor: colors.primaryDark,
        alignSelf: 'center',
        borderRadius: 20,
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 20,
        marginTop: 12,
    },

    highScoreHeading: {
        fontSize: 20,
        color: colors.SecondaryDark,
        fontWeight: 'bold'
    },

    taskCountContainer: {
        width: "100%",
        height: 150,
        backgroundColor: colors.SecondaryLight,
        alignSelf: 'center',
        borderRadius: 20,
        justifyContent: 'space-around',
        padding: 14,
        marginTop: 12,
    },

    taskRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.primaryDark,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    taskLabel: {
        fontSize: 18,
        color: colors.SecondaryDark,
        fontWeight: 'bold',
        lineHeight: 30,
    },
    taskValue: {
        fontSize: 18,
        color: colors.SecondaryLight,
        lineHeight: 30,
        fontWeight: '500'
    },
})