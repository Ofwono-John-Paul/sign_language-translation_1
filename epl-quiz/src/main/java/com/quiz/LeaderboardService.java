package com.quiz;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class LeaderboardService {
    private final Leaderboard leaderboard;

    public LeaderboardService() {
        this.leaderboard = new Leaderboard();
    }

    public List<ScoreEntry> getLeaderboard() {
        return leaderboard.loadScores();
    }

    public ScoreEntry saveScore(String name, int score, int total) {
        String safeName = (name == null || name.trim().isEmpty()) ? "Anonymous" : name.trim();
        ScoreEntry entry = new ScoreEntry(safeName, score, total, LocalDate.now().toString());
        leaderboard.addScore(entry);
        return entry;
    }
}