import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RankingEntry = {
    name: string;
    score: number;
};

// O tipo deve usar as chaves em inglês para corresponder ao que é salvo
type RankingData = {
    easy: RankingEntry[];
    medium: RankingEntry[];
    hard: RankingEntry[];
};

type RankingScreenProps = {
    onGoBack: () => void;
};

// Mapeamento para traduzir as chaves para português para a exibição
const levelMap: { [key: string]: string } = {
    easy: "FÁCIL",
    medium: "MÉDIO",
    hard: "DIFÍCIL",
};

export default function RankingScreen({ onGoBack }: RankingScreenProps) {
    const [ranking, setRanking] = useState<RankingData>({ easy: [], medium: [], hard: [] });

    useEffect(() => {
        const loadRanking = async () => {
            try {
                // Lê o ranking com as chaves em inglês
                const jsonValue = await AsyncStorage.getItem('quiz_ranking');
                if (jsonValue != null) {
                    setRanking(JSON.parse(jsonValue));
                }
            } catch (e) {
                Alert.alert("Erro", "Não foi possível carregar o ranking.");
            }
        };

        loadRanking();
    }, []);

    const renderRankingItem = ({ item, index }: { item: RankingEntry, index: number }) => (
        <View style={styles.rankingItem}>
            <Text style={styles.rankingPosition}>{index + 1}º</Text>
            <Text style={styles.rankingName}>{item.name}</Text>
            <Text style={styles.rankingScore}>{item.score}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Ranking</Text>
                
                {Object.keys(ranking).map((level) => (
                    <View key={level} style={styles.rankingSection}>
                        {/* Usa o mapeamento para traduzir o título */}
                        <Text style={styles.levelTitle}>{levelMap[level]}</Text>
                        {ranking[level as keyof RankingData].length > 0 ? (
                            <FlatList
                                data={ranking[level as keyof RankingData].slice(0, 3)}
                                renderItem={renderRankingItem}
                                keyExtractor={(item, index) => `${level}-${index}`}
                                scrollEnabled={false}
                            />
                        ) : (
                            <Text style={styles.noDataText}>Nenhum resultado ainda.</Text>
                        )}
                    </View>
                ))}

                <TouchableOpacity style={styles.goBackButton} onPress={onGoBack}>
                    <Text style={styles.goBackText}>Voltar</Text>
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
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#4F4F4F',
        marginBottom: 15,
    },
    rankingSection: {
        width: '100%',
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    levelTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2C5D62',
        marginBottom: 2,
        textAlign: 'center',
    },
    rankingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    rankingPosition: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4F4F4F',
    },
    rankingName: {
        fontSize: 18,
        color: '#4F4F4F',
        flex: 1,
        marginLeft: 15,
    },
    rankingScore: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4F4F4F',
    },
    noDataText: {
        textAlign: 'center',
        color: '#A9A9A9',
        fontSize: 16,
        fontStyle: 'italic',
    },
    goBackButton: {
        marginTop: 15,
        backgroundColor: '#2C5D62',
        padding: 15,
        borderRadius: 15,
        width: '60%',
        alignItems: 'center',
    },
    goBackText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});