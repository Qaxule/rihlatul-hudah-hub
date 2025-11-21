import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Award, RotateCcw } from "lucide-react";
import { QuizQuestion } from "@/data/lessonContent";
import { cn } from "@/lib/utils";

interface LessonQuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

const LessonQuiz = ({ questions, onComplete }: LessonQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (!showExplanation) {
      setShowExplanation(true);
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1]);
      setShowExplanation(false);
    } else {
      // Calculate score
      const correctAnswers = newAnswers.filter(
        (answer, index) => answer === questions[index].correctAnswer
      ).length;
      const score = Math.round((correctAnswers / questions.length) * 100);
      setIsComplete(true);
      onComplete(score);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
      setShowExplanation(false);
    }
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswers(Array(questions.length).fill(null));
    setIsComplete(false);
  };

  const calculateResults = () => {
    const correctAnswers = answers.filter(
      (answer, index) => answer === questions[index].correctAnswer
    ).length;
    return {
      correct: correctAnswers,
      total: questions.length,
      percentage: Math.round((correctAnswers / questions.length) * 100),
    };
  };

  if (isComplete) {
    const results = calculateResults();
    return (
      <Card className="shadow-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-6">
            <div className="mb-4">
              <div className="text-6xl font-bold text-primary mb-2">
                {results.percentage}%
              </div>
              <p className="text-muted-foreground">
                {results.correct} out of {results.total} correct
              </p>
            </div>
            <Badge
              variant={results.percentage >= 80 ? "default" : "secondary"}
              className="text-lg px-4 py-2"
            >
              {results.percentage >= 80
                ? "Excellent!"
                : results.percentage >= 60
                ? "Good Job!"
                : "Keep Learning!"}
            </Badge>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Review Your Answers:</h4>
            {questions.map((question, index) => {
              const isCorrect = answers[index] === question.correctAnswer;
              return (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-2 p-3 rounded-lg",
                    isCorrect ? "bg-green-500/10" : "bg-red-500/10"
                  )}
                >
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1">
                      Question {index + 1}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {question.question}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Button onClick={handleRetake} className="w-full gap-2">
            <RotateCcw className="h-4 w-4" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const isAnswerCorrect =
    selectedAnswer !== null && selectedAnswer === question.correctAnswer;

  return (
    <Card className="shadow-elevated">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
          <div className="text-sm text-muted-foreground">
            Progress: {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
          </div>
        </div>
        <CardTitle>Knowledge Check</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const showCorrectAnswer = showExplanation && isCorrect;
              const showIncorrectAnswer = showExplanation && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={cn(
                    "w-full text-left p-4 rounded-lg border-2 transition-all",
                    "hover:border-primary hover:bg-accent",
                    isSelected && !showExplanation && "border-primary bg-accent",
                    showCorrectAnswer && "border-green-600 bg-green-500/10",
                    showIncorrectAnswer && "border-red-600 bg-red-500/10",
                    showExplanation && "cursor-default"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span>{option}</span>
                    {showCorrectAnswer && (
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    )}
                    {showIncorrectAnswer && (
                      <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {showExplanation && (
          <div
            className={cn(
              "p-4 rounded-lg border-2",
              isAnswerCorrect
                ? "bg-green-500/10 border-green-600"
                : "bg-red-500/10 border-red-600"
            )}
          >
            <div className="flex items-start gap-2 mb-2">
              {isAnswerCorrect ? (
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <p className="font-semibold">
                {isAnswerCorrect ? "Correct!" : "Not quite right"}
              </p>
            </div>
            <p className="text-sm text-muted-foreground ml-7">
              {question.explanation}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null}
          >
            {showExplanation
              ? currentQuestion === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"
              : "Check Answer"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LessonQuiz;
