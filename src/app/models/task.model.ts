import { Priority } from "../enums/priority";
import { State } from "../enums/state";

export class Task {
    title?: string;
    description?: string;
    priority?: Priority;
    state?: State;
}
