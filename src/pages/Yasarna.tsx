import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Type, Link2, GraduationCap, Brain, Volume2 } from "lucide-react";
import {
  arabicAlphabet,
  vowels,
  joiningExamples,
  readingLessons,
  quizQuestions,
  tajwidRules,
} from "@/data/yasarnaContent";

const Yasarna = () => {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [revealedJoining, setRevealedJoining] = useState<string[]>([]);

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

  const handleQuizAnswer = (questionId: string, answer: string) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answer });
  };

  const calculateQuizScore = () => {
    let correct = 0;
    quizQuestions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) correct++;
    });
    return Math.round((correct / quizQuestions.length) * 100);
  };

  const toggleJoiningReveal = (id: string) => {
    setRevealedJoining(
      revealedJoining.includes(id)
        ? revealedJoining.filter((rid) => rid !== id)
        : [...revealedJoining, id]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
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

          <Tabs defaultValue="alphabet" className="w-full">
            <div className="w-full overflow-x-auto mb-8 mt-6">
              <TabsList className="inline-flex h-auto w-auto min-w-full lg:w-full flex-nowrap lg:grid lg:grid-cols-6 p-1 gap-1">
                <TabsTrigger value="alphabet" className="flex items-center gap-2 whitespace-nowrap px-4 py-2.5">
                  <Type className="h-4 w-4 flex-shrink-0" />
                  <span>Alphabet</span>
                </TabsTrigger>
                <TabsTrigger value="vowels" className="flex items-center gap-2 whitespace-nowrap px-4 py-2.5">
                  <BookOpen className="h-4 w-4 flex-shrink-0" />
                  <span>Vowels</span>
                </TabsTrigger>
                <TabsTrigger value="joining" className="flex items-center gap-2 whitespace-nowrap px-4 py-2.5">
                  <Link2 className="h-4 w-4 flex-shrink-0" />
                  <span>Joining</span>
                </TabsTrigger>
                <TabsTrigger value="practice" className="flex items-center gap-2 whitespace-nowrap px-4 py-2.5">
                  <GraduationCap className="h-4 w-4 flex-shrink-0" />
                  <span>Practice</span>
                </TabsTrigger>
                <TabsTrigger value="quizzes" className="flex items-center gap-2 whitespace-nowrap px-4 py-2.5">
                  <Brain className="h-4 w-4 flex-shrink-0" />
                  <span>Quizzes</span>
                </TabsTrigger>
                <TabsTrigger value="tajwid" className="flex items-center gap-2 whitespace-nowrap px-4 py-2.5">
                  <Volume2 className="h-4 w-4 flex-shrink-0" />
                  <span>Tajwid</span>
                </TabsTrigger>
              </TabsList>
            </div>

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
                      <CardTitle className="flex items-center gap-4">
                        <span className="text-5xl font-arabic">{vowel.symbol}</span>
                        <div>
                          <div className="font-semibold">{vowel.name}</div>
                        </div>
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
                  <CardTitle>Test Your Knowledge</CardTitle>
                  <CardDescription>
                    Answer the questions below to test your understanding
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!showResults ? (
                    <>
                      {quizQuestions.map((question) => (
                        <div key={question.id} className="p-4 border rounded-lg space-y-3">
                          <div className="font-medium">{question.question}</div>
                          {question.arabic && (
                            <div className="text-5xl font-arabic text-center py-4">
                              {question.arabic}
                            </div>
                          )}
                          <div className="grid grid-cols-2 gap-2">
                            {question.options.map((option) => (
                              <Button
                                key={option}
                                variant={
                                  quizAnswers[question.id] === option ? "default" : "outline"
                                }
                                className="w-full"
                                onClick={() => handleQuizAnswer(question.id, option)}
                              >
                                {option}
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={() => setShowResults(true)}
                        disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
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
                          You got {Object.values(quizAnswers).filter((a, i) => a === quizQuestions[i].correctAnswer).length} out of{" "}
                          {quizQuestions.length} correct!
                        </p>
                      </div>
                      <div className="space-y-3">
                        {quizQuestions.map((q) => {
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
                      <Button
                        onClick={() => {
                          setShowResults(false);
                          setQuizAnswers({});
                        }}
                      >
                        Retake Quiz
                      </Button>
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
      <Footer />
    </div>
  );
};

export default Yasarna;
