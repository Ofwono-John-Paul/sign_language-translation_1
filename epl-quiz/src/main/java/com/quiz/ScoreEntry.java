package com.quiz;

public class ScoreEntry implements Comparable<ScoreEntry> {
    private String name;
    private int score;
    private int total;
    private String date;

    public ScoreEntry() {}

    public ScoreEntry(String name, int score, int total, String date) {
        this.name = name;
        this.score = score;
        this.total = total;
        this.date = date;
    }

    public String getName() { return name; }
    public int getScore() { return score; }
    public int getTotal() { return total; }
    public String getDate() { return date; }

    public double getPercentage() {
        return total == 0 ? 0 : (score * 100.0) / total;
    }

    @Override
    public int compareTo(ScoreEntry other) {
        // Sort by score desc, then percentage desc
        if (other.score != this.score) return other.score - this.score;
        return Double.compare(other.getPercentage(), this.getPercentage());
    }

    @Override
    public String toString() {
        return String.format("%-15s %d/%d  (%.0f%%)", name, score, total, getPercentage());
    }
}
