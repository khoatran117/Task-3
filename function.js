const WordPuzzle = {
  QuestionList: [
    "XÔNGĐẤT",
    "GIAOTHỪA",
    "ĐÁNHĐU",
    "CÂYNÊU",
    "TẤTNIÊN",
    "BÁNHCHƯNG",
    "CÂUĐỐI",
    "HÁTXOAN",
    "NGÃBASÔNG",
  ],
  KeyWordIndex: [2, 0, 5, 2, 5, 2, 3, 1, 7],
};

const checkKeyword = (keyWordIndex, questionList) => {
  let isValid = true;
  questionList.find((question, index) => {
    if (keyWordIndex[index] >= question.length) {
      alert(
        `Vị trí keyword: ${keyWordIndex[index]} trong từ ${question} không hợp lệ`
      );
      isValid = false;
    }
  });

  return isValid;
};

const table = document.getElementById("table");
const questionContainer = document.getElementById("question-container");
const questionNumber = document.getElementById("question-number");
const questionTxt = document.getElementById("question");
const card = document.getElementById("card");

const cloneCard = (content, isBlank = false, isHighLight = false) => {
  const cloneCard = card.cloneNode(true);
  cloneCard.innerHTML = content;

  if (isBlank) {
    cloneCard.style.background = "none";
  }

  if (isHighLight) {
    cloneCard.style.backgroundColor = "yellow";
    cloneCard.style.color = "red";
  }

  return cloneCard;
};

const printWordPuzzle = () => {
  let listWords = [];
  let longestIndex = 0;

  if (!checkKeyword(WordPuzzle.KeyWordIndex, WordPuzzle.QuestionList)) {
    return;
  }

  WordPuzzle.QuestionList.map((word, index) => {
    const insertedWord = {
      number: index + 1,
      question: word,
      keyWord: word[WordPuzzle.KeyWordIndex[index]],
      keyWordIndex: WordPuzzle.KeyWordIndex[index],
    };

    if (longestIndex < insertedWord.keyWordIndex) {
      longestIndex = insertedWord.keyWordIndex;
    }

    listWords.push(insertedWord);
  });

  listWords.map((word) => {
    const cloneContainer = questionContainer.cloneNode(true);
    cloneContainer
      .querySelector("#question-number")
      .append(cloneCard(word.number));

    // Adding blank space for the words
    for (let i = 0; i < longestIndex - word.keyWordIndex; i++) {
      cloneContainer.querySelector("#question").append(cloneCard("", true));
    }

    word.question.split("").map((character, index) => {
      cloneContainer
        .querySelector("#question")
        .append(cloneCard(character, false, index === word.keyWordIndex));
    });

    table.appendChild(cloneContainer);
  });

  card.style.display = "none";
};

printWordPuzzle();
