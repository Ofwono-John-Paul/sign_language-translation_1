package com.quiz;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class QuizService {
    private final List<Question> questions;

    public QuizService() {
        this.questions = loadQuestions();
    }

    public List<QuizQuestion> getQuizQuestions(int count) {
        List<Question> pool = new ArrayList<>(questions);
        Collections.shuffle(pool);
        List<Question> selected = pool.subList(0, Math.min(count, pool.size()));

        List<QuizQuestion> result = new ArrayList<>();
        for (Question question : selected) {
            result.add(new QuizQuestion(question.getQuestion(), question.getOptions(), question.getAnswer()));
        }
        return result;
    }

    private List<Question> loadQuestions() {
        InputStream is = getClass().getResourceAsStream("/questions.json");
        if (is == null) {
            return new ArrayList<>();
        }

        try (InputStream autoClose = is; InputStreamReader reader = new InputStreamReader(autoClose)) {
            Type listType = new TypeToken<List<Question>>() {}.getType();
            List<Question> loaded = new Gson().fromJson(reader, listType);
            return loaded != null ? loaded : new ArrayList<>();
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }
}
