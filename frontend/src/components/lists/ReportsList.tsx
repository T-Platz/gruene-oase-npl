import { Check, KeyboardArrowDownSharp, KeyboardArrowUpSharp, ReportProblemSharp } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useState } from "react";
import { formatDate, ReportCategory, iconMap, textMap } from "../../utils/Common";
import { Report } from "../../utils/Types";
import BallLoader from "../loaders/BallLoader";

interface ReportsListProps {
    lotNr: number,
    garden: string,
    reports?: Report[],
    issues: number,
    getReports: (lotNr: number) => Promise<void>,
    viewReports: (lotNr: number) => void,
    openMessage: (garden: string, message: string) => void
}

interface ReportsListItemProps {
    garden: string,
    report: Report,
    openMessage: (garden: string, message: string) => void
}

function ReportsList(props: ReportsListProps) {
    const [expanded, setExpanded] = useState<boolean>(false);
    // Helper state to avoid iterating through report array
    const [firstTimeCollapse, setFirstTimeCollapse] = useState<boolean>(true);

    const onClickExpand = async () => {
        if(expanded) {
            if(firstTimeCollapse) {
                props.viewReports(props.lotNr);
                setFirstTimeCollapse(false);
            }
        }
        else {
            if(!props.reports) {
                await props.getReports(props.lotNr);
            }
        }
        setExpanded(! expanded);
    }

    return(
        <div className="flex flex-col shadow-md">
            <div className={`flex flex-row w-full py-2 px-2 bg-grayLight justify-between items-center cursor-pointer ${expanded? 'border-b border-gray' : ''}`} onClick={onClickExpand}>
                <div className="flex flex-row items-center">
                    {props.issues > 0 ? <ReportProblemSharp sx={{color: '#e55523', paddingRight: '4px'}}/> : <Check sx={{color: '#97d045', paddingRight: '4px'}}/>}
                    <Typography variant="h6" sx={{backgroundColor: "#F5F5F5"}}>
                        {
                            props.issues === 1 ? '1 neue Meldung!' :
                            `${props.issues} neue Meldungen`
                        }
                    </Typography>
                </div>
                {!expanded? <KeyboardArrowDownSharp sx={{backgroundColor: '#F5F5F5'}}/> : <KeyboardArrowUpSharp sx={{backgroundColor: '#F5F5F5'}}/>}
            </div>
            {expanded? 
            <div className="overflow-auto max-h-32">
                {props.reports ? props.reports.map((element, index) => {return <ReportsListItem key={index} report={element} openMessage={props.openMessage} garden={props.garden}/>}) : <div className="my-2"><BallLoader/></div>}
            </div>
            : <div/>}
        </div>
    );
}

function ReportsListItem(props: ReportsListItemProps) {
    return (
        <div className="w-full flex flex-col justify-between">
            <div className={`flex flex-row w-full border-b border-gray py-2 items-center justify-between px-4 bg-opacity-10 ${props.report.viewed? 'bg-goLight' : 'bg-goOrange'}`}>
                <div className="flex flex-row">
                    {iconMap[props.report.category]}
                    <div 
                        onClick={() => {if(props.report.category === ReportCategory.MESSAGE) { props.openMessage(props.garden, props.report.description)}}} 
                        className={`font-semibold pl-2 ${props.report.category === ReportCategory.MESSAGE ? 'hover:underline cursor-pointer' : ''}`}>
                            {textMap[props.report.category]}
                    </div>
                </div>
                <div className="text-gray font-light">{formatDate(new Date(props.report.timestamp))}</div>
            </div>
        </div>
    );
}

export default ReportsList