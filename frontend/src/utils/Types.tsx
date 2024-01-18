import { ReportCategory } from "./Common"

export interface IssuesResponse {
    issues: number
}

export interface ReportsResponse {
    reports: Report[]
}

export interface Garden {
    _id: string,
    name: string
}

export interface Report {
    description: string,
    category: ReportCategory,
    timestamp: number,
    viewed: boolean
}

export interface Lot {
    nr: number,
    name: string,
    garden?: Garden,
    timestamp: number,
    reports?: Report[],
    issues?: number
}

export interface User {
    lots: Lot[]
}

export interface UserResponse {
    user: User
}