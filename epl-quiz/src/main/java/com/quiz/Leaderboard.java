package com.quiz;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import java.io.*;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Leaderboard {
    private static final String SCORES_FILE = "scores.json";
    private static final int MAX_ENTRIES = 10;
    private final Gson gson = new GsonBuilder().setPrettyPrinting().create();

    public void addScore(ScoreEntry entry) {
        List<ScoreEntry> scores = loadScores();
        scores.add(entry);
        Collections.sort(scores);
        if (scores.size() > MAX_ENTRIES) {
            scores = scores.subList(0, MAX_ENTRIES);
        }
        saveScores(scores);
    }

    public List<ScoreEntry> loadScores() {
        File file = new File(SCORES_FILE);
        if (!file.exists()) return new ArrayList<>();
        try (Reader reader = new FileReader(file)) {
            Type listType = new TypeToken<List<ScoreEntry>>() {}.getType();
            List<ScoreEntry> scores = gson.fromJson(reader, listType);
            return scores != null ? scores : new ArrayList<>();
        } catch (IOException e) {
            return new ArrayList<>();
        }
    }

    private void saveScores(List<ScoreEntry> scores) {
        try (Writer writer = new FileWriter(SCORES_FILE)) {
            gson.toJson(scores, writer);
        } catch (IOException e) {
            System.out.println("⚠ Could not save scores: " + e.getMessage());
        }
    }

    public void printLeaderboard() {
        List<ScoreEntry> scores = loadScores();
        System.out.println("\n╔══════════════════════════════════════╗");
        System.out.println("║         🏆  EPL QUIZ LEADERBOARD       ║");
        System.out.println("╠══════════════════════════════════════╣");
        if (scores.isEmpty()) {
            System.out.println("║         No scores yet. Be the first!  ║");
        } else {
            String[] medals = {"🥇", "🥈", "🥉"};
            for (int i = 0; i < scores.size(); i++) {
                String medal = i < medals.length ? medals[i] : String.format(" %d.", i + 1);
                String line = String.format(" %s %-32s", medal, scores.get(i).toString());
                System.out.printf("║%-38s║%n", line);
            }
        }
        System.out.println("╚══════════════════════════════════════╝");
    }
}
