import { useState, useEffect } from "react";

const APIurl = "https://wd40-trivia.onrender.com/api/questions";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore]= useState(0);
  

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(APIurl);
      const data = await response.json();
      setQuestions(data);
      setSelectedAnswers(new Array(data.length).fill(""));
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(updatedSelectedAnswers);
  };

  
  

  const handleNextQuestion = () => {
    const selectedAnswerIndex = selectedAnswers[currentQuestion];
    const currentQuestionObj = questions[currentQuestion];
    const correctAnswer = currentQuestionObj.correctAnswer;
  
    if (currentQuestionObj.answers[selectedAnswerIndex] === correctAnswer) {
      setScore(score + 1);
    }
  
    if (currentQuestion === questions.length - 1) {
      setCurrentQuestion(0);
      setSelectedAnswers(new Array(questions.length).fill(""));
    } else {
      setCurrentQuestion((nextQuestion) => nextQuestion + 1);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(questions.length).fill(""));
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const currentQuestionObj = questions[currentQuestion];

  const isQuizComplete = selectedAnswers.every(
    (selectedAnswer) => selectedAnswer !== ""
  );

  return (
    <div className="App">
      <div className="Header"><h1>Trivia Quiz</h1></div>
      {isQuizComplete ? (
        <div>
          <h2>:: Review Answers ::</h2>
          <div>
          <ul className="Answers">
            {questions.map((question, index) => (
              <li className="Qa" key={index}>
                <div>
                  <strong style={{color: "rgb(67, 67, 31)"}}>QUESTION : </strong>{question.question}
                </div>
                <div>
                  <strong style={{color: "rgb(67, 67, 31)"}}>YOUR ANSWER : </strong>{" "}
                  <strong  style={{color: "wheat"}}>{question.answers[selectedAnswers[index]]}</strong>
                </div>
                <div>
                  <strong style={{color: "rgb(67, 67, 31)"}}>CORRECT ANSWER : </strong>{" "}
                  {question.correctAnswer}
                </div>
              </li>
            ))}
          </ul>
          </div>
          <h2>Score: {score} / {questions.length}</h2>
          <div className="funkyFoot"><button onClick={restartQuiz}>Restart Quiz</button></div>
        </div>
      ) : (
        <div>
          <h2>::  Question Number {currentQuestion + 1}  ::</h2>
          <p>{currentQuestionObj.question}</p>
          <ul>
            {currentQuestionObj.answers.map((answer, index) => (
              <li key={index}>
                <button onClick={() => handleAnswerSelect(index)}>
                  {answer}
                </button>
              </li>
            ))}
          </ul>
          <div className="foot"><button
            onClick={handleNextQuestion}
            disabled={currentQuestion === questions.length - 1}
          >
            Next
          </button></div>
          <div className="funkyFoot"></div>
        </div>
      )}
    </div>
  );
}

export default App;


