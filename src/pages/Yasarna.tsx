import { useState, useEffect, useRef } from "react";
import { PageWrapper } from "@/components/app/PageWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSEO, SEO_DATA } from "@/hooks/useSEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { BookOpen, Type, Link2, GraduationCap, Brain, Volume2, Clock, Timer } from "lucide-react";
import {
  arabicAlphabet,
  vowels,
  joiningExamples,
  readingLessons,
  quizQuestions,
  tajwidRules,
} from "@/data/yasarnaContent";

const Yasarna = () => {
  useSEO(SEO_DATA.yasarna);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [revealedJoining, setRevealedJoining] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("alphabet");
  const [selectedDifficulty, setSelectedDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [timedMode, setTimedMode] = useState(false);
  const [timerDuration, setTimerDuration] = useState(5); // in minutes
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null); // in seconds
  const [quizStartTime, setQuizStartTime] = useState<Date | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("yasarna_progress");
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  const toggleLessonComplete = (lessonId: string) => {
    const updated = completedLessons.includes(lessonId)
      ? completedLessons.filter((id) => id !== lessonId)
      : [...completedLessons, lessonId];
    setCompletedLessons(updated);
    localStorage.setItem("yasarna_progress", JSON.stringify(updated));
  };

  const calculateProgress = () => {
    const totalLessons = readingLessons.length;
    return (completedLessons.length / totalLessons) * 100;
  };

  // Timer effects
  useEffect(() => {
    if (timedMode && timeRemaining !== null && timeRemaining > 0 && !showResults) {
      timerIntervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev === null || prev <= 1) {
            // Time's up - auto submit
            if (timerIntervalRef.current) {
              clearInterval(timerIntervalRef.current);
            }
            setShowResults(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
        }
      };
    }
  }, [timedMode, timeRemaining, showResults]);

  // Start timer when first answer is given in timed mode
  useEffect(() => {
    if (timedMode && Object.keys(quizAnswers).length === 1 && timeRemaining === null && !showResults) {
      setTimeRemaining(timerDuration * 60);
      setQuizStartTime(new Date());
    }
  }, [quizAnswers, timedMode, timeRemaining, timerDuration, showResults]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setShowResults(false);
    setCurrentQuiz(0);
    setTimeRemaining(null);
    setQuizStartTime(null);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
  };

  const handleQuizAnswer = (questionId: string, answer: string, correctAnswer: string) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answer });
    
    // Provide immediate feedback
    if (answer === correctAnswer) {
      setTimeout(() => {
        const button = document.querySelector(`[data-answer="${questionId}-${answer}"]`);
        if (button) {
          button.classList.add('animate-pulse');
          setTimeout(() => button.classList.remove('animate-pulse'), 1000);
        }
      }, 0);
    }
  };

  const filteredQuizQuestions = quizQuestions.filter(q => q.difficulty === selectedDifficulty);

  const calculateQuizScore = () => {
    let correct = 0;
    filteredQuizQuestions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) correct++;
    });
    return Math.round((correct / filteredQuizQuestions.length) * 100);
  };

  const toggleJoiningReveal = (id: string) => {
    setRevealedJoining(
      revealedJoining.includes(id)
        ? revealedJoining.filter((rid) => rid !== id)
        : [...revealedJoining, id]
    );
  };

  return (
    <PageWrapper>
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Yasarna</h1>
            <p className="text-muted-foreground text-lg mb-4">
              Learn to read Arabic easily with clear transliteration and structured lessons
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Your Progress</span>
                <span className="text-sm text-muted-foreground">
                  {completedLessons.length} / {readingLessons.length} lessons
                </span>
              </div>
              <Progress value={calculateProgress()} className="h-2" />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Mobile Dropdown */}
            <div className="lg:hidden mb-6 mt-6">
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alphabet">
                    <div className="flex items-center gap-2">
                      <Type className="h-4 w-4" />
                      <span>Alphabet</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="vowels">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>Vowels</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="joining">
                    <div className="flex items-center gap-2">
                      <Link2 className="h-4 w-4" />
                      <span>Joining</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="practice">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      <span>Practice</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="quizzes">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      <span>Quizzes</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="tajwid">
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-4 w-4" />
                      <span>Tajwid</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Desktop Tabs */}
            <TabsList className="hidden lg:inline-flex w-full grid-cols-6 mb-8 mt-6">
              <TabsTrigger value="alphabet" className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                <span>Alphabet</span>
              </TabsTrigger>
              <TabsTrigger value="vowels" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Vowels</span>
              </TabsTrigger>
              <TabsTrigger value="joining" className="flex items-center gap-2">
                <Link2 className="h-4 w-4" />
                <span>Joining</span>
              </TabsTrigger>
              <TabsTrigger value="practice" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span>Practice</span>
              </TabsTrigger>
              <TabsTrigger value="quizzes" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span>Quizzes</span>
              </TabsTrigger>
              <TabsTrigger value="tajwid" className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                <span>Tajwid</span>
              </TabsTrigger>
            </TabsList>

            {/* Alphabet Section */}
            <TabsContent value="alphabet">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {arabicAlphabet.map((letter) => (
                  <Card key={letter.letter}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="text-5xl font-arabic">{letter.letter}</span>
                        <div className="text-right">
                          <div className="font-semibold">{letter.name}</div>
                          <div className="text-sm text-muted-foreground">
                            "{letter.transliteration}"
                          </div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Letter Forms</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-center p-2 bg-muted rounded">
                              <div className="text-3xl font-arabic mb-1">
                                {letter.forms.isolated}
                              </div>
                              <div className="text-xs">Isolated</div>
                            </div>
                            <div className="text-center p-2 bg-muted rounded">
                              <div className="text-3xl font-arabic mb-1">
                                {letter.forms.beginning}
                              </div>
                              <div className="text-xs">Beginning</div>
                            </div>
                            <div className="text-center p-2 bg-muted rounded">
                              <div className="text-3xl font-arabic mb-1">
                                {letter.forms.middle}
                              </div>
                              <div className="text-xs">Middle</div>
                            </div>
                            <div className="text-center p-2 bg-muted rounded">
                              <div className="text-3xl font-arabic mb-1">
                                {letter.forms.end}
                              </div>
                              <div className="text-xs">End</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Examples</h4>
                          <div className="space-y-2">
                            {letter.examples.map((ex, idx) => (
                              <div key={idx} className="p-2 bg-muted rounded text-sm">
                                <div className="text-2xl font-arabic mb-1">{ex.arabic}</div>
                                <div className="text-muted-foreground">{ex.transliteration}</div>
                                <div className="text-xs">{ex.meaning}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Vowels Section */}
            <TabsContent value="vowels">
              <div className="grid gap-4 md:grid-cols-2">
                {vowels.map((vowel) => (
                  <Card key={vowel.name}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{vowel.name}</div>
                        </div>
                        <span className="text-5xl font-arabic">{vowel.symbol}</span>
                      </CardTitle>
                      <CardDescription>{vowel.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="font-medium">Examples</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {vowel.examples.map((ex, idx) => (
                            <div key={idx} className="text-center p-3 bg-muted rounded">
                              <div className="text-3xl font-arabic mb-2">{ex.arabic}</div>
                              <div className="text-sm text-muted-foreground">
                                {ex.transliteration}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Joining Section */}
            <TabsContent value="joining">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>How Letters Connect</CardTitle>
                    <CardDescription>
                      Click "Show Word" to see how individual letters join to form complete words
                    </CardDescription>
                  </CardHeader>
                </Card>
                <div className="grid gap-4 md:grid-cols-2">
                  {joiningExamples.map((example) => (
                    <Card key={example.id}>
                      <CardHeader>
                        <CardTitle className="text-2xl">
                          Individual Letters: {example.letters.join(" + ")}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => toggleJoiningReveal(example.id)}
                        >
                          {revealedJoining.includes(example.id) ? "Hide Word" : "Show Word"}
                        </Button>
                        {revealedJoining.includes(example.id) && (
                          <div className="space-y-3 p-4 bg-muted rounded-lg">
                            <div className="text-center">
                              <div className="text-5xl font-arabic mb-3">{example.word}</div>
                              <div className="text-xl font-medium mb-2">
                                {example.transliteration}
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground border-t pt-3">
                              {example.breakdown}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Practice Section */}
            <TabsContent value="practice">
              <div className="space-y-6">
                {readingLessons.map((lesson) => (
                  <Card key={lesson.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{lesson.title}</CardTitle>
                          <CardDescription className="mt-1">
                            <Badge variant="secondary">{lesson.level}</Badge>
                          </CardDescription>
                        </div>
                        <Button
                          variant={completedLessons.includes(lesson.id) ? "default" : "outline"}
                          onClick={() => toggleLessonComplete(lesson.id)}
                        >
                          {completedLessons.includes(lesson.id)
                            ? "Completed ✓"
                            : "Mark Complete"}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                        {lesson.examples.map((ex, idx) => (
                          <div key={idx} className="p-4 bg-muted rounded-lg text-center">
                            <div className="text-4xl font-arabic mb-3">{ex.arabic}</div>
                            <div className="text-lg font-medium mb-1">{ex.transliteration}</div>
                            {ex.meaning && (
                              <div className="text-sm text-muted-foreground">{ex.meaning}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Quizzes Section */}
            <TabsContent value="quizzes">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <CardTitle>Test Your Knowledge</CardTitle>
                      <CardDescription>
                        Answer the questions below to test your understanding
                      </CardDescription>
                    </div>
                    <Select value={selectedDifficulty} onValueChange={(value: any) => {
                      setSelectedDifficulty(value);
                      resetQuiz();
                    }}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">Beginner</Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="intermediate">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">Intermediate</Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="advanced">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">Advanced</Badge>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Timer Settings */}
                  <div className="border-t pt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Timer className="h-5 w-5 text-primary" />
                        <Label htmlFor="timed-mode" className="font-semibold">Timed Mode</Label>
                      </div>
                      <Switch
                        id="timed-mode"
                        checked={timedMode}
                        onCheckedChange={(checked) => {
                          setTimedMode(checked);
                          if (!checked) {
                            resetQuiz();
                          }
                        }}
                      />
                    </div>
                    
                    {timedMode && (
                      <div className="flex items-center gap-4">
                        <Label htmlFor="timer-duration" className="text-sm">Duration:</Label>
                        <Select 
                          value={timerDuration.toString()} 
                          onValueChange={(value) => {
                            setTimerDuration(parseInt(value));
                            resetQuiz();
                          }}
                          disabled={Object.keys(quizAnswers).length > 0}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3 minutes</SelectItem>
                            <SelectItem value="5">5 minutes</SelectItem>
                            <SelectItem value="10">10 minutes</SelectItem>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="20">20 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                        {timeRemaining !== null && (
                          <Badge 
                            variant={timeRemaining < 60 ? "destructive" : "default"} 
                            className="ml-auto text-lg px-4 py-2"
                          >
                            <Clock className="h-4 w-4 mr-2" />
                            {formatTime(timeRemaining)}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                      {!showResults ? (
                        <>
                          {filteredQuizQuestions.map((question) => {
                            const userAnswer = quizAnswers[question.id];
                            const isAnswered = userAnswer !== undefined;
                            const isCorrect = userAnswer === question.correctAnswer;
                            
                            return (
                              <div key={question.id} className="p-4 border rounded-lg space-y-3">
                                <div className="font-medium">{question.question}</div>
                                {question.arabic && (
                                  <div className="text-5xl font-arabic text-center py-4">
                                    {question.arabic}
                                  </div>
                                )}
                                <div className="grid grid-cols-2 gap-2">
                                  {question.options.map((option) => {
                                    const isThisAnswerSelected = userAnswer === option;
                                    const isThisCorrectAnswer = option === question.correctAnswer;
                                    
                                    let buttonVariant: "default" | "outline" | "destructive" = "outline";
                                    let buttonClassName = "w-full transition-all";
                                    
                                    if (isAnswered) {
                                      if (isThisAnswerSelected) {
                                        if (isCorrect) {
                                          buttonClassName += " bg-green-600 hover:bg-green-700 text-white border-green-600";
                                        } else {
                                          buttonClassName += " bg-red-600 hover:bg-red-700 text-white border-red-600";
                                        }
                                      } else if (!isCorrect && isThisCorrectAnswer) {
                                        buttonClassName += " bg-green-100 border-green-500 text-green-700 dark:bg-green-950 dark:text-green-300";
                                      }
                                    } else {
                                      buttonVariant = "outline";
                                    }
                                    
                                    return (
                                      <Button
                                        key={option}
                                        variant={buttonVariant}
                                        className={buttonClassName}
                                        data-answer={`${question.id}-${option}`}
                                        onClick={() => handleQuizAnswer(question.id, option, question.correctAnswer)}
                                        disabled={isAnswered}
                                      >
                                        {option}
                                      </Button>
                                    );
                                  })}
                                </div>
                                {isAnswered && (
                                  <div className={`text-sm font-medium mt-2 ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                    {isCorrect ? '✓ Correct!' : `✗ Incorrect. The correct answer is: ${question.correctAnswer}`}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={() => setShowResults(true)}
                        disabled={Object.keys(quizAnswers).length !== filteredQuizQuestions.length}
                      >
                        Submit Quiz
                      </Button>
                    </>
                  ) : (
                    <div className="text-center space-y-6">
                      <div>
                        <h3 className="text-3xl font-bold mb-2">Your Score</h3>
                        <div className="text-6xl font-bold text-primary mb-4">
                          {calculateQuizScore()}%
                        </div>
                        <p className="text-muted-foreground">
                          You got {Object.values(quizAnswers).filter((a, i) => a === filteredQuizQuestions[i].correctAnswer).length} out of{" "}
                          {filteredQuizQuestions.length} correct!
                        </p>
                        {timedMode && quizStartTime && (
                          <div className="mt-4">
                            <Badge variant="secondary" className="text-base px-4 py-2">
                              <Clock className="h-4 w-4 mr-2" />
                              {timeRemaining === 0 ? "Time's up!" : `Completed with ${formatTime(timeRemaining || 0)} remaining`}
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="space-y-3">
                        {filteredQuizQuestions.map((q) => {
                          const isCorrect = quizAnswers[q.id] === q.correctAnswer;
                          return (
                            <div
                              key={q.id}
                              className={`p-4 rounded-lg border-2 ${
                                isCorrect
                                  ? "border-green-500 bg-green-50 dark:bg-green-950"
                                  : "border-red-500 bg-red-50 dark:bg-red-950"
                              }`}
                            >
                              <div className="font-medium mb-2">{q.question}</div>
                              {q.arabic && (
                                <div className="text-3xl font-arabic mb-2">{q.arabic}</div>
                              )}
                              <div className="text-sm">
                                Your answer: <strong>{quizAnswers[q.id]}</strong>
                                {!isCorrect && (
                                  <span className="ml-2">
                                    (Correct: <strong>{q.correctAnswer}</strong>)
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex gap-4 justify-center">
                        <Button
                          onClick={resetQuiz}
                          size="lg"
                        >
                          Try Again
                        </Button>
                        {selectedDifficulty === 'beginner' && calculateQuizScore() >= 80 && (
                          <Button
                            onClick={() => {
                              setSelectedDifficulty('intermediate');
                              resetQuiz();
                            }}
                            size="lg"
                            variant="secondary"
                          >
                            Try Intermediate
                          </Button>
                        )}
                        {selectedDifficulty === 'intermediate' && calculateQuizScore() >= 80 && (
                          <Button
                            onClick={() => {
                              setSelectedDifficulty('advanced');
                              resetQuiz();
                            }}
                            size="lg"
                            variant="secondary"
                          >
                            Try Advanced
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tajwid Section */}
            <TabsContent value="tajwid">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Beginner Tajwid Basics</CardTitle>
                    <CardDescription>
                      Essential pronunciation rules with visual highlights and transliteration
                    </CardDescription>
                  </CardHeader>
                </Card>
                {tajwidRules.map((rule) => (
                  <Card key={rule.id}>
                    <CardHeader>
                      <CardTitle>{rule.title}</CardTitle>
                      <CardDescription>{rule.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {rule.examples.map((example, idx) => (
                        <div key={idx} className="p-4 bg-muted rounded-lg space-y-2">
                          <div className="text-4xl font-arabic text-center mb-3">
                            {example.arabic}
                          </div>
                          <div className="text-lg font-medium text-center">
                            {example.transliteration}
                          </div>
                          <div className="text-sm">
                            <Badge variant="secondary" className="mb-2">
                              Focus: {example.highlight}
                            </Badge>
                            <p className="text-muted-foreground">{example.explanation}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </PageWrapper>
  );
};

export default Yasarna;
