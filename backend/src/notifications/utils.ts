import { Report, ReportCategory } from '../db/mongodb';

const descriptionMap: { [key in ReportCategory]: string } = {
    [ReportCategory.MESSAGE]: '',
    [ReportCategory.WATER]: 'Dieser Garten könnte Wasser gebrauchen.',
    [ReportCategory.HARVEST]: 'Es ist Erntezeit!',
    [ReportCategory.PRUNE]: 'Die Planzen sollten zurückgeschnitten werden.',
    [ReportCategory.FERTILIZE]: 'Dünger würde der Pflanze gut tun.',
    [ReportCategory.PEST]: 'Ein Schädling ist in den Garten eingedrungen.'
};

export function createHeader(report: Report): string {
    return `Meldung Garten Nr. ${report.lotNr}`;
}

export function createBody(report: Report): string {
    const desc = descriptionMap[report.category]
        + (report.description ? `\n \"${report.description}\"` : '');
    return `Jemand hat Ihnen für Garten Nr. ${report.lotNr} eine Nachricht hinterlassen: ${desc}\n\nIhr Grüne Oase Team`;
}
