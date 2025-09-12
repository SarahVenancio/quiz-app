import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';

type WelcomeScreenProps = {
    onStartPress: () => void;
}

const logoImage = require('../assets/images/welcome.png'); 

export default function WelcomeScreen({ onStartPress }: WelcomeScreenProps) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.title}>Bem-vindo ao Cérebro em Chamas</Text>
                    
                    <Image source={logoImage} style={styles.logo} />

                    <Text style={styles.subtitle}>Teste seus conhecimentos em 15 perguntas de Conhecimentos Gerais, em diferentes níveis.</Text>

                    <TouchableOpacity style={styles.button} onPress={onStartPress}>
                        <Text style={styles.buttonText}>Iniciar Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    card: {
        backgroundColor: '#FFFFFF',
        padding: 40,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2C5D62',
        marginBottom: 10,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#4F4F4F',
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#2C5D62',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 15,
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