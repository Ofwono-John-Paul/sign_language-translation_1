# ⚽ EPL Quiz Game — 2025/26 Season

A Spring Boot quiz app with a JavaScript browser UI, built with Java and Maven.

## Features
- 15 EPL 2025/26 questions loaded from JSON
- 10 random questions per game
- JavaScript browser UI served by Spring Boot
- High score leaderboard (top 10, saved to `scores.json`)
- Rating system based on your score

## Requirements
- Java 11+
- Maven 3.6+

## Run the App

```bash
mvn -f epl-quiz/pom.xml spring-boot:run
```

Then open http://localhost:8080 in your browser.

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
│   │   │   ├── Main.java          # Spring Boot entry point
│   │   │   ├── QuizController.java # API endpoints
│   │   │   ├── QuizService.java    # Quiz/leaderboard logic
│   │   │   ├── Question.java      # Question model
│   │   │   ├── ScoreEntry.java    # Score model
│   │   │   └── Leaderboard.java   # Score persistence
│   │   └── resources/
│   │       ├── questions.json     # Quiz questions
│   │       └── static/
│   │           ├── index.html     # Browser entry page
│   │           └── app.js         # JavaScript UI
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
