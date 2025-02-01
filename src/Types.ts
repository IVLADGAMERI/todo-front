export interface Task {
    id: number;
    title: string;
    statusName: string;
    priorityName: string;
}

export interface TaskFullDTO extends Task {
    content: string,
    createdAt: string,
    expiresAt: string
}

export interface Topic {
    id: number;
    title: number;
    tasks: Task[];
}

export interface UserDTO {
    login: string;
    imgUrl: string;
    profileUrl: string;
}

export enum TaskPriority {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW"
}

export interface GetTaskFullDTO {
    id: number;
}

export enum TaskStatus {
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED"
}

export interface UpdateTaskContentDTO {
    taskId: number,
    newContent: string
}

export interface DeleteTaskDTO {
    id: number;
}

export interface UpdateTaskInfoDTO {
    id: number,
    newTitle: string,
    newPriority: TaskPriority,
    newExpiresAt?: string | null
}

export interface AddTaskDTO {
    title: string;
    priority: TaskPriority;
    topicId: number;
    expiresAt?: string;
}