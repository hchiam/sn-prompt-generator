if (navigator.serviceWorker) {
  navigator.serviceWorker.register("service-worker.js", { scope: "" });
}

setYear();

useRandomSNPrompt();

useRandomReminder();

useRandomLabels();

setListeners();

document.documentElement.scrollTop = 0;

setTimeout(function () {
  document.getElementById("print-page").innerText = "→ Print";
  alert("Now works offline! :)\n\n(To get updates, connect to the internet.)");
}, 2000);

setTimeout(function () {
  let element = document.getElementById("choose-prompt");
  element.className = element.className.replace(/temporarily-highlight/g, "");
  document.documentElement.scrollTop = 0;
}, 1000);

function setListeners() {
  document.getElementById("print-page").addEventListener("click", function () {
    printPage();
  });
  document
    .getElementById("random-prompt")
    .addEventListener("click", function () {
      useRandomSNPrompt();
      useRandomReminder();
      useRandomLabels();
    });
  document
    .getElementById("choose-prompt")
    .addEventListener("click", function () {
      choosePrompt();
      useRandomReminder();
      useRandomLabels();
    });
  document
    .getElementById("close-prompt-modal")
    .addEventListener("click", function () {
      closeModal();
    });
  document
    .getElementById("close-prompt-options")
    .addEventListener("click", function () {
      closeModal();
    });
}

function printPage() {
  // override settings, just in case
  let promptSpan = document.getElementById("prompt");
  promptSpan.style.background = "white !important";
  promptSpan.style.padding = "0 !important";
  // set default file name
  document.title = "sn-prompt-generator_" + new Date().getTime() + ".pdf";
  // actually open print dialog window
  window.print();
}

function setYear() {
  let year = new Date().getFullYear();
  let yearNote = document.getElementById("year");
  yearNote.innerText = year;
}

function choosePrompt() {
  let response = prompt(
    "The Purpose of These SNs: \n\nHelp children see and look for the good in every sermon, \nand equip them with healthier coping methods. \n\nOpen their minds to the idea that they can find a way that's \nboth ___ ___ ___.\n ",
    "what and what"
  );
  if (checkSequence(response)) {
    document.getElementById("modal").style.display = "block";
    showPromptOptions();
  } else {
    alert(
      "To make sure we're on the same page, \n\nplease check the notes about the purpose of these Sermon Note sheets.\n "
    );
  }
}

function checkSequence(input) {
  const sequence = [
    85 - 2,
    85 - 5,
    75 - 2,
    80 + 2,
    75 - 2,
    85 - 1,
    85,
    60 + 5,
    75 + 1,
    30 + 2,
    65,
    75 + 3,
    65 + 3,
    35 - 3,
    75 - 5,
    85,
    75 + 3,
  ];
  for (let i = 0; i < input.length; i++) {
    if (input[i].toUpperCase() !== String.fromCharCode(sequence[i])) {
      return false;
    }
  }
  return true;
}

function showPromptOptions() {
  let prompts = getPromptsWithOldOnesToo();
  document.getElementById("modal-title").innerText =
    prompts.length + " Prompts:";
  removeAllChildren("promptOptions");
  for (let i = 0; i < prompts.length; i++) {
    let prompt = prompts[i];
    let btn = createPromptOptionButton(prompt);
    let li = document.createElement("LI");
    li.appendChild(btn);
    document.getElementById("promptOptions").appendChild(li);
  }
}

function removeAllChildren(elementId) {
  const myNode = document.getElementById(elementId);
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}

