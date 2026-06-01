package com.quiz;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.util.List;

class QuizTest {

    @Test
    void testScoreEntrySorting() {
        ScoreEntry a = new ScoreEntry("Alice", 9, 10, "2025-09-01");
        ScoreEntry b = new ScoreEntry("Bob", 7, 10, "2025-09-01");
        ScoreEntry c = new ScoreEntry("Carol", 9, 10, "2025-09-02");

        List<ScoreEntry> scores = new java.util.ArrayList<>(List.of(b, a, c));
        java.util.Collections.sort(scores);

        // Alice and Carol both have 9, Bob has 7 — Bob should be last
        assertEquals("Bob", scores.get(2).getName());
    }

    @Test
    void testScoreEntryPercentage() {
        ScoreEntry entry = new ScoreEntry("Test", 8, 10, "2025-09-01");
        assertEquals(80.0, entry.getPercentage(), 0.01);
    }

    @Test
    void testScoreEntryZeroTotal() {
        ScoreEntry entry = new ScoreEntry("Test", 0, 0, "2025-09-01");
        assertEquals(0.0, entry.getPercentage(), 0.01);
    }

    @Test
    void testScoreEntryToString() {
        ScoreEntry entry = new ScoreEntry("Kwame", 10, 10, "2025-09-01");
        String str = entry.toString();
        assertTrue(str.contains("Kwame"));
        assertTrue(str.contains("10/10"));
        assertTrue(str.contains("100%"));
    }
}
