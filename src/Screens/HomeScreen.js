import React from "react";

import { StyleSheet, Text, ScrollView, TouchableOpacity, View, Button } from "react-native";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { SearchBar } from 'react-native-elements';

import ButtonComponent from '../Components/ButtonComponent';
import { completeTodos, dueTodayTodos, inboxTodos } from "../redux/selectors/TodoSelectors";
import ListOfLists from "../Components/ListOfLists";

export default function ListScreen({ navigation }) {

  const todos = completeTodos(useSelector(state => state.todos.todos));
  const dueTodayTodosTotal = dueTodayTodos(todos).length;
  const inboxTodosTotal = inboxTodos(todos).length;

  return (
    <View style={styles.container}>
      <SearchBar lightTheme={true} placeholder='Search' />
      <ScrollView>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.cardView}
              onPress={() => navigation.navigate('TodoListScreen', { listId: 0, title: 'Inbox' })}
            >
              <View style={{ alignItems: 'center' }}>
                <ButtonComponent icon='mail-outline' />
                <Text>Inbox</Text>
              </View>
              <Text style={{ fontSize: 34 }}>{inboxTodosTotal}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cardView}
              onPress={() => navigation.navigate('TodoListScreen', { listType: 'today', title: 'Due Today' })}
            >
              <View style={{ alignItems: 'center' }}>
                <ButtonComponent icon='calendar' />
                <Text>Today</Text>
              </View>
              <Text style={{ fontSize: 34 }}>{dueTodayTodosTotal}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.cardView}
            onPress={() => navigation.navigate('TodoListScreen', { listType: 'all', title: 'All' })}
          >
            <View style={{ alignItems: 'center' }}>
              <ButtonComponent icon='archive-outline' />
              <Text>All</Text>
            </View>
            <Text style={{ fontSize: 34 }}>{todos.length}</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Text style={{ fontSize: 24, padding: 8 }}>
            My Lists
        </Text>

          <Button title='Add new list' onPress={() => navigation.navigate('AddListScreen')} />
        </View>
        <View>
          <ListOfLists
            showHiddenLists={false}
            handleOnPress={(list) => navigation.navigate('TodoListScreen', list)} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardView: {
    flexDirection: "row",
    borderWidth: 1,
    textAlign: "left",
    // alignItems:'center',
    justifyContent: 'space-between',
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 15,
    margin: 3,
    flex: 1
  }
});
