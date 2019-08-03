setYear();

useRandomSNPrompt();

useRandomReminder();

setTimeout(function() {
  document.getElementById('print-page').innerHTML = '→ Print';
}, 5000);

function printPage() {
  // override settings, just in case
  let promptSpan = document.getElementById('prompt');
  promptSpan.style.background = 'white !important';
  promptSpan.style.padding = '0 !important';
  // actually open print dialog window
  window.print();
}

function setYear() {
  let year = new Date().getFullYear();
  let yearNote = document.getElementById('year');
  yearNote.innerHTML = year;
}

function useRandomSNPrompt() {
  let prompts = getPrompts();
  let prompt = pickRandomMessage(prompts);
  createPrompt(prompt);
  highlightPrompt();
}

function useRandomReminder() {
  let reminders = getReminders();
  let reminder = pickRandomMessage(reminders);
  createReminder(reminder);
}

function pickRandomMessage(messages) {
  if (!Array.isArray(messages)) {
    throw 'messages input must be an array';
  }
  let min = 0;
  let max = messages.length-1;
  let choice = getRandomNumber(min,max);
  return messages[choice];
}

function pickRandomReminder(messages) {
  if (!Array.isArray(messages)) {
    throw 'messages input must be an array';
  }
  let min = 0;
  let max = messages.length-1;
  let choice = getRandomNumber(min,max);
  return messages[choice];
}

function getRandomNumber(min,max) {
  return min + Math.floor(Math.random() * max);
}

function createPrompt(message) {
  let promptSpan = document.getElementById('prompt');
  promptSpan.innerHTML = message;
}

function createReminder(message) {
  let remindertSpan = document.getElementById('reminder');
  remindertSpan.innerHTML = message;
}

function highlightPrompt() {
  let promptSpan = document.getElementById('prompt');
  promptSpan.style.background = 'yellow';
  promptSpan.style.padding = '10px';
  setTimeout(function() {
    promptSpan.style.background = 'white';
    promptSpan.style.padding = '0';
  }, 500);
}

function getPrompts() {
  let prompts = [
    "Can you capture the meaning of a verse from this sermon in about 4 words?",
    "How does one of the hymns we sang relate to the sermon?",
    "Draw the sermon speaker with speech bubbles for each main point.",
    "Put yourself in the shoes of the character/situation if it should happen. What would you do? Would your reaction change after this sermon?",
    "If you had to explain this to someone who did the opposite of what was told, how would you tell them? How would you phrase it?",
    "Write a memory from this month that relates to something in the sermon.",
    "Pretend that you're explaining this sermon to an alien.",
    "Draw the key takeaway.",
    "Figure out what is one of the important messages. Make a comic out of it.",
    "Write your notes in a different style/font.",
    "Write your notes with your other hand.",
    "Draw at least one of the verses in this sermon.",
    "Draw at least two of the verses from this sermon.",
    "Write your notes backwards.",
    "Write your notes upside down.",
    "Write a life application of something you heard in this sermon. (A life application means how you could act it out or use a teaching in the sermon. This is NOT the same thing as what a person in a story did.)",
    "Write a memory verse that's related to this sermon.",
    "Write questions you have about this sermon.",
    "Turn each main point into a question.",
    "Turn your notes into a quiz (multiple choice?).",
    "Write your notes in boxes. (Bento box notes?)",
    "Write your notes in boxes. (Cards?)",
    "Write your notes as if you're writing a letter to someone.",
    "Write your notes in French/Chinese/Spanish/etc.",
    "Draw your notes only in pictures, no words allowed. (good practice for thinking about meaning instead of words!).",
    "Turn your notes into a tree diagram (branches for points and details).",
    "Add pictures underneath words you think are key words (key words capture main ideas).",
    "Add some style to key words in the sermon (key words capture main ideas).",
    "Draw a picture that captures the meaning of the sermon title.",
    "Turn the verses into something you think in your life that relates (picture).",
    "Turn the topic into a relating Bible verse or hymn.",
    "For words you don't know, make a word list.",
    "Use a different font to write what you think are the main points.",
    "Use a different font to write each word differently.",
    "\"Translate\" big words into simpler words.",
    "Write in a different direction.",
    "Write all in UPPERCASE.",
    "Turn the words from the sermon topic into a sentence or two summarizing the entire sermon.",
    "Write out how a verse somehow points to Jesus or His character(istics).",
    "Transform important ideas in this sermon into pictures.",
    "Capture as much info from this sermon in as few words as possible.",
    "Pretend you're trying to convince/persuade someone about something in this sermon.",
    "Write down how you might apply one of the teachings in your life.",
    "Write your notes while taking a different perspective (point of view).",
    "Pretend you need to use info from this sermon in an emergency. How might you prepare?",
    "Be the \"buddy\" of the translator and write down tricky words. And maybe words you didn't know too.",
    "Write down the key words in English and Chinese (or how the chinese sounds like, like pinyin).",
  ];
  return prompts;
}

function getReminders() {
  let reminders = [
    '"Soar like an eagle" on Sabbath',
    '"Soar like an eagle" on Sabbath',
    '"Soar like an eagle" on Sabbath',
    '"Soar like an eagle" on Sabbath',
    '"Soar like an eagle" on Sabbath',
    '"Soar like an eagle" on Sabbath',
    "Remember to try to not draw unrelated things. This sheet is to help you see the bigger picture.",
    "Try not to draw unrelated things. This sheet is to help you dig for the hidden gold in the sermon.",
    "Please try to focus. Use the time and this sheet to make the most of the sermon.",
    "Remember to focus on the sermon. You never know when you'll learn something new.",
    "Remember to focus on learning something new. You never know what you might miss you don't see the bigger picture.",
    "Please don't draw unrelated things. Focus on the bigger picture of what you could use from the sermon.",
  ];
  return reminders;
}
