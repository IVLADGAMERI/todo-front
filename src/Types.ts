export interface Task {
    id: number;
    title: string;
    statusName: string;
    priorityName: string;
}

export interface Topic {
    id: number;
    title: number;
    tasks: Task[];
}

export interface UserDTO {
    login: string;
    imgUrl: string;
    profileUrl: string
}