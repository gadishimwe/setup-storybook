export type TaskState = "TASK_INBOX" | "TASK_PINNED" | "TASK_ARCHIVED";
export interface Task {
    id: string;
    title: string;
    state: TaskState;
}