import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";

type DifficultyScreenProps = {
    onSelectDifficulty: (difficulty: string) => void;
};

export default function DifficultyScreen({ onSelectDifficulty }: DifficultyScreenProps) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Escolha a Dificuldade</Text>
                
                <TouchableOpacity
                    style={styles.difficultyButton}
                    onPress={() => onSelectDifficulty("easy")}
                >
                    <Text style={styles.buttonText}>Fácil</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.difficultyButton}
                    onPress={() => onSelectDifficulty("medium")}
                >
                    <Text style={styles.buttonText}>Médio</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.difficultyButton}
                    onPress={() => onSelectDifficulty("hard")}
                >
                    <Text style={styles.buttonText}>Difícil</Text>
                </TouchableOpacity>

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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4F4F4F',
        marginBottom: 40,
    },
    difficultyButton: {
        backgroundColor: '#2C5D62',
        padding: 20,
        borderRadius: 15,
        width: '80%',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
});