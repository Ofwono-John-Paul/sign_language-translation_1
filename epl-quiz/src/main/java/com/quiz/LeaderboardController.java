package com.quiz;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")
public class LeaderboardController {
    private final LeaderboardService leaderboardService;

    public LeaderboardController(LeaderboardService leaderboardService) {
        this.leaderboardService = leaderboardService;
    }

    @GetMapping
    public List<ScoreEntry> getLeaderboard() {
        return leaderboardService.getLeaderboard();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ScoreEntry saveScore(@RequestBody ScoreSubmission submission) {
        return leaderboardService.saveScore(submission.getName(), submission.getScore(), submission.getTotal());
    }
}