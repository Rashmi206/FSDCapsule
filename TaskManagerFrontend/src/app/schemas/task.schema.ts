export class Task {
    _id: string;
    task: string;
    startDate: Date;
    endDate: Date;
    priority: number;
    finished: boolean;
    parentTask: string;
}