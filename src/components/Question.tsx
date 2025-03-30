'use Client';
import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'

interface QuestionProps {
    question : {
        question : string
        options: string[]
        correctAnswer: string
        timeLimit : number
    }

    // string with a void return type
    onAnswer: (answer: string) => void
    onTimeout: () => void
}

const Question = (

    
    { question, onAnswer, onTimeout } : QuestionProps
) => {


    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const [timeLeft, setTimeLeft] = useState(question.timeLimit)
 
    // set time limit for change in question
    useEffect(() => {
        // set selected answer to null when question changes
        setSelectedAnswer(null)
        setTimeLeft(question.timeLimit)
    }, [question]);

  const handleOptionClick = (option: string) => {
      setSelectedAnswer(option);
      setTimeout(() => {
        onAnswer(option);
    },2000); // Delay the onAnswer call by 1 second
  };
    
    useEffect(() => { 

        const timer = setInterval(() => {

            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer)

                    setSelectedAnswer(question.correctAnswer); // Highlight the correct answer

                     setTimeout(() => {
                        onTimeout()// Call the parent function after a delay
        }, 2000); // 2-second delay to highlight the correct answer
                    return 0
                }
                return prevTime - 1
            })
        }, 1000)

        // so there is no overlapping between two useEffects
        return () => clearInterval(timer)
    }, [question, onTimeout])


 
    return (
  
    <div className= "bg-amber-50 shadow-md rounded-lg p-6">

        <h2 className="text-4xl font-semibold mb-2  text-blue-700">
            {question.question}
        </h2>      


        <div className="space-y-4  px-4 py-2 rounded-lg mb-0">
            {question.options.map((option, index) => (
                <Button 
                    key={index}
                    className={`w-full text-left justify-start px-6 py-8  rounded-lg font-semibold text-3xl  ${
              selectedAnswer !== null
                ? option === question.correctAnswer
                  ? 'bg-green-800 text-white'
                  : selectedAnswer === option
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-black'
                : 'bg-blue-500 text-white  hover:bg-blue-600'
            }`}
                    onClick={() => handleOptionClick(option)}   
                    
                    disabled={!!selectedAnswer} // Disable button if an answer is selected
                >
                    {option}
                </Button>
            ))}
        </div>



        {/* time  */}

        <div className="mt-2 text-center ">
            <p className="text-sm font-medium">
                Time remaining: {timeLeft} seconds
            </p>
        </div>


        <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${(timeLeft / question.timeLimit) * 100}%` }}
        ></div>



  </div>

    )}


export default Question