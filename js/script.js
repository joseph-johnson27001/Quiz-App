// ------------------------------------------------------------------
// VARIABLES
// ------------------------------------------------------------------

// Button Variables:
const topicContainer = document.getElementById("topic-container")
const topicButtons = document.getElementsByClassName("btn-topic")
const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const playAgainButton = document.getElementById("play-again-btn")
const historyButton = document.getElementById("history-button")
const sportButton = document.getElementById("sport-button")
const foodAndDrinkButton = document.getElementById("food-and-drink-button")
const moivesAndTelevisionButton = document.getElementById("movies-and-television-button")
const scienceButton = document.getElementById("science-button")
const geographyButton = document.getElementById("geography-button")
const musicButton = document.getElementById("music-button")
const generalKnowledgeButton = document.getElementById("general-knowledge-button")

// Container Variables:
const questionContainerElement = document.getElementById("question-container")
const correctAnswersContainer = document.getElementById("correct-answers-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
const questionAmountContainer = document.getElementById("number-of-questions-container")
const resultContainer = document.getElementById("result-container")

// Headings Variables:
const quizHeading = document.getElementById("quiz-heading")

// Count Variables:
let scoreCount = document.getElementById('score-count')
let questionCount = document.getElementById("question-count")
let resultScoreCount = document.getElementById("result-score-count")
let resultQuestionCount = document.getElementById("result-question-count")

//Undefined Variables:
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
})

playAgainButton.addEventListener("click", reloadGame)

// ------------------------------------------------------------------
// FUNCTIONS
// ------------------------------------------------------------------

document.querySelectorAll('button').forEach(function(e){
  e.addEventListener('click', setColor)
})

function setColor() {
  if(this.classList.contains("start-btn") && (!questions)) {
    return
  }
  else if(this.classList.contains("correct")) {
    this.classList.remove("correct")
  }
   else {
     this.classList.add("correct")
   }
 }

function startGame() {
  generateQuestionArray()
  if(!questions) {
      return
  }
  startButton.classList.add("hide")
  quizHeading.classList.add("hide")
  topicContainer.classList.add("hide")
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
      nextButton.classList.remove("hide", "correct")
  } else {
    playAgainButton.classList.remove("hide")
    resultContainer.classList.remove("hide");
    resultScoreCount.innerHTML = score
    resultQuestionCount.innerHTML = questionNumber
    questionContainerElement.classList.add("hide");
    correctAnswersContainer.classList.add("hide")
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


// FUNCTION TO GENERATE QUESTIONLIST OUT OF USERS SELECTED TOPICS

function generateQuestionArray() {
  let chosenQuestionsArray = []
  let questionsArray = []
   if(historyButton.classList.contains("correct")) {
     chosenQuestionsArray.push(historyQuestions)
   }
   if(sportButton.classList.contains("correct")) {
     chosenQuestionsArray.push(sportQuestions)
   }
   if(foodAndDrinkButton.classList.contains("correct")) {
     chosenQuestionsArray.push(foodAndDrinkQuestions)
   }
   if(moivesAndTelevisionButton.classList.contains("correct")) {
     chosenQuestionsArray.push(moviesAndTelevisionQuestions)
   }
   if(scienceButton.classList.contains("correct")) {
     chosenQuestionsArray.push(scienceQuestions)
   }
   if(geographyButton.classList.contains("correct")) {
     chosenQuestionsArray.push(geographyQuestions)
   }
   if(musicButton.classList.contains("correct")) {
     chosenQuestionsArray.push(musicQuestions)
   }
   if(generalKnowledgeButton.classList.contains("correct")) {
     chosenQuestionsArray.push(generalKnowledgeQuestions)
   }
  for (let i = 0; i < chosenQuestionsArray.length; i++) {
    for (let j = 0; j < chosenQuestionsArray[i].length; j++) {
      questionsArray.push(chosenQuestionsArray[i][j])
    }
    questions = questionsArray
  }
}

// Reload begining state FUNCTION

function reloadGame() {
  startButton.classList.remove("hide", "correct")
  quizHeading.classList.remove("hide")
  playAgainButton.classList.add("hide")
  topicContainer.classList.remove("hide")
  correctAnswersContainer.classList.add("hide")
  questionContainerElement.classList.add("hide")
  for(let i = 0; i < topicButtons.length; i++) {
    topicButtons[i].classList.remove("correct")
  }
  document.body.classList.remove("correct", "wrong")
  resultContainer.classList.add("hide");
  questions = "";
}

// ------------------------------------------------------------------
// QUESTIONS ARRAYS
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
  },
  {
    question: "Which Queen had the shortest reign of Henry VIII’s six wives?",
    answers: [
      { text: "Anne of Cleves", correct: true },
      { text: "Catherine Howard", correct: false },
      { text: "Anne Boleyn", correct: false },
      { text: "Catherine of Aragon", correct: false }
    ]
  },
  {
    question: "Where was Napoleon Bonaparte Born?",
    answers: [
      { text: "Paris", correct: false },
      { text: "Bordeaux", correct: false },
      { text: "Lyon", correct: false },
      { text: "Corsica", correct: true }
    ]
  },
  {
    question: "In 1066, which English King died, leaving no heir to the throne?",
    answers: [
      { text: "William I", correct: false },
      { text: "Edward the Confessor", correct: true },
      { text: "William II", correct: false },
      { text: "Henry I", correct: false }
    ]
  },
  {
    question: "Who sent the Spanish Armada to England in 1588?",
    answers: [
      { text: "Philip II of Spain", correct: true },
      { text: "Ferdinand VII of Spain", correct: false },
      { text: "King Alfonso", correct: false },
      { text: "El Cid", correct: false }
    ]
  },
  {
    question: "Which American President was in power during the ‘Black Thursday’ Wall Street crash?",
    answers: [
      { text: "Franklin Roosevelt", correct: false },
      { text: "Woodrow Wilson", correct: false },
      { text: "Theodore Roosevelt", correct: false },
      { text: "Herbert Hoover", correct: true }
    ]
  },
  {
    question: "At what famous French landmark was the document signed which set out the terms of ‘peace’ following the First World War?",
    answers: [
      { text: "The Eiffel Tower", correct: false },
      { text: "The Palace of Versailles", correct: true },
      { text: "The Louvre", correct: false },
      { text: "Notre Dame Cathedral", correct: false }
    ]
  },
  {
    question: "During 1963, in Washington DC, Martin Luther King Jr gave his famous ‘I have a dream’ speech on the steps of which famous landmark?",
    answers: [
      { text: "The Lincoln Memorial", correct: true },
      { text: "The White House", correct: false },
      { text: "The Capital Building", correct: false },
      { text: "The Washington Monument", correct: false }
    ]
  },
]

