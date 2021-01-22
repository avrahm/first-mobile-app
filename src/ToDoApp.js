import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';

import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

/*SCREENS*/
import PendingToDoScreen from './Screens/PendingToDoScreen';
import CompleteToDoScreen from './Screens/CompleteToDoScreen';
import TodoScreen from './Screens/TodoScreen';
import { Button } from 'react-native';

//Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

//Create Stack Navigator
const Stack = createStackNavigator();

export default function ToDoApp() {

    const todos = useSelector(state => state.todos.todos);
    const pendingTodos = todos.filter(todos => todos.complete === false);

    return (
        <NavigationContainer>
            <Tab.Navigator
                //screenOptions allow to customize the appearance of the tab navigator
                //deconstuct the screenOptions routes to change the tabBarIcon dynamically by the route.name 
                screenOptions={({ route }) => ({
                    //tabBarIcon 
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'PendingTodos') {
                            iconName = focused
                                ? 'ios-information-circle'
                                : 'ios-information-circle-outline';
                        } else if (route.name === 'CompletedTodos') {
                            iconName = focused ? 'ios-list' : 'ios-list';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
            >

                <Tab.Screen
                    options={{
                        tabBarLabel: "Pending Todos", tabBarBadge: pendingTodos.length
                    }}
                    name="PendingTodos"
                    component={PendingStack} />
                {/* <Tab.Screen
                    options={{ tabBarLabel: "Completed Todos" }}
                    name="CompletedTodos"
                    component={CompleteToDoScreen} /> */}
            </Tab.Navigator>
        </NavigationContainer>
    )
}

function PendingStack({ navigation }) {
    const toggleShowAllFlag = useSelector(state => state.todos.toggleShowAllTodos);
    const dispatch = useDispatch()
    const toggleShowAllTodos = () => {
        dispatch({ type: 'TOGGLE_SHOWALL_TODOS' });
    }
    return (
        <Stack.Navigator
        >
            <Stack.Screen
                name="PendingTodoScreen"
                component={PendingToDoScreen}
                options={{
                    title: 'Pending',
                    headerRight: () => (
                        <Button
                            title={!toggleShowAllFlag ? 'Show All' : 'Hide'}
                            onPress={() => toggleShowAllTodos()}
                        />
                    )
                }}
            />
            <Stack.Screen
                name="TodoScreen"
                component={TodoScreen}
                options={() => ({
                    title: 'Details',
                    label: 'Back',
                })}
            />
        </Stack.Navigator>
    )
}