package com.quiz;

import java.util.List;

public class Question {
    private String question;
    private List<String> options;
    private String answer;

    public String getQuestion() { return question; }
    public List<String> getOptions() { return options; }
    public String getAnswer() { return answer; }

    public boolean isCorrect(String input) {
        // Accept letter (A/B/C/D) or full answer text
        input = input.trim();
        if (input.length() == 1) {
            int idx = input.toUpperCase().charAt(0) - 'A';
            if (idx >= 0 && idx < options.size()) {
                return options.get(idx).equalsIgnoreCase(answer);
            }
        }
        return input.equalsIgnoreCase(answer);
    }
}
