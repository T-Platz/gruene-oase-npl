import { HelpCenterSharp } from "@mui/icons-material";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import QuestionAnswerCard from "../components/cards/QuestionAnswerCard";

function FAQPage() {
    const [openedQuestions, setOpenedQuestions] = useState<number[]>([]);
    const {height, width} = useWindowDimensions();
    const questionAnswerMock = [
        {
            question: 'Question 1?',
            answer: 'Answer 1 answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.\nAnswer answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.Answer answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.\nAnswer answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.\n'
        },
        {
            question: 'Question 2?',
            answer: 'Answer 2 answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.\nAnswer answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.Answer answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.\nAnswer answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.\n'
        },
        {
            question: 'Question 3?',
            answer: 'Answer 3 answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.\nAnswer answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.Answer answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.\nAnswer answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.\n'
        },
        {
            question: 'Question 4?',
            answer: 'Answer 4 answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.\nAnswer answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.Answer answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.\nAnswer answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.\n'
        },
        {
            question: 'Question 5?',
            answer: 'Answer 5 answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.\nAnswer answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.Answer answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.\nAnswer answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.\n'
        },
        {
            question: 'Question 6?',
            answer: 'Answer 6 answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.\nAnswer answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.Answer answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.\nAnswer answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.\n'
        },
        {
            question: 'Question 7?',
            answer: 'Answer 7 answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.\nAnswer answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.Answer answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.\nAnswer answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.\n'
        },
        {
            question: 'Question 8?',
            answer: 'Answer 8 answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.\nAnswer answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.Answer answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.\nAnswer answer answer Answer answer answer. Answer answer answerAnswer answer answerAnswer answer answerAnswer answer answer.\n'
        },
    ];

    const handleClick = (index: number) => {
        // Add if new
        if(! openedQuestions.includes(index)) {
            setOpenedQuestions(openedQuestions => [...openedQuestions, index]);
        }
        // Remove if already in array
        else {
            setOpenedQuestions(openedQuestions => openedQuestions.filter(number => number !== index));
        }
    }

    return (
        <>
        <div className="flex flex-col">
            <div className="flex flex-row w-full justify-between items-center">
                <div className="flex flex-col pr-2">
                    <Typography variant={width >= 640 ? "h3": "h4"} color='#057038'>Fragen & Antworten</Typography>
                    <div className="flex flex-row items-center">
                        <Typography variant={width >= 640 ? "h6": "body1"} sx={{color: '#97d045'}}>
                            Hier finden Sie Antworten zu den häufig gestellten Fragen zu <strong>Grüne Oase NPL</strong>.<br/>Falls Sie ein Anliegen haben, welches nicht auf dieser Seite behandelt wird, können Sie uns unter <strong>grueneoase_npl@gmail.com</strong> kontaktieren.
                        </Typography>
                    </div>
                </div>
            </div>
            <div className="mt-8 mb-8">
                {questionAnswerMock.map((element, index) => {
                    return (<QuestionAnswerCard key={index} index={index} opened={openedQuestions.includes(index)} setOpened={handleClick} question={questionAnswerMock[index].question} answer={questionAnswerMock[index].answer}/>);
                })}
            </div>
        </div>
        </>
    );
}

export default FAQPage;