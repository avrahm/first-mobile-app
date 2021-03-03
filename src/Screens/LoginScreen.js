import React, { useState } from 'react'
import { firebase } from '../firebase/config';
import { Text, View, TextInput, StyleSheet } from 'react-native';

import ButtonComponent from '../Components/ButtonComponent';
import { useNavigation } from '@react-navigation/native';
//https://www.freecodecamp.org/news/react-native-firebase-tutorial/
export default function LoginScreen() {

    const navigation = useNavigation();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onLoginPress = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        // navigation.navigate('Home', {user})
                        console.log(user);
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
            })
    }

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }}>
            <TextInput style={styles.TextInput}
                placeholder='name@example.com'
                keyboardType='email-address'
                onChangeText={(email => { setEmail(email) })}
            />

            <TextInput style={styles.TextInput}
                placeholder='password'
                keyboardType='visible-password'
                onChangeText={(password => { setPassword(password) })}
                secureTextEntry />

            <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
                <ButtonComponent text='Login' onPress={() => onLoginPress()} />
                <ButtonComponent text='Sign Up Screen' onPress={() => navigation.navigate('SignUpScreen')} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    TextInput: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        width: 300,
        margin: 10,
    }
})