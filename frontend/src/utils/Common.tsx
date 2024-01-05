/**
 * Helper methods
 */

import { AgricultureSharp, ChatBubbleOutlineSharp, ContentCutSharp, GrassSharp, PeopleSharp, PestControlSharp, ScheduleSharp, WaterDropSharp } from "@mui/icons-material";
import { ReactNode } from "react";

export const formatDate = (date: Date) => {
    // Date formated to english 
    return date.toLocaleString('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
};

export const notificationTypes = [
  'Custom', 'Water', 'Harvest', 'Pruning', 'Fertilization', 'Pest'
]

export const iconMap = new Map<string, ReactNode>(
  [
    ['Custom', <ChatBubbleOutlineSharp/>],
    ['Pest', <PestControlSharp/>],
    ['Water', <WaterDropSharp/>],
    ['Harvest', <AgricultureSharp/>],
    ['Pruning', <ContentCutSharp/>],
    ['Fertilization', <GrassSharp/>]
  ]
);

export const infoIconList = [<PeopleSharp fontSize="large"/>, <ScheduleSharp fontSize="large"/>, <GrassSharp fontSize="large"/>];
export const infoTitleList = ['Gemeinschaft fördern', 'Effizienz steigern', 'Gartenqualiät verbessern']
export const infoDescriptionList = [
  "Verbinden Sie sich mit anderen Gartenliebhabern und arbeiten Sie gemeinsam an einem blühenden Gemeinschaftsgarten.",
  "Sparen Sie Zeit und Mühe durch direktes Feedback und nützliche Tipps von Besuchern, ohne ständig vor Ort sein zu müssen.",
  "Profitieren Sie von kollektivem Wissen und Erfahrung, um Ihren Garten optimal zu pflegen und zu gestalten."
]

export const textMap = new Map<string, string>(
  [
    ['Custom', "Nachricht"],
    ['Pest', "Achtung Schädling!"],
    ['Water', "Nicht genug Wasser!"],
    ['Harvest', "Bereit für die Ernte!"],
    ['Pruning', "Pflanze trimmen!"],
    ['Fertilization', "Planze düngen!"]
  ]
);

export const descriptionMap = new Map<string, string>(
  [
    ['Custom', "Kontakt aufnehmen - Geben Sie Tipps oder beschreiben Sie Probleme!"],
    ['Pest', "Ein Schädling ist in den Garten eingedrungen."],
    ['Water', "Dieser Garten könnte Wasser gebrauchen."],
    ['Harvest', "Es ist Erntezeit!"],
    ['Pruning', "Die Planzen sollten zurückgeschnitten werden."],
    ['Fertilization', "Dünger würde der Pflanze gut tun."]
  ]
);
