
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { shuffle } from 'lodash';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { getCategoryItems } from '@/services/SanskritAPI';

interface QuizQuestion {
  sanskrit: string;
  english: string;
  options: string[];
  answered: boolean;
  correct: boolean;
}

const Game = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('greetings');
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 'greetings', name: 'Greetings' },
    { id: 'phrases', name: 'Phrases' },
    { id: 'numbers', name: 'Numbers' },
    { id: 'days', name: 'Days' },
    { id: 'colors', name: 'Colors' },
    { id: 'family', name: 'Family' },
  ];

  useEffect(() => {
    if (gameStarted) {
      prepareQuestions();
    }
  }, [gameStarted, selectedCategory]);

  const prepareQuestions = async () => {
    setLoading(true);
    try {
      const items = getCategoryItems(selectedCategory);
      if (items.length < 4) {
        toast.error("Not enough items in this category for a quiz");
        setGameStarted(false);
        setLoading(false);
        return;
      }

      // Generate quiz questions
      const generatedQuestions = items.slice(0, 10).map(item => {
        // Get 3 random incorrect options
        const otherOptions = items
          .filter(otherItem => otherItem.english !== item.english)
          .map(item => item.english);
        
        const shuffledOptions = shuffle(otherOptions).slice(0, 3);
        shuffledOptions.push(item.english);
        
        return {
          sanskrit: item.sanskrit,
          english: item.english,
          options: shuffle(shuffledOptions),
          answered: false,
          correct: false
        };
      });

      setQuestions(shuffle(generatedQuestions).slice(0, 5));
      setCurrentQuestionIndex(0);
      setScore(0);
      setGameFinished(false);
    } catch (error) {
      console.error('Error preparing questions:', error);
      toast.error('Failed to prepare quiz questions');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (selectedOption: string) => {
    if (questions[currentQuestionIndex].answered) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.english;
    
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex] = {
      ...currentQuestion,
      answered: true,
      correct: isCorrect
    };
    
    setQuestions(updatedQuestions);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      toast.success('Correct answer!');
    } else {
      toast.error(`Incorrect. The answer is: ${currentQuestion.english}`);
    }
    
    // Move to next question after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setGameFinished(true);
      }
    }, 1500);
  };
  
  const startGame = () => {
    setGameStarted(true);
  };
  
  const restartGame = () => {
    setGameStarted(true);
    setGameFinished(false);
    prepareQuestions();
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "Perfect! You're a Sanskrit master!";
    if (percentage >= 80) return "Great job! You know your Sanskrit well!";
    if (percentage >= 60) return "Good effort! Keep practicing!";
    if (percentage >= 40) return "Not bad! More practice will help!";
    return "Keep learning! You'll improve with practice!";
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20">
      <div className="px-4 container max-w-7xl mx-auto flex-1 flex flex-col">
        <Header />
        
        <motion.main 
          className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-center mb-8">
            <span className="text-gradient">Sanskrit</span> Game
          </h1>
          
          {!gameStarted ? (
            <motion.div 
              className="w-full glass-morphism p-8 rounded-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-medium mb-6">Choose a category to practice:</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedCategory === category.id 
                        ? 'border-accent bg-accent/10' 
                        : 'border-border hover:border-accent/50'
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              
              <Button 
                className="w-full py-6 text-lg" 
                onClick={startGame}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Start Game'}
              </Button>
            </motion.div>
          ) : gameFinished ? (
            <motion.div 
              className="w-full glass-morphism p-8 rounded-xl text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-medium mb-4">Game Completed!</h2>
              <div className="text-6xl font-bold my-6">
                {score}/{questions.length}
              </div>
              <p className="text-xl mb-8">{getScoreMessage()}</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1 py-6" 
                  onClick={() => setGameStarted(false)}
                >
                  Choose Another Category
                </Button>
                <Button 
                  className="flex-1 py-6" 
                  onClick={restartGame}
                >
                  Play Again
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              className="w-full glass-morphism p-6 rounded-xl"
              key={currentQuestionIndex}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-medium">
                  Question {currentQuestionIndex + 1}/{questions.length}
                </span>
                <span className="text-sm font-medium">
                  Score: {score}
                </span>
              </div>
              
              <Progress 
                value={((currentQuestionIndex) / questions.length) * 100} 
                className="mb-6" 
              />
              
              <div className="text-center mb-8">
                <h2 className="text-xl mb-2">What does this Sanskrit word mean?</h2>
                <p className="text-3xl font-semibold sanskrit-text my-6">
                  {questions[currentQuestionIndex]?.sanskrit}
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {questions[currentQuestionIndex]?.options.map((option, index) => {
                  const currentQuestion = questions[currentQuestionIndex];
                  const isAnswered = currentQuestion.answered;
                  const isCorrect = option === currentQuestion.english;
                  
                  return (
                    <Button
                      key={index}
                      variant={
                        isAnswered
                          ? isCorrect
                            ? "default"
                            : option === currentQuestion.english
                              ? "default"
                              : "outline"
                          : "outline"
                      }
                      className={`py-6 text-lg ${
                        isAnswered && isCorrect ? "bg-green-500 hover:bg-green-600" : ""
                      } ${
                        isAnswered && !isCorrect && option !== currentQuestion.english
                          ? "opacity-70"
                          : ""
                      }`}
                      onClick={() => handleAnswer(option)}
                      disabled={isAnswered}
                    >
                      {option}
                    </Button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </motion.main>
      </div>
    </div>
  );
};

export default Game;
