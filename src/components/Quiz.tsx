"use client";

import React, {useState, useEffect } from 'react'
import { useWindowSize } from 'react-use';

import { Button } from "@/components/ui/button"

import questionsBank from "@/data/quizQuestions";
import Question from "@/components/Question";
import ReactConfetti from 'react-confetti';



 export  type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
  timeLimit: number;
};
const Quiz = () => {

    const [quizStarted, setQuizStarted] = useState(false);
      const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
      const [score, setScore] = useState(0);
      const [quizCompleted, setQuizCompleted] = useState(false);
      const [answeredQuestions, setAnsweredQuestions] = useState(0);
  
 const [questions, setQuestions] = useState<Question[]>([]);

    const { width = 0, height =0 } = useWindowSize();

   const shuffleQuestions = (questionsArray: Question[]) => {
        for (let i = questionsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questionsArray[i], questionsArray[j]] = [questionsArray[j], questionsArray[i]];
        }
        return questionsArray;
    };

    const startQuiz = () => {
        setQuizStarted(true);
        setCurrentQuestionIndex(0);
        setScore(0);
        setAnsweredQuestions(0);
        setQuizCompleted(false);

        const shuffledQuestions  = shuffleQuestions([...questionsBank]);
        setQuestions(shuffledQuestions.slice(0, 100));  
    }

    

    const handleAnswer = (answer: string) => {
        setAnsweredQuestions((prev) => prev + 1);

        if (answer === questions[currentQuestionIndex].correctAnswer) {
            setScore((prev) => prev + 1);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            setQuizCompleted(true);
        }
    }


    const handleTimeout = () => { 
        setAnsweredQuestions(answeredQuestions + 1);

        if(currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizCompleted(true);
        }
    }



    if (!quizStarted) {
        return (
            <div className="text-center mt-0 sm:mt-0">
                
                <h1 className = "text-4xl font-bold mb-4">
                    🚀 Welcome, Brave Quiz-Taker! 🧠
                </h1>
                <Button
                    className = "bg-blue-500 text-white px-6 py-8 rounded-lg text-3xl font-semibold hover:bg-blue-600 hover:scale-110 transition"
                    onClick={startQuiz}>
                    Start The Quiz
                </Button>
            </div>
        )
    }


    if (quizCompleted) {
        
        const isPerfectScore = score === questions.length;

        return (
            <div className="text-center">
                <h1 className = "text-3xl font-bold mb-6">
                    Quiz Results
                </h1>

                <h2 className = "text-4xl text-blue-500 font-bold mb-4">
                    Quiz Completed
                </h2>


                {isPerfectScore && <ReactConfetti width={width} height={height} />}
                <p className = {`text-4xl mb-3 text-amber-500 font-extrabold  ${isPerfectScore ? "text-green-600 font-bold mb-3" : "mb-3" }`}>
                    Your Score : {score} out of {questions.length}
                </p>

                <Button 
                    className = "bg-blue-500 text-white px-6 py-8 rounded-lg text-3xl font-semibold hover:bg-blue-600 hover:scale-110 transition"
                    onClick={startQuiz}>
                    Restart Quiz
                </Button>
            </div>
        )
        
    }

    
  return (
      <div className="flex min-h-screen min-w-[500px] flex-col items-center justify-center p-24">
          
        {/* "w-[100%] max-w-[600px] min-w-[500px] sm:w-[100%] h-screen  mx-auto flex flex-col justify-around text-center  sm:p-6 bg-emerald-100 rounded-lg " */}
          
      
          <h1 className = "text-3xl font-bold mb-0 ">
            🚀 Quiz App 🧠
          </h1>

            <Question 
                question={questions[currentQuestionIndex]}
                onAnswer={handleAnswer}
              onTimeout={handleTimeout}
            />


          <div className=
              "flex  flex-col items-center justify-center p-2">
              {/* "mt-0 p-10 text-3xl text-center flex  flex-col bg-amber-50 shadow-md rounded-lg  ">  */}
              <p className="flex flex-col items-center justify-center p-2">
                  
                {/*    "mt-0 py-0 text-3xl text-amber-500 font-medium sm:text-base"> */}
              Question : {currentQuestionIndex + 1} of {questions.length}
          </p>
          
            {/* Display the current score */}
              <p className="text-2xl text-amber-600 font-medium mt-0 mb-0 py-0 sm:text-base">
                Score: {score} / {questions.length}
            </p>

        </div>
      </div>
  )
}

export default Quiz