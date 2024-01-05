import { Report, ReportCategory } from '../db/mongodb';

export function createHeader(report: Report): string {
    if (report.category === ReportCategory.MESSAGE)
        return 'Sie haben eine neue Nachricht erhalten';

    
}