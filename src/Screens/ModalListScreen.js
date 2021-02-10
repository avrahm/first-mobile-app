import React from 'react'
import { Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListOfLists from '../Components/ListOfLists';
import DeleteListConfirmation from '../Components/DeleteListConfirmation';

export default function ModalListScreen({ route }) {

    const navigation = useNavigation();
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {route.params.showLists && (
                <ListOfLists
                    showHiddenLists={true}
                    handleOnPress={route.params.handleOnPress}
                />
            )}
            {route.params.showConfirmDeleteListOptions && (
                <DeleteListConfirmation
                    list={route.params.list}
                    deleteTasksAssignedToList={route.params.deleteTasksAssignedToList} />
            )}
            <Button onPress={() => navigation.goBack()} title="Dismiss" />
        </View>
    )
}