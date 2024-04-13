import { Priority } from "../enums/priority";
import { State } from "../enums/state";

export class Task {
    id?: number;
    title?: string;
    description?: string;
    priority?: Priority;
    state?: State;
    project?: {
        id: number;
     };
}
