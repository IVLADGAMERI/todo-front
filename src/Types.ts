export interface Task {
    id: number;
    title: string;
    statusName: string;
    priorityName: string;
}

export interface Topic {
    title: number;
    tasks: Task[];
}
