const questions = [
    {
        question: "1. האם האנשים המעורבים בתקלה ביצעו שגיאה מבוססת ביצועים?",
        answer: [
            "כן",
            "לא",
        ],
        nextQuestion: [
            1,
            1,
        ],
        answerCode: [
            "AE100",
            "",
        ],
    },
    {
        question: "2. האם הפעולות של האנשים המעורבים בתקלה נבעו מסיבות של הערכה לקויה או משגיאה בקבלת החלטות?",
        answer: [
            "כן",
            "לא",
        ],
        nextQuestion: [
            2,
            2,
        ],
        answerCode: [
            "AE200",
            "",
        ],
    },
    {
        question: "3. האם האנשים המעורבים בתקלה הפרו איזה חוק או תקנה ידועים?",
        answer: [
            "כן",
            "לא",
        ],
        nextQuestion: [
            3,
            3,
        ],
        answerCode: [
            "AV000",
            "",
        ],
    },
    {
        question: "4. האם הסביבה היוותה גורם כלשהו בתקלה?",
        answer: [
            "כן",
            "לא",
        ],
        nextQuestion: [
            4,
            6,
        ],
        answerCode: [
            "",
            "",
        ],
    },
    {
        question: "5. האם לסביבה הפיזית הייתה השפעה על האנשים המעורבים בתקלה?",
        answer: [
            "כן",
            "לא",
        ],
        nextQuestion: [
            5,
            5,
        ],
        answerCode: [
            "PE100",
            "",
        ],
    },
    {
        question: "6. האם הסביבה היוותה גורם כלשהו בתקלה?",
        answer: [
            "כן",
            "לא",
        ],
        nextQuestion: [
            4,
            6,
        ],
        answerCode: [
            "",
            "",
        ],
    },
    {
        question: "7. האם יתכן כי האקלים/התרבות הבטיחותיות תרמו למצב לא בטוח?",
        answer: [
            "כן",
            "לא",
        ],
        nextQuestion: [
            -1,
            -1,
        ],
        answerCode: [
            "Oc000",
            "",
        ],
    },
];

let currentQuestionNumber = 0
const answerCodes = [];

function startQuiz(questionNumber) {
    document.getElementById("openingDiv").innerHTML = ``;
    currentQuestionNumber = questionNumber;
    const q = questions[questionNumber];
    console.log(questionNumber);
    console.log(q);
    const questionP = document.getElementById('questionP');
    questionP.innerText = q.question;

    const hr = document.createElement("hr");
    questionP.appendChild(hr);

    const answersArea = document.getElementById('answersArea');
    answersArea.innerHTML = '';

    for (let i = 0; i < q.answer.length; i++) {
        answersArea.innerHTML += `<label><input type="radio" id="ans_${i}" value="${i}" name="answerRadio"> ${q.answer[i]} </label>`;
    }

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "השאלה הבאה";
    nextBtn.setAttribute("type", "button");
    nextBtn.setAttribute("class", "btnClass");
    nextBtn.setAttribute("onclick", "showNextQuestion()");
    answersArea.appendChild(nextBtn);
}

function showNextQuestion() {
    const q = questions[currentQuestionNumber];
    for (let i = 0; i < q.answer.length; i++) {
        const radio = document.getElementById(`ans_${i}`);
        if (radio.checked) {
            const sel = radio.value;
            const nextQuestionNumber = q.nextQuestion[sel];
            answerCodes.push(q.answerCode[sel]);

            if (nextQuestionNumber == -1) {
                endQuiz();
            } else {
                startQuiz(nextQuestionNumber);
            }
            return;
        }
    }
}

function endQuiz() {
    console.log("end quiz");
    const quizArea = document.getElementById('quizAreaDiv');
    const endP = document.createElement("p");
    endP.setAttribute("class", "endPClass");
    const codesP = document.createElement("p");
    codesP.setAttribute("class", "codesPClass");
    endP.textContent = 'הגעת לסוף השאלון, הקודים שהתקבלו הינם: ';
    codesP.textContent = '';
    answerCodes.forEach(code => {
        if (code != '') {
            codesP.textContent += code + ', ';
        }
    });
    codesP.textContent = codesP.textContent.substring(0, codesP.textContent.length - 2);
    quizAreaDiv.innerHTML = ``;
    quizArea.appendChild(endP);
    quizArea.appendChild(codesP);
}