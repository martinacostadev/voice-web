const content = document.querySelector(".content");
const btnTalk = document.querySelector(".talk");
const linkTwitter = document.querySelector(".twitter");
const linkWeather = document.querySelector(".weather");
const nombre = document.querySelector(".name");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'es-ES';

recognition.onstart = function () {
  content.innerHTML = `<div class="container-red-dot">
      <div class="red-dot"></div>
    </div>
    <div class="text">Te escucho...</div>`;
};

recognition.onresult = function (event) {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  content.textContent = transcript;

  if (transcript.includes("cómo estás")) {
    readOutLoud("Yo estoy bien, gracias. Usted?");
    return;
  }

  if (transcript.includes("estoy bien")) {
    readOutLoud("Me alegro mucho.");
    return;
  }

  readOutLoud(transcript);
};

btnTalk.addEventListener("click", () => {
  recognition.start();
});

function readOutLoud(message) {
  const speech = new SpeechSynthesisUtterance();

  console.log(message);

  if(message.includes("ocultar créditos")) {
    nombre.hidden = true;
  }

  if(message.includes("Mostrar créditos")) {
    nombre.hidden = false;
  }

  if (message.includes("Abrir Twitter")) {
    linkTwitter.click();
  }

  if (message.includes("clima")) {
    const link = `https://www.google.com/search?q=${message}`;
    linkWeather.href = link;
    linkWeather.click();
  }

  if (message.includes("Háblame mucho")) {
    readOutLoud("Bueno, te voy a conceder el deseo");
    readOutLoud("Te voy a contar sobre mí");
    readOutLoud("Soy un bot de Chrome");
  }

  speech.text = message;
  speech.volume = 1; // de 0 a 1
  speech.rate = 1; // 0: lento, 1: normal, 2: rapido
  speech.pitch = 1; // tono de voz: agudo o grave

  window.speechSynthesis.speak(speech);
}
