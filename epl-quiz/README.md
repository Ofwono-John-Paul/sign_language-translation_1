# ⚽ EPL Quiz Game — 2025/26 Season

A command-line quiz game about the English Premier League, built with Java and Maven.

## Features
- 15 EPL 2025/26 questions loaded from JSON
- 10 random questions per game
- A/B/C/D multiple choice input
- High score leaderboard (top 10, saved to `scores.json`)
- Rating system based on your score

## Requirements
- Java 11+
- Maven 3.6+

## Run the Game

```bash
# Build
mvn clean package

# Run
java -jar epl-quiz.jar
```

## Run Tests

```bash
mvn test
```

## Project Structure

```
epl-quiz/
├── src/
│   ├── main/
│   │   ├── java/com/quiz/
│   │   │   ├── Main.java          # Entry point
│   │   │   ├── QuizEngine.java    # Game loop
│   │   │   ├── Question.java      # Question model
│   │   │   ├── ScoreEntry.java    # Score model
│   │   │   └── Leaderboard.java   # Score persistence
│   │   └── resources/
│   │       └── questions.json     # Quiz questions
│   └── test/
│       └── java/com/quiz/
│           └── QuizTest.java      # Unit tests
├── pom.xml
└── README.md
```

## Adding Questions

Edit `src/main/resources/questions.json`. Each question follows this format:

```json
{
  "question": "Your question here?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "answer": "Option B"
}
```
