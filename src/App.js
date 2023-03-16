import React, { useState, useEffect } from "react";
import MCQQuestion from "./MCQQuestion";

const App = () => {
  const [questions, setquestions] = useState([
    {
      question: "Ram lives in?",
      options: ["Mumbai", "Delhi", "Pune", "Bangalore"],
      correctAnswer: "Mumbai",
      answer: "",
      stats: [0, 0, 0, 0],
    },
    {
      question: "Population of Delhi is?",
      options: ["100000", "1M", "10M", "10000"],
      correctAnswer: "10M",
      answer: "",
      stats: [0, 0, 0, 0],
    },
    {
      question: "Niagra Falls is in?",
      options: ["USA", "Yemen", "Chile", "UK"],
      correctAnswer: "USA",
      answer: "",
      stats: [0, 0, 0, 0],
    },
    {
      question: "Ancient walls are made of?",
      options: ["Cement", "Concrete", "Sand", "Lime Stone"],
      correctAnswer: "Lime Stone",
      answer: "",
      stats: [0, 0, 0, 0],
    },
    {
      question: "Brass is made of?",
      options: [
        "Iron + Bronze",
        "Steel + Copper",
        "Copper + Zinc",
        "Mercury + Copper",
      ],
      correctAnswer: "Copper + Zinc",
      answer: "",
      stats: [0, 0, 0, 0],
    },
  ]);
  const [remainingQuestions, setremainingQuestions] = useState(questions);
  const [currentQuestion, setCurrentQuestion] = useState(
    questions[Math.floor(Math.random() * questions.length)]
  );
  const [numCorrect, setNumCorrect] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Generate a random question when the component mounts
    const randomQuestion =
      questions[Math.floor(Math.random() * questions.length)];
    setCurrentQuestion(randomQuestion);
  }, [questions]);

  const handleAnswer = (answer) => {
    // Check if the answer is correct and update the number of correct answers
    if (answer === currentQuestion.correctAnswer) {
      setNumCorrect((prevNum) => prevNum + 1);
    }

    // Check if there are any more questions, and show the results if not
    if (questions.length === 1) {
      setShowResults(true);
      return;
    }

    if (remainingQuestions.length > 0) {
      // Generate a new random question
      setremainingQuestions(
        remainingQuestions.filter(
          (q) => q.question !== currentQuestion.question
        )
      );
      const nextQuestion =
        remainingQuestions[
          Math.floor(Math.random() * remainingQuestions.length)
        ];
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResults(true);
    }
  };

  const tryAgain = () => {
    console.log("TRA");
    setquestions([
      {
        question: "Ram lives in?",
        options: ["Mumbai", "Delhi", "Pune", "Bangalore"],
        correctAnswer: "Mumbai",
        answer: "",
        stats: [0, 0, 0, 0],
      },
      {
        question: "Population of Delhi is?",
        options: ["100000", "1M", "10M", "10000"],
        correctAnswer: "10M",
        answer: "",
        stats: [0, 0, 0, 0],
      },
      {
        question: "Niagra Falls is in?",
        options: ["USA", "Yemen", "Chile", "UK"],
        correctAnswer: "USA",
        answer: "",
        stats: [0, 0, 0, 0],
      },
      {
        question: "Ancient walls are made of?",
        options: ["Cement", "Concrete", "Sand", "Lime Stone"],
        correctAnswer: "Lime Stone",
        answer: "",
        stats: [0, 0, 0, 0],
      },
      {
        question: "Brass is made of?",
        options: [
          "Iron + Bronze",
          "Steel + Copper",
          "Copper + Zinc",
          "Mercury + Copper",
        ],
        correctAnswer: "Copper + Zinc",
        answer: "",
        stats: [0, 0, 0, 0],
      },
    ]);
    setremainingQuestions(questions);
    setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)]);
    setNumCorrect(0);
    setShowResults(false);
  };

  var onSelect = (questionIndex, value) => {
    questions[questionIndex]["options"].forEach(function (option) {
      if (option === value) {
        var indexOfCurrectAnswerInOption =
          questions[questionIndex]["options"].indexOf(option);
        questions[questionIndex]["stats"][indexOfCurrectAnswerInOption] += 1;
      }
      questions[questionIndex]["answer"] = value;
    });
  };

  const renderQuestion = () => {
    return (
      <MCQQuestion
        questionIndex={questions.indexOf(currentQuestion)}
        question={currentQuestion.question}
        options={currentQuestion.options}
        onAnswer={handleAnswer}
        onSelect={onSelect}
      />
    );
  };

  const renderResults = () => {
    return (
      <div>
        <h3>Results</h3>

        <p>
          You answered {numCorrect} out of {questions.length} correct answers.
        </p>
        {questions.map((question) => (
          <div key={question.question}>
            <h4>{question.question}</h4>
            {question.options.map((option) => {
              console.log(option);
              return (
                <div key={option}>
                  <span
                    style={{
                      color:
                        option === question.correctAnswer
                          ? "rgb(50,200,50)"
                          : option !== question.correctAnswer &&
                            option === question.answer
                          ? "lightcoral"
                          : "black",
                      fontWeight:
                        option === question.correctAnswer ||
                        option === question.answer
                          ? "500"
                          : "400",
                    }}
                  >
                    {option} ( Touch :{" "}
                    {question.stats[question.options.indexOf(option)]} )
                  </span>
                </div>
              );
            })}
          </div>
        ))}
        <button
          onClick={() => {
            tryAgain();
            setShowResults(false);
          }}
          style={{
            cursor: "pointer",
            marginTop: "20px",
            padding: "8px 20px",
            background: "rgb(36,14,123)",
            color: "rgb(255,255,255)",
            border: "none",
            borderRadius: "5px",
            letterSpacing: "1px",
          }}
        >
          Try again
        </button>
      </div>
    );
  };

  return (
    <div>
      {showResults ? renderResults() : renderQuestion()}
      {currentQuestion && !showResults && (
        <button
          onClick={() => setShowResults(true)}
          style={{
            cursor: "pointer",
            marginTop: "50px",
            padding: "8px 20px",
            background: "rgb(36,14,123)",
            color: "rgb(255,255,255)",
            border: "none",
            borderRadius: "5px",
            letterSpacing: "1px",
          }}
        >
          See results
        </button>
      )}
    </div>
  );
};

export default App;
