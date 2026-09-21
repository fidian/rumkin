export interface TestData {
    title: string;
    summary: string;
    questions: TestQuestion[];
}

export interface TestQuestion {
    text: string;
    answers: Record<string, string>;
    answerText?: string;
}
