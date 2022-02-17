type DayStatistics = {
  correctAnswers: number;
  incorrectAnswers: number;
  learnedWords: number;
}

type StudyProgress = {
  learnedWords: number;
  dailyStatistics: Record<string, DayStatistics>
}

export type { StudyProgress, DayStatistics };