function createPromptOptionButton(text) {
  let btn = document.createElement("BUTTON");
  btn.innerText = text;
  btn.onclick = function () {
    document.getElementById("prompt").innerText = text;
    closeModal();
    highlightPrompt();
  };
  return btn;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
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

function useRandomLabels() {
  let sermonTopicLabels = ["Sermon topic", "Topic"];
  let myNameLabels = ["My name", "Notekeeper name"];
  document.getElementById("sermon-topic").innerText = pickRandomMessage(
    sermonTopicLabels
  );
  document.getElementById("my-name").innerText = pickRandomMessage(
    myNameLabels
  );
}

function pickRandomMessage(messages) {
  if (!Array.isArray(messages)) {
    throw "messages input must be an array";
  }
  let min = 0;
  let max = messages.length;
  let choice = getRandomNumber(min, max);
  return messages[choice];
}

function getRandomNumber(min, max) {
  return min + Math.floor(Math.random() * max);
}

function createPrompt(message) {
  let promptSpan = document.getElementById("prompt");
  promptSpan.innerText = message;
}

function createReminder(message) {
  let remindertSpan = document.getElementById("reminder");
  remindertSpan.innerText = message;
}

function highlightPrompt() {
  let promptSpan = document.getElementById("prompt");
  promptSpan.style.background = "#2f5cd6";
  promptSpan.style.color = "snow";
  promptSpan.style.padding = "10px";
  promptSpan.style.lineHeight = "2rem";
  setTimeout(function () {
    promptSpan.style.background = "white";
    promptSpan.style.color = "black";
    promptSpan.style.padding = "0";
    promptSpan.style.lineHeight = "1rem";
  }, 500);
}

function getPrompts() {
  let prompts = [
    "Write each Bible passage location. Next to them, try to summarize each passage (NOT each verse) in very few words. You can write in note-taking style sentences.",
    "Write down the hymn numbers and each main point. How does each of the hymns relate to different parts of the whole sermon?",
    "Write down each main point in the sermon. How does each main point relate to the other main points?",
    "Write each main point of the story. If there's no story, imagine situations that the main points could be used in. What should you do? What habits will help you be ready?",
    "Write down each main point. Look at each one, and think of how this could encourage someone in their life of faith.",
    "Write each main point. Connect each one with a memory from your life that relates to at least one of the main points in this sermon.",
    "Write each main point. Try to draw each one. If it feels hard, keep thinking of a creative way to think about it until you find a way to draw it.",
    "Write down each main point as a question (instead of an ordinary sentence) so you can test someone on the answers. What are the main points?",
    "Write each main point. Underline key words. Add pictures under the key words. (Key words capture main ideas in few words so you can remember them easier, and do them).",
    "Write down each main point or teaching, and add way(s) that you can apply/practice EACH of the teachings in your life.",
    "Write each main point, but also note down a different perspective (point of view) about each main point.",
    "(ADVANCED:) Write down each main point. About 3/4 into the sermon, try to decide which one is a key take-away for you. Draw the key takeaway (as an idea/concept summary? or you trying to practice it?).",
    "(ADVANCED:) Write each main point. Then capture as much info from this sermon in as few words as possible, in one sentence.",
    "(ADVANCED:) Write each main point, but add how you might use it in an emergency. Like if you have little time to think on the spot, how might you prepare beforehand?",
    "(ADVANCED:) Write down each main point, then make a song out of the sermon's main points.",
    "(ADVANCED:) Write each main point. Wait for about 3/4 of the sermon to figure out the most important (non-obvious) message. Make a comic out of it (while still listening!).",
  ];
  return prompts;
}

function getPromptsWithOldOnesToo() {
  let oldPrompts = [
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
    '"Translate" big words into simpler words.',
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
    'Be the "buddy" of the translator and write down tricky words. And maybe words you didn\'t know too.',
    "Write down the key words in English and Chinese (or how the chinese sounds like, like pinyin).",
    "Try to not draw any pictures. Only use words from the sermon. (Be creative.)",
    "Re-imagine one of the teachings as a mission-critical situation (life/death split-second decision). How might you prepare? Make double-sure you understand the mission correctly.",
    "Draw a diagram of the main character if there is one, or the main lesson and life application to you.",
    "Write about how the hymns apply to the sermon.",
    "Count how many times they said a word in the title. Or a word that means something similar. (Practice active listening.)",
    "Draw a table or Venn diagram of the different characters (or characteristics).",
    "Draw your notes in pictures.",
    "Make a song out of the sermon.",
    "Draw the main message in your life.",
    "Write your notes in question form.",
    "Take notes on the different perspectives of different characters in the sermon.",
    "Take notes on the feelings (of the different characters/people).",
    "Draw lines to show connections between different notes and ideas.",
    "Draw a picture that relates to the sermon and write stuff in the gaps of the picture.",
    "Draw a whole picture related to the sermon.",
    "Write all the verse locations.",
    "Take notes with a pen that can't be erased. (Choose your pen strokes wisely!)",
    'Track the number of times the speaker says "Jesus", "God", or "love".',
    "Draw out the connection between the hymn and the main message. (Hint: is the main message always the same as the topic?)",
    "Make the entire sermon a big landscape picture.",
  ];
  return [...oldPrompts, ...getPrompts()];
}

function getReminders() {
  let reminders = [
    'Remember to try to not draw unrelated things. This sheet is to help you see the bigger picture and "Soar like an eagle" on Sabbath.',
    "Please don't draw unrelated things somewhere else. Open your mind to notice something you didn't think of before.",
    "Please remember to focus during the sermon. If you don't focus, you might think they're saying something they're actually not. (The bigger picture builds on the parts.)",
    "Please focus, and don't draw unrelated things or chat. Remember: God is watching!",
  ];
  return reminders;
}
