import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';

type PlayerNameInputScreenProps = {
    onNameSubmitted: (name: string) => void;
};

export default function PlayerNameInputScreen({ onNameSubmitted }: PlayerNameInputScreenProps) {
    const [name, setName] = useState('');

    const handleSubmit = () => {
        if (name.trim()) {
            onNameSubmitted(name.trim());
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <Text style={styles.title}>Qual o seu nome?</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu nome aqui"
                    placeholderTextColor="#A9A9A9"
                    value={name}
                    onChangeText={setName}
                    autoFocus
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                    disabled={!name.trim()}
                >
                    <Text style={styles.buttonText}>Começar!</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#E8E8E8',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4F4F4F',
        marginBottom: 30,
    },
    input: {
        width: '80%',
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 15,
        fontSize: 18,
        color: '#4F4F4F',
        marginBottom: 20,
        textAlign: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    button: {
        backgroundColor: '#2C5D62',
        padding: 20,
        borderRadius: 15,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});