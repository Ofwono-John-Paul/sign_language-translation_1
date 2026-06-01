package com.quiz;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class QuizEngine {
    private final List<Question> questions;
    private final Scanner scanner;
    private final Leaderboard leaderboard;

    public QuizEngine(Scanner scanner) {
        this.scanner = scanner;
        this.questions = loadQuestions();
        this.leaderboard = new Leaderboard();
    }

    private List<Question> loadQuestions() {
        try (InputStream is = getClass().getResourceAsStream("/questions.json");
             InputStreamReader reader = new InputStreamReader(is)) {
            Type listType = new TypeToken<List<Question>>() {}.getType();
            return new Gson().fromJson(reader, listType);
        } catch (Exception e) {
            System.out.println("⚠ Could not load questions: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    public void run() {
        printBanner();

        while (true) {
            System.out.println("\n  1. Start Quiz");
            System.out.println("  2. View Leaderboard");
            System.out.println("  3. Exit");
            System.out.print("\n  Choose an option: ");

            String choice = scanner.nextLine().trim();
            switch (choice) {
                case "1": startQuiz(); break;
                case "2": leaderboard.printLeaderboard(); break;
                case "3":
                    System.out.println("\n  Thanks for playing! Come on England! 🏴󠁧󠁢󠁥󠁮󠁧󠁿\n");
                    return;
                default:
                    System.out.println("  Invalid option. Please choose 1, 2, or 3.");
            }
        }
    }

    private void startQuiz() {
        System.out.print("\n  Enter your name: ");
        String name = scanner.nextLine().trim();
        if (name.isEmpty()) name = "Anonymous";

        // Shuffle and pick up to 10 questions
        List<Question> pool = new ArrayList<>(questions);
        Collections.shuffle(pool);
        List<Question> selected = pool.subList(0, Math.min(10, pool.size()));

        int score = 0;
        int questionNum = 1;

        System.out.println("\n  Let's kick off, " + name + "! " + selected.size() + " questions await.\n");
        System.out.println("  ─────────────────────────────────────────");

        for (Question q : selected) {
            System.out.printf("%n  Q%d: %s%n", questionNum, q.getQuestion());
            List<String> opts = q.getOptions();
            for (int i = 0; i < opts.size(); i++) {
                System.out.printf("     %c) %s%n", 'A' + i, opts.get(i));
            }
            System.out.print("\n  Your answer (A/B/C/D): ");
            String answer = scanner.nextLine().trim();

            if (q.isCorrect(answer)) {
                System.out.println("  Correct!");
                score++;
            } else {
                System.out.println("  Wrong! Correct answer: " + q.getAnswer());
            }
            System.out.println("  Score so far: " + score + "/" + questionNum);
            System.out.println("  ─────────────────────────────────────────");
            questionNum++;
        }

        printResult(name, score, selected.size());
    }

    private void printResult(String name, int score, int total) {
        double pct = (score * 100.0) / total;
        System.out.println("\n╔══════════════════════════════════════╗");
        System.out.println("║             FULL TIME                  ║");
        System.out.printf( "║  Player : %-28s║%n", name);
        System.out.printf( "║  Score  : %d/%d  (%.0f%%)%-18s║%n", score, total, pct, "");
        System.out.printf( "║  Rating : %-28s║%n", getRating(pct));
        System.out.println("╚══════════════════════════════════════╝");

        String date = java.time.LocalDate.now().toString();
        leaderboard.addScore(new ScoreEntry(name, score, total, date));
        System.out.println("\n  🏆 Score saved to leaderboard!");
        leaderboard.printLeaderboard();
    }

    private String getRating(double pct) {
        if (pct == 100) return "🌟 Perfect! You're a legend!";
        if (pct >= 80)  return "🔥 Excellent! Top of the table!";
        if (pct >= 60)  return "⚽ Good! Mid-table form.";
        if (pct >= 40)  return "😬 Decent. Need more training.";
        return                 "😅 Relegation zone. Study up!";
    }

    private void printBanner() {
        System.out.println();
        System.out.println("  ╔════════════════════════════════════════╗");
        System.out.println("  ║   EPL QUIZ — 2025/26 SEASON   ║");
        System.out.println("  ║    Premier League Edition              ║");
        System.out.println("  ╚════════════════════════════════════════╝");
    }
}
