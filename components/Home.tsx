import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import Card from './Card';
import Question from './Question';
import { getQuestionsFromDB } from '../server/fetchData';

type props = { isDarkMode: boolean }
type userData = { avatar: string, userName: string, reputation: string }
const Home = ({ isDarkMode }: props) => {
    const [currentInput, setCurrentInput] = useState('')
    const [questions, setQuestions] = useState([])
    const [sortedQuestions, setSortedQuestions] = useState([])
    const [highlightedSortIndex, setHighlightedSortIndex] = useState(0)
    const [currentUser, setCurrentUser] = useState<userData>({ avatar: '', userName: '', reputation: '' })
    let URL = `https://api.stackexchange.com/2.3/users/${currentInput}/questions?order=desc&sort=activity&site=stackoverflow`

    const sortHandler = (option: string) => {
        let sortedArray = [...questions]
        switch (option) {
            case "views":
                sortedArray.sort((a: any, b: any) => { return b.totalViews - a.totalViews })
                setSortedQuestions(sortedArray)
                break;
            case "answers":
                sortedArray.sort((a: any, b: any) => { return b.answerCount - a.answerCount })
                setSortedQuestions(sortedArray)
                break;
            default:
                sortedArray.sort((a: any, b: any) => { return b.creationDate - a.creationDate })
                setSortedQuestions(sortedArray)
                break;
        }
    }
    const renderQuestion = (questionData: any) => (<Question isDarkMode={isDarkMode} questionData={questionData} />)
    const endInputHandler = async () => {
        let data: any = await getQuestionsFromDB(URL)
        if (data === "no user found") {
            setQuestions([])
            Alert.alert("No user data found")
            return
        }
        setCurrentUser(data.userData)
        setQuestions(data.questions)
        let sortedArray = data.questions.sort((a: any, b: any) => {
            return a.creationDate - b.creationDate
        })
        setSortedQuestions(sortedArray)
    }
    const styles = StyleSheet.create({
        home: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        titleContainer: {
            marginTop: 70
        },
        questionsList: {
            marginBottom: 20
        },
        title: {
            fontSize: 20,
            textAlign: 'center',
            color: isDarkMode ? 'white' : 'black'
        },
        textInput: {
            padding: 5,
            color: isDarkMode ? 'white' : 'black',
        },
        textInputContainer: {
            alignSelf: 'center',
            borderBottomWidth: 1,
            width: 200,
            borderColor: isDarkMode ? 'white' : 'black',
        },
        imageContainer: {
            width: '60%',
            height: '60%',
            overflow: 'hidden',
            marginBottom: 4,
        },
        image: {
            width: '100%',
            height: '100%'
        },
        text: {
            color: isDarkMode ? 'white' : 'black',
        },
        filtersContainer: {
            marginTop: 8,
            flexDirection: 'row-reverse'
        },
        button: {
            backgroundColor: isDarkMode ? 'black' : 'white',
            borderWidth: 1,
            borderColor: isDarkMode ? 'white' : 'black',
            margin: 2,
            padding: 1
        },
        highlighted: {
            backgroundColor: 'orange',
            borderWidth: 1,
            borderColor: isDarkMode ? 'white' : 'black',
            margin: 2,
            padding: 1
        }
    });
    return (
        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Get stack overflow posts</Text>
            </View>
            <KeyboardAvoidingView style={styles.textInputContainer}>
                <TextInput onEndEditing={endInputHandler}
                    keyboardType="number-pad"
                    style={styles.textInput}
                    placeholder="user id" value={currentInput}
                    maxLength={7}
                    onChangeText={text => setCurrentInput(text)} />
            </KeyboardAvoidingView>
            {questions.length > 0 &&
                <View style={styles.home}>
                    <Card isDarkMode={isDarkMode}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: currentUser.avatar }} />
                        </View>
                        <View>
                            <Text style={styles.text}>Username- {currentUser.userName}</Text>
                            <Text style={styles.text}>Reputation- {currentUser.reputation}</Text>
                            <Text style={styles.text}>Total of {questions.length} questions found</Text>
                        </View>
                        <View style={styles.filtersContainer}>
                            <Text style={styles.text}>Sort by: </Text>
                            <TouchableOpacity style={highlightedSortIndex === 0 ? styles.highlighted : styles.button} onPress={() => {
                                setHighlightedSortIndex(0)
                                sortHandler("")
                            }} >
                                <Text style={styles.text}>Date</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={highlightedSortIndex === 1 ? styles.highlighted : styles.button} onPress={() => {
                                setHighlightedSortIndex(1)
                                sortHandler("views")
                            }} >
                                <Text style={styles.text}>Views</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={highlightedSortIndex === 2 ? styles.highlighted : styles.button} onPress={() => {
                                setHighlightedSortIndex(2)
                                sortHandler("answers")
                            }} >
                                <Text style={styles.text}>Answers</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                    <FlatList style={styles.questionsList} keyExtractor={(item: any) => item.creationDate} data={sortedQuestions} renderItem={renderQuestion} />
                </View >}
        </View >
    );
};
export default Home;