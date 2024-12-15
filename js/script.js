import "./fonts.js";
import "./mode.js";

/* 
!: Bunday import qilishni youtubeda yoki instagramda korgan edim aniq esimda yoq.
*/

const wrapper = document.querySelector(".wrapper");
const searchInput = document.querySelector("#searchInput");
const button = document.querySelector("#button");
const undText = document.querySelector(".undText");
const errorText = document.querySelector(".errorText");

function resetMessages() {
  undText.style.display = "none";
  errorText.style.display = "none";
}

function checkIndex(definitions) {
  return definitions
    .map((def) => {
      let exampleText = "";
      if (def.example) {
        exampleText = `<p>\"${def.example}\"</p>`;
      }
      return `
          <li><span>${def.definition}</span></li>
          ${exampleText}
        `;
    })
    .join("");
}

function checkSynonyms(data) {
  let synonymsText = "";
  if (data.synonyms && data.synonyms.length > 0) {
    synonymsText = data.synonyms.join(", ");
  } else {
    synonymsText = "No synonyms available";
  }
  return synonymsText;
}

function checkMeaning(meanings) {
  return meanings
    .map(
      (meaning) => `
      <div class="wrapWrapper">
        <strong class="nove">${meaning.partOfSpeech}</strong>
        <div class="pofLine"></div>
      </div>
        <br>
        <strong class="meaningTwo">Meaning</strong>
        <ul class="chInd">${checkIndex(meaning.definitions)}</ul>
        <div class="synWrapper">
          <strong>Synonyms</strong>
          <p>${checkSynonyms(meaning)}</p>
        </div>
      `
    )
    .join("");
}

function createCard(data) {
  return `
        <h1>${data[0].word}</h1>
        <p class="phonetic">${data[0].phonetic || "No phonetic available"}</p>
        ${checkMeaning(data[0].meanings)}
        <div class="pofLineOne"></div>
        <div class="wrapperLinks">
          <a href="${data[0].sourceUrls[0]}" target="_blank">Source</a>
          <a href="${data[0].sourceUrls[0]}" target="_blank">${
    data[0].sourceUrls[0]
  }</a>
          <a href="${data[0].sourceUrls[0]}" target="_blank">
            <img src="../images/link-icon.svg" alt="Link Icon" />
          </a>
        </div>
      `;
}

button &&
  button.addEventListener("click", function () {
    resetMessages();

    let word = searchInput.value.trim();
    if (!word) {
      undText.style.display = "block";
      searchInput.style.outline = "1px solid #FF5252";
      return;
    }

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Word not found");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (!data || !data[0]) {
          throw new Error("Invalid response format");
        }
        wrapper.innerHTML = createCard(data);
        searchInput.value = "";
      })
      .catch((error) => {
        console.error(error);
        errorText.style.display = "block";
      });
  });

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    button.click();
  }
});

// !: || https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp || Shu saytdan topdim button orniga enter ishlatishni.
