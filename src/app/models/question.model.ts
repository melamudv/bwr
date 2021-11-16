export interface IQuestion {
  response_code: number;
  results: IItem[];
}
export interface IItem {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  all_answers?: string[];
  incorrect_answers: string[];
}
