import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from "react-native";

type ResultScreenProps = {
    score: number;
    totalQuestions: number;
    onPlayAgain: () => void;
    onShowRanking: () => void; // Adicione esta propriedade
};

export default function ResultScreen({ score, totalQuestions, onPlayAgain, onShowRanking }: ResultScreenProps) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.resultCard}>
                    <Text style={styles.title}>Quiz Encerrado</Text>
                    <Text style={styles.scoreText}>Seus pontos:</Text>
                    <Text style={styles.scoreValue}>
                        {score}/{totalQuestions}
                    </Text>

                    <TouchableOpacity style={styles.button} onPress={onPlayAgain}>
                        <Text style={styles.buttonText}>Reiniciar</Text>
                    </TouchableOpacity>

                    {/* Adicione este novo botão */}
                    <TouchableOpacity style={styles.rankingButton} onPress={onShowRanking}>
                        <Text style={styles.rankingButtonText}>Ver Ranking</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    resultCard: {
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#4F4F4F',
    },
    scoreText: {
        fontSize: 18,
        marginBottom: 5,
        color: '#4F4F4F',
    },
    scoreValue: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#212121',
    },
    button: {
        backgroundColor: '#C7F0E6',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 15,
        marginBottom: 15,
    },
    buttonText: {
        color: '#2C5D62',
        fontSize: 18,
        fontWeight: 'bold',
    },
    rankingButton: {
        backgroundColor: '#2C5D62',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 15,
    },
    rankingButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});