// ------------------------------------------------------------------
// SPORT QUESTIONS
// ------------------------------------------------------------------

const sportQuestions = [

  {
    question: "In American Football, how many points do you score for a touchdown?",
    answers: [
      { text: "2", correct: false },
      { text: "5", correct: false },
      { text: "6", correct: true },
      { text: "7", correct: false }
    ]
  },
  {
    question: "How many points did England score in the 2003 rugby world cup final?",
    answers: [
      { text: "18", correct: false },
      { text: "20", correct: true },
      { text: "26", correct: false },
      { text: "27", correct: false }
    ]
  },
  {
    question: "The Los Angeles Lakers and New York Knicks play which sport?",
    answers: [
      { text: "American Football", correct: false },
      { text: "Ice Hockey", correct: false },
      { text: "Baseball", correct: false },
      { text: "Basketball", correct: true }
    ]
  },
  {
    question: "Which country’s rugby team is called The Springboks?",
    answers: [
      { text: "South Africa", correct: true },
      { text: "France", correct: false },
      { text: "Australia", correct: false },
      { text: "New Zealand", correct: false }
    ]
  },
  {
    question: "Which English football team has the nickname 'The Foxes'?",
    answers: [
      { text: "Everton", correct: false },
      { text: "Leicester City", correct: true },
      { text: "Fulham", correct: false },
      { text: "Manchester United", correct: false }
    ]
  },
  {
    question: "How many players are there in a baseball team?",
    answers: [
      { text: "6", correct: false },
      { text: "8", correct: false },
      { text: "9", correct: true },
      { text: "12", correct: false }
    ]
  },
  {
    question: "What colour is the 8 ball in a game of pool?",
    answers: [
      { text: "Yellow", correct: false },
      { text: "Red", correct: false },
      { text: "Black", correct: true },
      { text: "Pink", correct: false }
    ]
  },
  {
    question: "What is the maximum score a player can receive in a game of ten pin bowling?",
    answers: [
      { text: "200", correct: false },
      { text: "300", correct: true },
      { text: "400", correct: false },
      { text: "500", correct: false }
    ]
  },
  {
    question: "What numbers are either side of 20 on a dart board?",
    answers: [
      { text: "5 & 1", correct: true },
      { text: "18 & 2", correct: false },
      { text: "5 & 2", correct: false },
      { text: "18 & 5", correct: false }
    ]
  },
  {
    question: "How many players are there on a volleyball team?",
    answers: [
      { text: "4", correct: false },
      { text: "6", correct: true },
      { text: "8", correct: false },
      { text: "10", correct: false }
    ]
  },
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
  {
    question: "How many cups of tea are drunk in the UK on average every day?",
    answers: [
      { text: "35 Million", correct: false },
      { text: "115 Million", correct: false },
      { text: "165 Million", correct: true },
      { text: "310 Million", correct: false }
    ]
  },
  {
    question: "What is the most consumed manufactured drink in the world?",
    answers: [
      { text: "Tea", correct: true },
      { text: "Coca-Cola", correct: false },
      { text: "Coffee", correct: false },
      { text: "Red Bull", correct: false }
    ]
  },
  {
    question: "What is James Bonds favourite drink?",
    answers: [
      { text: "Mojito", correct: false },
      { text: "Whiskey Sour", correct: false },
      { text: "Tequila Sunrise", correct: false },
      { text: "Vodka Martini", correct: true }
    ]
  },
  {
    question: "What is the most expensive spice in the world by weight?",
    answers: [
      { text: "Saffron", correct: true },
      { text: "Paprika", correct: false },
      { text: "Turmeric", correct: false },
      { text: "Cinamon", correct: false }
    ]
  },
  {
    question: "Gluten is found in which cereal grain?",
    answers: [
      { text: "Corn", correct: false },
      { text: "Barley", correct: false },
      { text: "Wheat", correct: true },
      { text: "Rye", correct: false }
    ]
  },
  {
    question: "In which country will you find the wine-growing region the Yarra Valley?",
    answers: [
      { text: "South Africa", correct: false },
      { text: "Australia", correct: true },
      { text: "Argentina", correct: false },
      { text: "Chile", correct: false }
    ]
  },
  {
    question: "How many calories are there in a glass of water?",
    answers: [
      { text: "0", correct: true },
      { text: "50", correct: false },
      { text: "100", correct: false },
      { text: "200", correct: false }
    ]
  },
  {
    question: "What does IPA stand for?",
    answers: [
      { text: "Irish Pale Ale", correct: false },
      { text: "International Pale Ale", correct: false },
      { text: "Intensely Premium Ale", correct: false },
      { text: "India Pale Ale", correct: true }
    ]
  },
  {
    question: "From which Spanish city does paella originate?",
    answers: [
      { text: "Barcelona", correct: false },
      { text: "Madrid", correct: false },
      { text: "Granada", correct: false },
      { text: "Valencia", correct: true }
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
  },
  {
    question: "In Harry Potter, what is the effect of the Obliviate spell?",
    answers: [
      { text: "Freezes Enemies", correct: false },
      { text: "Removes Memories", correct: true },
      { text: "Makes Something Float", correct: false },
      { text: "Creates A Bright Light", correct: false }
    ]
  },
  {
    question: "In which year was Daniel Craig’s first Bond film released?",
    answers: [
      { text: "2006", correct: true },
      { text: "2010", correct: false },
      { text: "2012", correct: false },
      { text: "2015", correct: false }
    ]
  },
  {
    question: "How many episodes of Game of Thrones are there?",
    answers: [
      { text: "46", correct: false },
      { text: "73", correct: true },
      { text: "92", correct: false },
      { text: "110", correct: false }
    ]
  },
  {
    question: "How many movies have Leonardo Di Caprio and Kate Winslet starred in together?",
    answers: [
      { text: "1", correct: false },
      { text: "2", correct: true },
      { text: "3", correct: false },
      { text: "4", correct: false }
    ]
  },
  {
    question: "Who directed Titanic, Avatar and The Terminator?",
    answers: [
      { text: "Peter Jackson", correct: false },
      { text: "Ridley Scott", correct: false },
      { text: "Steven Spielberg", correct: false },
      { text: "James Cameron", correct: true }
    ]
  },
  {
    question: "Who voiced Shrek?",
    answers: [
      { text: "Robert Carlyle", correct: false },
      { text: "Mike Myers", correct: true },
      { text: "Ewan McGregor", correct: false },
      { text: "Billy Connolly", correct: false }
    ]
  },
  {
    question: "In 'The Simpsons' what does Bart always do during the opening credits?",
    answers: [
      { text: "Drive Marge's Car", correct: false },
      { text: "Writes On The School Blackboard", correct: true },
      { text: "Play A Prank On Homer", correct: false },
      { text: "Eats A Krusty Burger", correct: false }
    ]
  },
  {
    question: "In the TV show 'Friends', what is Chandler's middle name?",
    answers: [
      { text: "Mildred", correct: false },
      { text: "Maybell", correct: false },
      { text: "Michael", correct: false },
      { text: "Muriel", correct: true }
    ]
  },
  {
    question: "In the Matrix, what colour pill does Neo take?",
    answers: [
      { text: "Blue", correct: false },
      { text: "Red", correct: true },
      { text: "Green", correct: false },
      { text: "Purple", correct: false }
    ]
  },

]

// ------------------------------------------------------------------
// SCIENCE QUESTIONS
// ------------------------------------------------------------------

const scienceQuestions = [

  {
    question: "Roughly, how long does it take for the suns light to reach earth?",
    answers: [
      { text: "8 Minutes", correct: true },
      { text: "8 Hours", correct: false },
      { text: "8 Days", correct: false },
      { text: "8 Weeks", correct: false }
    ]
  },
  {
    question: "At what temperature are Celsius and Farenheit equal?",
    answers: [
      { text: "40 degrees", correct: false },
      { text: "0 degrees", correct: false },
      { text: "-20 degrees", correct: false },
      { text: "-40 degrees", correct: true }
    ]
  },
  {
    question: "What is the biggest planet in our Solar System?",
    answers: [
      { text: "Saturn", correct: false },
      { text: "Mars", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Neptune", correct: false }
    ]
  },
  {
    question: "On the periodic table, what symbol stands for silver?",
    answers: [
      { text: "Si", correct: false },
      { text: "Ag", correct: true },
      { text: "Sl", correct: false },
      { text: "Au", correct: false }
    ]
  },
  {
    question: "Which two planets lack moons?",
    answers: [
      { text: "Mercury & Venus", correct: true },
      { text: "Earth & Mars", correct: false },
      { text: "Jupiter & Saturn", correct: false },
      { text: "Uranus & Neptune", correct: false }
    ]
  },
  {
    question: "What is the collective name for a group of crows?",
    answers: [
      { text: "A Congregation", correct: false },
      { text: "A Murder", correct: true },
      { text: "A Gang", correct: false },
      { text: "A Caravan", correct: false }
    ]
  },
  {
    question: "What type of sugar does the brain need for energy?",
    answers: [
      { text: "Fructose", correct: false },
      { text: "Sucrose", correct: false },
      { text: "Glucose", correct: true },
      { text: "Aspartame", correct: false }
    ]
  },
  {
    question: "Out of the seven colours of the rainbow, which one is in the middle?",
    answers: [
      { text: "Red", correct: false },
      { text: "Violet", correct: false },
      { text: "Yellow", correct: false },
      { text: "Green", correct: true }
    ]
  },
  {
    question: "For which animal is the Latin word lupine used?",
    answers: [
      { text: "Wolf", correct: true },
      { text: "Parrot", correct: false },
      { text: "Shark", correct: false },
      { text: "Tiger", correct: false }
    ]
  },
  {
    question: "What is table salt's chemical name?",
    answers: [
      { text: "Sodium Hydroxide", correct: false },
      { text: "Sodium Chloride", correct: true },
      { text: "Carbon Hydroxide", correct: false },
      { text: "Carbon Dioxide", correct: false }
    ]
  },
]

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
  {
    question: "What is the capital of Cambodia?",
    answers: [
      { text: "Phnom Penh", correct: true },
      { text: "Hanoi", correct: false },
      { text: "Chiang Mai", correct: false },
      { text: "Vientiane", correct: false }
    ]
  },
  {
    question: "If you were stood in Busan, which country would you be in?",
    answers: [
      { text: "Japan", correct: false },
      { text: "South Korea", correct: true },
      { text: "Thailand", correct: false },
      { text: "Russia", correct: false }
    ]
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      { text: "Sahara", correct: false },
      { text: "Gobi", correct: false },
      { text: "Mojave", correct: false },
      { text: "Antarctic", correct: true }
    ]
  },
  {
    question: "In which city would you find La Sagrada Familia?",
    answers: [
      { text: "Rome", correct: false },
      { text: "Paris", correct: false },
      { text: "Barcelona", correct: true },
      { text: "Lisbon", correct: false }
    ]
  },
  {
    question: "In which country would you find Lake Bled?",
    answers: [
      { text: "Slovenia", correct: true },
      { text: "Czech Republic", correct: false },
      { text: "Croatia", correct: false },
      { text: "Greece", correct: false }
    ]
  },
  {
    question: "What is the currency of Malaysia?",
    answers: [
      { text: "Ringet", correct: true },
      { text: "Baht", correct: false },
      { text: "Rupee", correct: false },
      { text: "Yuan", correct: false }
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
  {
    question: "What instrument did Phil Collins play when he was a member of Genesis?",
    answers: [
      { text: "Guitar", correct: false },
      { text: "Drums", correct: true },
      { text: "Bass", correct: false },
      { text: "Keyboard", correct: false }
    ]
  },
  {
    question: "Which female artist released the single 'Rolling in the Deep'?",
    answers: [
      { text: "Taylor Swift", correct: false },
      { text: "Madonna", correct: false },
      { text: "Adele", correct: true },
      { text: "Kylie Minogue", correct: false }
    ]
  },
  {
    question: "In which year of the nineties did Nirvana frontman Kurt Cobain die?",
    answers: [
      { text: "1999", correct: false },
      { text: "1998", correct: false },
      { text: "1996", correct: false },
      { text: "1994", correct: true }
    ]
  },
  {
    question: "Eurovision sensation ABBA came from which country?",
    answers: [
      { text: "Sweden", correct: true },
      { text: "Finland", correct: false },
      { text: "Denmark", correct: false },
      { text: "Ireland", correct: false }
    ]
  },
  {
    question: "Which famous film star danced (and flew) in the video to Fatboy Slim’s 2001 track Weapon of choice?",
    answers: [
      { text: "John Travolta", correct: false },
      { text: "Christopher Walken", correct: true },
      { text: "Tom Cruise", correct: false },
      { text: "Bruce Willis", correct: false }
    ]
  },
  {
    question: "David Bowie appeared in what cult film in 1986?",
    answers: [
      { text: "Back To The Future", correct: false },
      { text: "The Never Ending Story", correct: false },
      { text: "Labyrinth", correct: true },
      { text: "Top Gun", correct: false }
    ]
  },
  {
    question: "What instrument does Vanessa Carlton play in the music video to 'A Thousand Miles'?",
    answers: [
      { text: "Guitar", correct: false },
      { text: "The Drums", correct: false },
      { text: "Triangle", correct: false },
      { text: "Piano", correct: true }
    ]
  },
  {
    question: "'In the End' was a year 2000 track for which band?",
    answers: [
      { text: "Linkin Park", correct: true },
      { text: "Blink -182", correct: false },
      { text: "Limp Bizkit", correct: false },
      { text: "Greenday", correct: false }
    ]
  },
  {
    question: "How many number one singles did Oasis have?",
    answers: [
      { text: "4", correct: false },
      { text: "8", correct: true },
      { text: "12", correct: false },
      { text: "16", correct: false }
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
  {
    question: "What is the value of the letter 'K' in a game of scrabble?",
    answers: [
      { text: "3", correct: false },
      { text: "4", correct: false },
      { text: "5", correct: true },
      { text: "6", correct: false }
    ]
  },
  {
    question: "In which country was the game 'Mahjong' invented?",
    answers: [
      { text: "Japan", correct: false },
      { text: "South Korea", correct: false },
      { text: "Vietnam", correct: false },
      { text: "China", correct: true }
    ]
  },
  {
    question: "Who painted the 'Mona Lisa'?",
    answers: [
      { text: "Claude Monet", correct: false },
      { text: "Leonardo Da Vinci", correct: true },
      { text: "Pablo Picasso", correct: false },
      { text: "Vincent Van Gogh", correct: false }
    ]
  },
  {
    question: "In which franchise would you find the character Katniss Everdeen?",
    answers: [
      { text: "The Hunger Games", correct: true },
      { text: "The Maze Runner", correct: false },
      { text: "Twilight", correct: false },
      { text: "Lord of the Rings", correct: false }
    ]
  },
  {
    question: "How many minutes in a game of rugby league?",
    answers: [
      { text: "80", correct: true },
      { text: "90", correct: false },
      { text: "100", correct: false },
      { text: "120", correct: false }
    ]
  },
  {
    question: "In which decade was Heinz established?",
    answers: [
      { text: "1820s", correct: false },
      { text: "1860s", correct: true },
      { text: "1900s", correct: false },
      { text: "1920s", correct: false }
    ]
  },
  {
    question: "Which of these Tom Hanks films was released first?",
    answers: [
      { text: "Catch Me If You Can", correct: false },
      { text: "The Terminal", correct: false },
      { text: "Apollo 13", correct: false },
      { text: "Forest Gump", correct: true }
    ]
  },
  {
    question: "What is the smallest country in the world?",
    answers: [
      { text: "San Marino", correct: false },
      { text: "Monaco", correct: false },
      { text: "Vatican City", correct: true },
      { text: "Luxembourg", correct: false }
    ]
  },
  {
    question: "Which country in the world is believed to have the most miles of motorway?",
    answers: [
      { text: "China", correct: true },
      { text: "U.S.A", correct: false },
      { text: "Russia", correct: false },
      { text: "Japan", correct: false }
    ]
  },
]
