import { Check, KeyboardArrowDownSharp, KeyboardArrowUpSharp, ReportProblemSharp } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { formatDate, iconMap, textMap } from "../../utils/Common";

interface Report {
    type: string,
    seen: boolean,
    date: string,
    text: string
}

interface ReportsListProps {
    garden: string,
    reports: Report[],
    openMessage: (garden: string, message: string) => void
}

interface ReportsListItemProps {
    garden: string,
    report: Report,
    openMessage: (garden: string, message: string) => void
}

function ReportsList(props: ReportsListProps) {
    const [expanded, setExpanded] = useState<boolean>(false);

    let newReports: number = 0;
    for(const report of props.reports) {
        if(! report.seen) {
            newReports++;
        }
    }

    return(
        <div className="flex flex-col shadow-md">
            <div className={`flex flex-row w-full py-2 px-2 bg-grayLight justify-between items-center cursor-pointer ${expanded? 'border-b border-gray' : ''}`} onClick={() => {setExpanded(! expanded);}}>
                <div className="flex flex-row items-center">
                    {newReports > 0 ? <ReportProblemSharp sx={{color: '#e55523', paddingRight: '4px'}}/> : <Check sx={{color: '#97d045', paddingRight: '4px'}}/>}
                    <Typography variant="h6" sx={{backgroundColor: "#F5F5F5"}}>
                        {`${props.reports.length} Meldungen (${newReports} neu)`}
                    </Typography>
                </div>
                {!expanded? <KeyboardArrowDownSharp sx={{backgroundColor: '#F5F5F5'}}/> : <KeyboardArrowUpSharp sx={{backgroundColor: '#F5F5F5'}}/>}
            </div>
            {expanded? 
            <div className="overflow-auto max-h-32">
                {props.reports.map((element, index) => {return <ReportsListItem key={index} report={element} openMessage={props.openMessage} garden={props.garden}/>})}
            </div>
            : <div/>}
        </div>
    );
}

function ReportsListItem(props: ReportsListItemProps) {
    return (
        <div className="w-full flex flex-col justify-between">
            <div className={`flex flex-row w-full border-b border-gray py-2 items-center justify-between px-4 bg-opacity-10 ${props.report.seen? 'bg-goLight' : 'bg-goOrange'}`}>
                <div className="flex flex-row">
                    {iconMap.get(props.report.type)}
                    <div 
                        onClick={() => {if(props.report.type === "Custom") { props.openMessage(props.garden, props.report.text)}}} 
                        className={`font-semibold pl-2 ${props.report.type === "Custom" ? 'hover:underline cursor-pointer' : ''}`}>
                            {textMap.get(props.report.type)}
                    </div>
                </div>
                <div className="text-gray font-light">{formatDate(props.report.date)}</div>
            </div>
        </div>
    );
}

export default ReportsList