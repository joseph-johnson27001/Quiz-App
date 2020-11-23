// ------------------------------------------------------------------
// VARIABLES
// ------------------------------------------------------------------
const topicContainer = document.getElementById("topic-container")
const topicButtons = document.getElementsByClassName("btn-topic")
const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerElement = document.getElementById("question-container")
const correctAnswersContainer = document.getElementById("correct-answers-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
const quizHeading = document.getElementById("quiz-heading")
const questionAmountContainer = document.getElementById("number-of-questions-container")
let scoreCount = document.getElementById('score-count')
let questionCount = document.getElementById("question-count")
let shuffledQuestions, currentQuestionIndex, questionNumber, score, questions

// ------------------------------------------------------------------
// Event Listeners
// ------------------------------------------------------------------

startButton.addEventListener('click', startGame)

nextButton.addEventListener("click", () => {
  currentQuestionIndex++
  questionNumber++
  questionCount.innerHTML = questionNumber
  setNextQuestion()
// Code for specifying the number of questions - currently set at 5
//     if (questionNumber == 5) {
//       startButton.innerText = "Restart"
//       startButton.classList.remove("hide")
//       nextButton.classList.add("hide")
//     }
})

// ------------------------------------------------------------------
// FUNCTIONS
// ------------------------------------------------------------------

document.querySelectorAll('button').forEach(function(e){
  e.addEventListener('click', setColor)
})

function setColor() {
  if(this.classList.contains("correct")) {
    this.classList.remove("correct")
  }
   else {
     this.classList.add("correct")
   }
 }

function startGame() {
  generateQuestionArray()
  startButton.classList.add("hide")
  quizHeading.classList.add("hide")
  topicContainer.classList.add("hide")
  // questionAmountContainer.classList.add("hide")
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  score = 0
  questionNumber = 1
  scoreCount.innerHTML = score
  questionCount.innerHTML = questionNumber
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
  if (correct && !selectedButton.classList.contains("correct")) {
    score++
    scoreCount.innerHTML = score
  }
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
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

function generateQuestionArray() {
  let questionArray = []
   questions = questionArray.concat(historyQuestions,
     sportQuestions,
     foodAndDrinkQuestions,
     moviesAndTelevisionQuestions,
     scieneQuestions,
     geographyQuestions,
     musicQuestions,
     generalKnowledgeQuestions)
}

// ------------------------------------------------------------------
// QUESTIONS ARRAY
// ------------------------------------------------------------------


// ------------------------------------------------------------------
// HISTORY QUESTIONS
// ------------------------------------------------------------------


const historyQuestions = [

  {
    question: "What year was the fall of Constantinople?",
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
  }
]

// ------------------------------------------------------------------
// SPORT QUESTIONS
// ------------------------------------------------------------------

const sportQuestions = [

]

// ------------------------------------------------------------------
// FOOD & DRINK QUESTIONS
// ------------------------------------------------------------------

const foodAndDrinkQuestions = [
  {
    question: "What is the main alcohol used in a Mojito?",
    answers: [
      { text: "Whiskey", correct: false },
      { text: "Gin", correct: false },
      { text: "Vodka", correct: false },
      { text: "White Rum", correct: true }
    ]
  },
]

// ------------------------------------------------------------------
// MOVIES & TELEVISION QUESTIONS
// ------------------------------------------------------------------

const moviesAndTelevisionQuestions = [
  {
    question: "Who was the main actress in the original Alien movie franchise?",
    answers: [
      { text: "Jodie Foster", correct: false },
      { text: "Sigourney Weaver", correct: true },
      { text: "Winona Ryder", correct: false },
      { text: "Sharon Stone", correct: false }
    ]
  }
]

// ------------------------------------------------------------------
// SCIENCE QUESTIONS
// ------------------------------------------------------------------

const scieneQuestions = []

// ------------------------------------------------------------------
// GEOGRAPHY QUESTIONS
// ------------------------------------------------------------------

const geographyQuestions = [
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
    question: "In which U.S. state is the San Andreas Fault?",
    answers: [
      { text: "Nevada", correct: false },
      { text: "New Mexico", correct: false },
      { text: "Arizona", correct: false },
      { text: "California", correct: true }
    ]
  },
  {
    question: "Vilnius is the capital of which country?",
    answers: [
      { text: "Latvia", correct: false },
      { text: "Belarus", correct: false },
      { text: "Lithuania", correct: true },
      { text: "Estonia", correct: false }
    ]
  },
]

// ------------------------------------------------------------------
// MUSIC QUESTIONS
// ------------------------------------------------------------------

const musicQuestions = [
  {
    question: "David Gilmour is known for being a gutiarist in which band?",
    answers: [
      { text: "Pink Floyd", correct: true },
      { text: "Metalica", correct: false },
      { text: "The Beatles", correct: false },
      { text: "Thin Lizzy", correct: false }
    ]
  },
]

// ------------------------------------------------------------------
// GENERAL KNOWLEDGE QUESTIONS
// ------------------------------------------------------------------

const generalKnowledgeQuestions = [
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
