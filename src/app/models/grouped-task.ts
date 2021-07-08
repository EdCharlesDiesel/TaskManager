import { Task } from './task';

export class GroupedTask
{
    taskStatusName: number;
    tasks: Task[] = [];

    constructor()
    {
        this.taskStatusName = 0;
        this.tasks = []
    }
}

