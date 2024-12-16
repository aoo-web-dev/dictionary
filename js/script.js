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

// ! Buni validatsiya desa ham boladi.

function resetMessages() {
  undText.style.display = "none";
  errorText.style.display = "none";
}

// ! Kelayotgan funksiyalar API ichidagi qiymatlarni aylantirib tanlab tekshiradi.

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

function getAudioUrl(phoneticData) {
  let audioUrl = "";

  for (let i = 0; i < phoneticData.length; i++) {
    if (phoneticData[i].audio) {
      audioUrl = phoneticData[i].audio;
      break;
    }
  }

  return audioUrl;
}

function getAudioWrapperContent(audioUrl) {
  let audioWrapperContent;

  if (audioUrl) {
    audioWrapperContent = `
      <button class="audioBtn">
        <img src="../images/audio-icon-button.svg" loading="lazy" />
        <audio class="audioElement">
          <source src="${audioUrl}" type="audio/mp3" />
          Sizning brauzeringiz audio elementni qo'llab-quvvatlamaydi.
        </audio>
      </button>
    `;
  } else {
    audioWrapperContent = "<p>Audio mavjud emas</p>";
  }

  return audioWrapperContent;
}

// ! Wrapper ichidagi malumotlar chiqishi uchun shablon.

function createCard(data) {
  const phoneticData = data[0].phonetics;
  const audioUrl = getAudioUrl(phoneticData);
  const audioWrapperContent = getAudioWrapperContent(audioUrl);

  return `
    <h1>${data[0].word}</h1>
    <div class="audioWrapper">
      ${audioWrapperContent} 
    </div>
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

// ! Button bosilgandagi hodisa va jarayonlar kodi

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
        // ! Bu response.ok API yaxshi ishlashini tekshiradi yani 200-299 oraligida true qaytaradi boshqa payt false degan manoda qilingan.
        if (!response.ok) {
          throw new Error("Word not found");
        }
        return response.json();
      })
      .then((data) => {
        if (!data || !data[0]) {
          throw new Error("Invalid response format");
        }
        wrapper.innerHTML = createCard(data);
        searchInput.value = "";

        // ! audio button bosilganda auido ishga tushishi uchun kerak.
        const audioBtn = document.querySelector(".audioBtn");
        if (audioBtn) {
          const audioElement = audioBtn.querySelector("audio");
          if (audioElement) {
            audioBtn.addEventListener("click", function () {
              audioElement.play();
            });
          }
        }
      })
      .catch((error) => {
        console.error(error);
        errorText.style.display = "block";
      });
  });

// !: || https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp || Shu saytdan topdim button orniga enter ishlatishni va boshqa sayt videolardan ham biriktirdim.

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    if (button) {
      button.click();
    } else {
      console.error("Button not found");
    }
  }
});
