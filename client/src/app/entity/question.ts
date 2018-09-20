import { Choice } from "./choice";

export class Question{
    id: number;
    question: string;
    choices: Choice[];
    type: string;
    editFlag: string;
    selected: number[];
    answers: number[];
}