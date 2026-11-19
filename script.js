let lastSpokenText = "";

// 1. Text-to-Speech Assistant Function
function speakText(text, lang = 'hi-IN') {
  lastSpokenText = text;
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Stop any active speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9; // Slightly slower for clear rural understanding
    window.speechSynthesis.speak(utterance);
  }
}

function replayAudio() {
  if (lastSpokenText) speakText(lastSpokenText);
}

// 2. Camera Trigger & Simulated Image Recognition
function triggerCamera() {
  document.getElementById('cameraInput').click();
}

function handleImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const statusBadge = document.getElementById('statusBadge');
  const resultTitle = document.getElementById('resultTitle');
  const resultText = document.getElementById('resultText');
  const audioControl = document.getElementById('audioControl');

  statusBadge.className = "status-indicator green";
  statusBadge.innerText = "Scan Complete";
  resultTitle.innerText = "🔍 Image Analysis Output";
  
  // Simulated output logic for exhibition demonstration
  const simulatedAdvice = "पानी का सैंपल सुरक्षित है। pH स्तर 7.2 है। फसल के पत्तों के लिए नीम के तेल का छिड़काव करें।";
  
  resultText.innerHTML = `
    <b>Water Quality:</b> Safe (pH 7.2)<br>
    <b>Crop Advisory:</b> Healthy leaf detected. Use organic Neem oil spray for preventive pest protection.
  `;
  
  audioControl.style.display = "block";
  speakText(simulatedAdvice);
}

// 3. Voice Recognition Assistant
function startVoice() {
  const statusBadge = document.getElementById('statusBadge');
  const resultTitle = document.getElementById('resultTitle');
  const resultText = document.getElementById('resultText');
  const audioControl = document.getElementById('audioControl');

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice recognition works best on Chrome browser.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'hi-IN'; // Hindi voice input

  statusBadge.className = "status-indicator blue";
  statusBadge.innerText = "Listening...";
  resultTitle.innerText = "🎙️ Listening to your voice...";
  resultText.innerText = "Please speak your question in Hindi...";

  recognition.start();

  recognition.onresult = (event) => {
    const userQuery = event.results[0][0].transcript;
    resultTitle.innerText = `You asked: "${userQuery}"`;
    
    // Sample automated intelligent response
    const adviceText = "आज आपके गाँव में मौसम साफ़ रहेगा। गेहूँ की फ़सल के लिए सिंचाई का सही समय है।";
    
    resultText.innerHTML = `<b>Answer:</b> ${adviceText}`;
    statusBadge.className = "status-indicator green";
    statusBadge.innerText = "Completed";
    
    audioControl.style.display = "block";
    speakText(adviceText);
  };

  recognition.onerror = () => {
    statusBadge.className = "status-indicator red";
    statusBadge.innerText = "Error";
    resultTitle.innerText = "Could not hear properly";
    resultText.innerText = "Tap the Speak button and try again.";
  };
}

// 4. GPS & Village Dashboard
function getVillageUpdates() {
  const statusBadge = document.getElementById('statusBadge');
  const resultTitle = document.getElementById('resultTitle');
  const resultText = document.getElementById('resultText');
  const audioControl = document.getElementById('audioControl');

  statusBadge.className = "status-indicator green";
  statusBadge.innerText = "Live Location Active";
  resultTitle.innerText = "📍 Village Health & Weather Radar";
  
  const villageAdvice = "आपके गाँव में आज बारिश की संभावना 20 प्रतिशत है। पास के नलकूप का पानी पीने योग्य है।";
  
  resultText.innerHTML = `
    <b>Local Weather:</b> 28°C, Partly Cloudy<br>
    <b>Groundwater Status:</b> Safe Zone (Low Fluoride)<br>
    <b>Market Update:</b> Wheat Mandi Rate ₹2,275 / Quintal
  `;

  audioControl.style.display = "block";
  speakText(villageAdvice);
}