/**
 * Helper methods
 */

import { AgricultureSharp, ChatBubbleOutlineSharp, ContentCutSharp, GrassSharp, PestControlSharp, WaterDropSharp } from "@mui/icons-material";
import { ReactNode } from "react";

export const formatDate = (date: string) => {
    // Date formated to english 
    return new Date(date).toLocaleString('de-DE', {
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
