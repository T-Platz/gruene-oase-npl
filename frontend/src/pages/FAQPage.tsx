import { HelpCenterSharp } from "@mui/icons-material";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import QuestionAnswerCard from "../components/cards/QuestionAnswerCard";
import faq from "../utils/GartenService_FAQs.json";

function FAQPage() {
    const [openedQuestions, setOpenedQuestions] = useState<number[]>([]);
    const {height, width} = useWindowDimensions();

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
                            Hier finden Sie Antworten zu den häufig gestellten Fragen zu <strong>Grüne Oase NPL</strong>.<br/>Falls Sie ein Anliegen haben, welches nicht auf dieser Seite behandelt wird, können Sie uns unter <strong>gruene.oase.npl@gmail.com</strong> kontaktieren.
                        </Typography>
                    </div>
                </div>
            </div>
            <div className="mt-8 mb-8">
                {faq.map((element, index) => {
                    return (<QuestionAnswerCard key={index} index={index} opened={openedQuestions.includes(index)} setOpened={handleClick} question={element.q} answer={element.a}/>);
                })}
            </div>
        </div>
        </>
    );
}

export default FAQPage;