import { KeyboardArrowDownSharp, KeyboardArrowUpSharp } from "@mui/icons-material";
import { Box, Card, CardContent, Typography } from "@mui/material";

interface QuestionAnswerCardProps {
    index: number,
    question: string,
    answer: string,
    opened: boolean
    setOpened: (index: number) => void
}

function QuestionAnswerCard(props: QuestionAnswerCardProps) {
    return (
        <Box 
            sx={{
                width: 1,
                display: 'flex',
                flexDirection: 'column',
                marginBottom: 2
            }}
        >               
            <Card onClick={() => {props.setOpened(props.index)}} sx={{cursor: 'pointer'}}>
                <CardContent sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Typography sx={{paddingRight: 2}} variant="h6">{props.question}</Typography>
                    {!props.opened? <KeyboardArrowDownSharp/> : <KeyboardArrowUpSharp/>}
                </CardContent>
            </Card>
            {props.opened?
            <div className="p-4 border-l border-r border-b border-1 border-goLight bg-grayLight">
                <Typography variant="body1">{props.answer}</Typography>
            </div> : <div/>}
        </Box>
    );
}

export default QuestionAnswerCard;