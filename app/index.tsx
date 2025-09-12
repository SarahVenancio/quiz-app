import { useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QuizScreen from '../components/QuizScreen';
import ResultScreen from '../components/ResultScreen';
import WelcomeScreen from '../components/WelcomeScreen';
import DifficultyScreen from '../components/DifficultyScreen';
import PlayerName from '../components/PlayerName'; 
import RankingScreen from '../components/RankingScreen';
import questionsData from '../questions.json';

type Question = {
    question: string;
    options: string[];
    correctAnswer: string;
};

type QuizData = {
    easy: Question[];
    medium: Question[];
    hard: Question[];
};

type RankingEntry = {
    name: string;
    score: number;
};

type RankingData = {
    easy: RankingEntry[];
    medium: RankingEntry[];
    hard: RankingEntry[];
};

const shuffleArray = (array: Question[]): Question[] => {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

export default function HomePage() {
    const [isWelcomeScreenVisible, setIsWelcomeScreenVisible] = useState(true);
    const [playerName, setPlayerName] = useState<string | null>(null);
    const [difficulty, setDifficulty] = useState<string | null>(null);
    const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
    
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [isRankingVisible, setIsRankingVisible] = useState(false);

    const quizData: QuizData = questionsData as QuizData;

    const handleStartPress = () => {
        setIsWelcomeScreenVisible(false);
        setPlayerName(null);
    };
    
    const handleNameSubmitted = (name: string) => {
        setPlayerName(name);
    };

    const handleSelectDifficulty = (selectedDifficulty: string) => {
        setDifficulty(selectedDifficulty);
        const questionsForDifficulty = quizData[selectedDifficulty as keyof QuizData];
        setShuffledQuestions(shuffleArray(questionsForDifficulty));
    };

    const handleOptionPress = (option: string) => {
        if (currentQuestion) {
            if (option === currentQuestion.correctAnswer) {
                setScore(score + 1);
            }
            setSelectedOption(option);
            setIsOptionsDisabled(true);
        }
    };

    const saveRanking = async () => {
        try {
            const currentRankingJSON = await AsyncStorage.getItem('quiz_ranking');
            const currentRanking: RankingData = currentRankingJSON ? JSON.parse(currentRankingJSON) : { easy: [], medium: [], hard: [] };

            if (difficulty && playerName) {
                const newEntry = { name: playerName, score: score };
                currentRanking[difficulty as keyof RankingData].push(newEntry);
                
                currentRanking[difficulty as keyof RankingData].sort((a, b) => b.score - a.score);
                
                await AsyncStorage.setItem('quiz_ranking', JSON.stringify(currentRanking));
            }
        } catch (e) {
            Alert.alert("Erro", "Não foi possível salvar o seu resultado no ranking.");
        }
    };
    
    const handleNextQuestion = async () => {
        if (currentQuestionIndex < shuffledQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setIsOptionsDisabled(false);
        } else {
            // Fim do quiz, salva o ranking e mostra a tela de resultados
            await saveRanking();
            setIsQuizFinished(true);
        }
    };

    const handlePlayAgain = () => {
        setIsWelcomeScreenVisible(true);
        setIsQuizFinished(false);
        setPlayerName(null);
        setDifficulty(null);
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setIsOptionsDisabled(false);
        setScore(0);
        setShuffledQuestions([]);
    };

    const handleShowRanking = () => {
        setIsRankingVisible(true);
    };

    const handleGoBackFromRanking = () => {
        setIsRankingVisible(false);
    };

    const currentQuestion = shuffledQuestions[currentQuestionIndex];

    if (isWelcomeScreenVisible) {
        return <WelcomeScreen onStartPress={handleStartPress} />;
    }
    
    if (isRankingVisible) {
        return <RankingScreen onGoBack={handleGoBackFromRanking} />;
    }

    if (!playerName) {
        return <PlayerName onNameSubmitted={handleNameSubmitted} />;
    }

    if (!difficulty) {
        return <DifficultyScreen onSelectDifficulty={handleSelectDifficulty} />;
    }

    if (isQuizFinished) {
        return (
            <ResultScreen
                score={score}
                totalQuestions={shuffledQuestions.length}
                onPlayAgain={handlePlayAgain}
                onShowRanking={handleShowRanking}
            />
        );
    }
    
    if (shuffledQuestions.length > 0) {
        return (
            <QuizScreen
                currentQuestion={currentQuestion}
                selectedOption={selectedOption}
                isOptionsDisabled={isOptionsDisabled}
                onOptionPress={handleOptionPress}
                onNextQuestion={handleNextQuestion}
                questionIndex={currentQuestionIndex}
                totalQuestions={shuffledQuestions.length}
            />
        );
    }
    
    return null;
}