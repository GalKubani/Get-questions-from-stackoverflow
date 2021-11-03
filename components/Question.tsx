import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import Card from './Card';

type props = { questionData: any, isDarkMode: boolean }
const Question = ({ questionData, isDarkMode }: props) => {
    const [isVisible, setIsVisible] = useState(false)
    const styles = StyleSheet.create({
        questionContainer: {
            width: '90%',
            margin: 8,
            borderBottomWidth: 1,
            borderColor: '#ccc'
        },
        text: {
            color: isDarkMode ? 'white' : 'black',
        },
        modalText: {
            marginVertical: 4
        },
        title: {
            fontSize: 13,
            height: 45,
        },
        modal: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: isDarkMode ? 'black' : 'white',
        }
    });
    return (
        <View>
            <TouchableOpacity style={styles.questionContainer} onPress={() => { setIsVisible(true) }} >
                <Text style={{ ...styles.text, ...styles.title }}>{questionData.item.title}</Text>
            </TouchableOpacity>
            <Modal onRequestClose={() => { setIsVisible(false) }} visible={isVisible}>
                <View style={styles.modal}>
                    <Card isDarkMode={isDarkMode}>
                        <Text style={{ ...styles.text, ...styles.modalText }}>Title: {questionData.item.title}</Text>
                        <Text style={{ ...styles.text, ...styles.modalText }}>Created at: {new Date(questionData.item.creationDate).toDateString()}</Text>
                        <Text style={{ ...styles.text, ...styles.modalText }}>Total views: {questionData.item.totalViews}</Text>
                        <Text style={{ ...styles.text, ...styles.modalText }}>Total answers: {questionData.item.answerCount}</Text>
                        <Text style={{ ...styles.text, ...styles.modalText }}>Link: {questionData.item.link}</Text>
                    </Card>
                </View>
            </Modal>
        </View>

    );
};
export default Question;