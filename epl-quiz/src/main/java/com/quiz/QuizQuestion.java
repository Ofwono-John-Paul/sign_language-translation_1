package com.quiz;

import java.util.List;

public class QuizQuestion {
    private final String question;
    private final List<String> options;
    private final String answer;

    public QuizQuestion(String question, List<String> options, String answer) {
        this.question = question;
        this.options = options;
        this.answer = answer;
    }

    public String getQuestion() {
        return question;
    }

    public List<String> getOptions() {
        return options;
    }

    public String getAnswer() {
        return answer;
    }
}
