// ------------------------------------------------------------------
// VARIABLES
// ------------------------------------------------------------------

const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerElement = document.getElementById("question-container")
const correctAnswersContainer = document.getElementById("correct-answers-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
let scoreCount = document.getElementById('score-count')
let score = 0
let shuffledQuestions, currentQuestionIndex

// ------------------------------------------------------------------
// Event Listeners
// ------------------------------------------------------------------

startButton.addEventListener('click', startGame)
nextButton.addEventListener("click", () => {
  currentQuestionIndex++
  setNextQuestion()
})

// ------------------------------------------------------------------
// FUNCTIONS
// ------------------------------------------------------------------

function startGame() {
  startButton.classList.add("hide")
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  score = 0
  scoreCount.innerHTML = score
  correctAnswersContainer.classList.remove("hide")
  questionContainerElement.classList.remove("hide")
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement("button")
    button.innerText = answer.text
    button.classList.add("btn")
    if(answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener("click", selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add("hide")
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (selectedButton.dataset.correct) {
    score++
    scoreCount.innerHTML = score
  }
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove("hide")
  } else {
    startButton.innerText = "Restart"
    startButton.classList.remove("hide")
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add("correct")
  } else {
    element.classList.add("wrong")
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct")
  element.classList.remove("wrong")
}


// ------------------------------------------------------------------
// Questions Array
// ------------------------------------------------------------------

const questions = [
  {
    question: "How many states of America begin with the letter I?",
    answers: [
      { text: "4", correct: true },
      { text: "2", correct: false },
      { text: "3", correct: false },
      { text: "5", correct: false }
    ]
  },
  {
    question: "What is the capital of Brazil?",
    answers: [
      { text: "Buenos Aires", correct: false },
      { text: "Rio De Janeiro", correct: false },
      { text: "Brasilia", correct: true },
      { text: "Santiago", correct: false }
    ]
  },
  {
    question: "What year was the fall of Constantinope?",
    answers: [
      { text: "1213", correct: false },
      { text: "808", correct: false },
      { text: "1612", correct: false },
      { text: "1453", correct: true }
    ]
  },
  {
    question: "Who was the second Emperor of the Roman Empire?",
    answers: [
      { text: "Tiberius", correct: true },
      { text: "Augustus", correct: false },
      { text: "Caligula", correct: false },
      { text: "Julius Caesar", correct: false }
    ]
  },
  {
    question: "Richard the Lionheart was part of which Christian Crusade?",
    answers: [
      { text: "First", correct: false },
      { text: "Second", correct: false },
      { text: "Third", correct: true },
      { text: "Fourth", correct: false }
    ]
  },
  {
    question: "How many different opening moves can white make in a game of chess?",
    answers: [
      { text: "16", correct: false },
      { text: "18", correct: false },
      { text: "20", correct: true },
      { text: "22", correct: false }
    ]
  },
]
