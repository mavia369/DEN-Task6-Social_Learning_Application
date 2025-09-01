import React, { useEffect, useState, useMemo } from "react";
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from "react-native";
import TaskCard from "../../components/cards/TaskCard";
import { FAB } from 'react-native-paper';
import { colors } from '../../theme/theme';
import Icon from '@react-native-vector-icons/material-design-icons';
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";


const TasksScreen = ({ navigation }) => {
    const userId = auth().currentUser?.uid;
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const filteredTasks = useMemo(() => {
        if (filter === 'pending') return tasks.filter(t => t.status === 'pending');
        if (filter === 'done') return tasks.filter(t => t.status === 'done');
        return tasks;
    }, [tasks, filter]);

    const handleAll = () => setFilter('all');
    const handlePending = () => setFilter('pending');
    const handleDone = () => setFilter('done');

    useEffect(() => {
        if (!userId) return;
        const tasksRef = database().ref(`/users/${userId}/tasks`);

        tasksRef.on("value", snapshot => {
            const data = snapshot.val() || {};
            const list = Object.entries(data).map(([id, item]) => ({ id, ...item }));
            setTasks(list);
            setLoading(false);
        });

        return () => tasksRef.off("value");
    }, [userId]);

    if (loading) {
        return (
            <View style={styles.pageLoaderContainer}>
                <ActivityIndicator size={50} color={colors.SecondaryDark} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.filterContainer}>
                <Text
                    style={[
                        styles.filterOptions,
                        {
                            backgroundColor: filter === 'all' ? colors.SecondaryDark : colors.primaryDark,
                            color: filter === 'all' ? colors.white : colors.SecondaryDark,
                        }
                    ]}
                    onPress={handleAll}
                >All</Text>

                <Text
                    style={[
                        styles.filterOptions,
                        {
                            backgroundColor: filter === 'pending' ? colors.SecondaryDark : colors.primaryDark,
                            color: filter === 'pending' ? colors.white : colors.SecondaryDark,
                        }
                    ]}
                    onPress={handlePending}
                >Pending</Text>

                <Text
                    style={[
                        styles.filterOptions,
                        {
                            backgroundColor: filter === 'done' ? colors.SecondaryDark : colors.primaryDark,
                            color: filter === 'done' ? colors.white : colors.SecondaryDark,
                        }
                    ]}
                    onPress={handleDone}
                >Done</Text>
            </View>
            {filteredTasks.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Icon name="clipboard-text-outline" size={60} color={colors.gray} />
                    <Text style={styles.emptyTitle}>No tasks yet</Text>
                    <Text style={styles.emptySubtitle}>Tap the + button to add your tasks!</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredTasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        <TaskCard item={item} />
                    }
                    contentContainerStyle={styles.flatListContent}
                />
            )}

            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.navigate('Add Task')}
                color={colors.white}
            />
        </View>
    );
};

export default TasksScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryLight,
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
        backgroundColor: colors.SecondaryDark
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.gray,
        marginTop: 15,
    },
    emptySubtitle: {
        fontSize: 16,
        color: colors.gray,
        marginTop: 5,
    },
    flatListContent: {
        paddingBottom: 80,
    },
    pageLoaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.primaryLight
    },

    filterContainer: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: colors.gray
    },

    filterOptions: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        width: '20%',
        textAlign: 'center',
        fontWeight: '500',
        borderColor: colors.SecondaryDark,
    }
});
