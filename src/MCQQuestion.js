import React, { useState } from "react";

const MCQQuestion = ({
  questionIndex,
  question,
  options,
  onAnswer,
  onSelect,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleOptionChange = (event) => {
    setSelectedAnswer(event.target.value);
    onSelect(questionIndex, event.target.value);
  };

  const handleSubmit = async () => {
    if (selectedAnswer === "") {
      alert("Please choose answer");
      return;
    }
    // Timeout is used to make sure concurrent event rendered first.
    setTimeout(async () => {
      await onAnswer(selectedAnswer);
    }, 50);
  };

  return (
    <div>
      <h3>{question}</h3>
      {options.map((option) => (
        <div key={option}>
          <input
            type="radio"
            value={option}
            checked={selectedAnswer === option}
            onChange={handleOptionChange}
          />
          {option}
        </div>
      ))}
      <button
        onClick={handleSubmit}
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
        Next
      </button>
    </div>
  );
};

export default MCQQuestion;
