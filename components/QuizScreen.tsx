import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Vibration } from "react-native";

type Question = {
    question: string;
    options: string[];
    correctAnswer: string;
};

type QuizScreenProps = {
    currentQuestion: Question;
    selectedOption: string | null;
    isOptionsDisabled: boolean;
    questionIndex: number;
    totalQuestions: number;
    onOptionPress: (option: string) => void;
    onNextQuestion: () => void;
};

export default function QuizScreen({
    currentQuestion,
    selectedOption,
    isOptionsDisabled,
    questionIndex,
    totalQuestions,
    onOptionPress,
    onNextQuestion,
}: QuizScreenProps) {
    const [timer, setTimer] = useState(15);

    // Reinicia o temporizador toda vez que a `currentQuestion` muda
    useEffect(() => {
        setTimer(15);
    }, [currentQuestion]);

    // Lógica do temporizador e do avanço da pergunta
    useEffect(() => {
        // Se já houver uma opção selecionada, para o temporizador.
        if (selectedOption) {
            return;
        }

        const interval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer <= 1) {
                    clearInterval(interval);
                    Vibration.vibrate(500);
                    onNextQuestion();
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        // Limpa o intervalo quando o componente é desmontado ou as dependências mudam.
        return () => clearInterval(interval);
    }, [selectedOption, onNextQuestion]);

    const getOptionStyle = (option: string) => {
        if (selectedOption) {
            const isCorrect = option === currentQuestion.correctAnswer;
            const isSelected = option === selectedOption;

            if (isCorrect) {
                return styles.correctOption;
            }
            if (isSelected && !isCorrect) {
                return styles.incorrectOption;
            }
        }
        return {};
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.timerContainer}>
                        <View style={styles.timerCircle}>
                            <Text style={styles.timerText}>{timer}</Text>
                        </View>
                    </View>
                    <Text style={styles.progressText}>{questionIndex + 1}/{totalQuestions}</Text>
                </View>

                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>{currentQuestion.question}</Text>
                </View>

                <View style={styles.optionsContainer}>
                    {currentQuestion.options.map((option) => (
                        <TouchableOpacity
                            key={option}
                            style={[styles.option, getOptionStyle(option)]}
                            onPress={() => onOptionPress(option)}
                            disabled={isOptionsDisabled || timer === 0}
                        >
                            <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {selectedOption && (
                    <TouchableOpacity style={styles.nextButton} onPress={onNextQuestion}>
                        <Text style={styles.nextButtonText}>Próxima</Text>
                    </TouchableOpacity>
                )}
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
        padding: 20,
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    progressText: {
        fontSize: 16,
        color: '#4F4F4F',
        marginTop: 10,
    },
    timerContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    timerCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#C7F0E6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2C5D62',
    },
    questionContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        padding: 24,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#4F4F4F',
    },
    optionsContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 10,
    },
    option: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 3,
    },
    optionText: {
        fontSize: 16,
        color: '#4F4F4F',
    },
    correctOption: {
        backgroundColor: '#C7F0E6',
    },
    incorrectOption: {
        backgroundColor: '#FFD1D1',
    },
    nextButton: {
        backgroundColor: '#2C5D62',
        padding: 18,
        borderRadius: 15,
        marginTop: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});