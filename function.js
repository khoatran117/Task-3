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
  questionList.map((question, index) => {
    console.log(keyWordIndex[index], question);
    if (keyWordIndex[index] >= question.length) {
      alert(
        `Vị trí keyword: ${keyWordIndex[index]} trong từ ${question} không hợp lệ`
      );
      return false;
    }
  });

  return true;
};

const table = document.getElementById("table");
const questionContainer = document.getElementById("question-container");
const questionNumber = document.getElementById("question-number");
const questionTxt = document.getElementById("question");
const card = document.getElementById("card");

class QuestionWord {
  constructor(number, question, keyWord, keyWordIndex) {
    this.number = number;
    this.question = question;
    this.keyWord = keyWord;
    this.keyWordIndex = keyWordIndex;
  }
}

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
  } else {
    WordPuzzle.QuestionList.map((word, index) => {
      const insertedWord = new QuestionWord(
        index + 1,
        word,
        word[WordPuzzle.KeyWordIndex[index]],
        WordPuzzle.KeyWordIndex[index]
      );

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
  }
};

printWordPuzzle();
