
const wrapper = document.querySelector(".wrapper");
let searchInput = document.querySelector("input");
let infoText = document.querySelector(".info-text");
let synonyms = document.querySelector(".synonyms .list");
let volumeIcon = document.querySelector(".word i");
let removeIcon = document.querySelector(".search span");
let audio;

// data function
function data(result, word){
    if(result.title) {
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word`;
    } else {
        console.log(result);
        wrapper.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0];
        let definition = result[0].meanings[0];
        let phonetics = `${result[0].meanings[0].partOfSpeech} / ${result[0].phonetics[0].text}/`;
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phonetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        if(definitions.example === undefined) {
            document.querySelector(".example span").parentElement.style.display = 'none';
        } else {
            document.querySelector(".example span").innerText = definitions.example;
        }
        
audio = new Audio(result[0].phonetics[0].audio);

    if(definition.synonyms[0] == undefined) {
        synonyms.parentElement.style.display = 'none';
    }else {
        synonyms.parentElement.style.display = 'block';
        for(let i = 0; i < 5; i++) {
            let tag = `<span onclick=search("${definition.synonyms[i]}")>${definition.synonyms[i]},</span>`;
            synonyms.insertAdjacentHTML("beforeend", tag);
        }
    }
}
}


function search(word) {
    searchInput.value = word;
    fetchApi(word);
    wrapper.classList.remove("active");
}

// fetch API function
function fetchApi(word) {
    wrapper.classList.remove("active");
    infoText.style.color = "#000";
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(res => res.json()).then(result => data(result, word));
}

searchInput.addEventListener("keyup", e => {
    if(e.key === "Enter" && e.target.value) {
        fetchApi(e.target.value);
    }
     
});

volumeIcon.addEventListener("click", () => {
    audio.play();
});

removeIcon.addEventListener("click", () => {
    searchInput.value = '';
    searchInput.focus();
    wrapper.classList.remove("active");
    infoText.style.color = "#9a9a9a";
    infoText.innerHTML = "Type a word and press enter to get meaning, example, pronunciation, and synonyms of typed word.";
});