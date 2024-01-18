import { AgricultureSharp, ChatBubbleOutlineSharp, ContentCutSharp, GrassSharp, PeopleSharp, PestControlSharp, ScheduleSharp, WaterDropSharp } from "@mui/icons-material";
import { ReactNode } from "react";

export const formatDate = (date: Date) => {
    return date.toLocaleString('de-DE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export enum ReportCategory {
    MESSAGE = 'Message',
    WATER = 'Water',
    HARVEST = 'Harvest',
    PRUNE = 'Prune',
    FERTILIZE = 'Fertilize',
    PEST = 'Pest'
};
export const iconMap: { [key in ReportCategory]: ReactNode } = {
    [ReportCategory.MESSAGE]: <ChatBubbleOutlineSharp/>,
    [ReportCategory.WATER]: <WaterDropSharp/>,
    [ReportCategory.HARVEST]: <AgricultureSharp/>,
    [ReportCategory.PRUNE]: <ContentCutSharp/>,
    [ReportCategory.FERTILIZE]: <GrassSharp/>,
    [ReportCategory.PEST]: <PestControlSharp/>
};
export const textMap: { [key in ReportCategory]: string } = {
    [ReportCategory.MESSAGE]: 'Nachricht',
    [ReportCategory.WATER]: 'Nicht genug Wasser!',
    [ReportCategory.HARVEST]: 'Bereit für die Ernte!',
    [ReportCategory.PRUNE]: 'Pflanze trimmen!',
    [ReportCategory.FERTILIZE]: 'Planze düngen!',
    [ReportCategory.PEST]: 'Achtung Schädling!'
};
export const descriptionMap: { [key in ReportCategory]: string } = {
    [ReportCategory.MESSAGE]: 'Kontakt aufnehmen - Geben Sie Tipps oder beschreiben Sie Probleme!',
    [ReportCategory.WATER]: 'Dieser Garten könnte Wasser gebrauchen.',
    [ReportCategory.HARVEST]: 'Es ist Erntezeit!',
    [ReportCategory.PRUNE]: 'Die Planzen sollten zurückgeschnitten werden.',
    [ReportCategory.FERTILIZE]: 'Dünger würde der Pflanze gut tun.',
    [ReportCategory.PEST]: 'Ein Schädling ist in den Garten eingedrungen.'
};

export enum InfoSection {
    COMMUNITY = 'Community',
    EFFICIENCY = 'Efficiency',
    QUALITY = 'Quality'
}
export const infoIconMap: { [key in InfoSection]: ReactNode } = {
    [InfoSection.COMMUNITY]: <PeopleSharp fontSize="large"/>,
    [InfoSection.EFFICIENCY]: <ScheduleSharp fontSize="large"/>,
    [InfoSection.QUALITY]: <GrassSharp fontSize="large"/>
};
export const infoTitleMap: { [key in InfoSection]: string } = {
    [InfoSection.COMMUNITY]: 'Gemeinschaft fördern',
    [InfoSection.EFFICIENCY]: 'Effizienz steigern',
    [InfoSection.QUALITY]: 'Gartenqualiät verbessern'
};
export const infoDescriptionMap: { [key in InfoSection]: string } = {
    [InfoSection.COMMUNITY]: "Verbinden Sie sich mit anderen Gartenliebhabern und arbeiten Sie gemeinsam an einem blühenden Gemeinschaftsgarten.",
    [InfoSection.EFFICIENCY]: "Sparen Sie Zeit und Mühe durch direktes Feedback und nützliche Tipps von Besuchern, ohne ständig vor Ort sein zu müssen.",
    [InfoSection.QUALITY]: "Profitieren Sie von kollektivem Wissen und Erfahrung, um Ihren Garten optimal zu pflegen und zu gestalten."
};
