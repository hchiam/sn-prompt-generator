setYear();

useRandomSNPrompt();

useRandomReminder();

useRandomLabels();

setTimeout(function () {
  document.getElementById("print-page").innerText = "→ Print";
}, 2000);

setTimeout(function () {
  let element = document.getElementById("choose-prompt");
  element.className = element.className.replace(/temporarily-yellow/g, "");
}, 1000);

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
  let prompts = getPrompts();
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
  promptSpan.style.background = "yellow";
  promptSpan.style.padding = "10px";
  setTimeout(function () {
    promptSpan.style.background = "white";
    promptSpan.style.padding = "0";
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

function getReminders() {
  let reminders = [
    'Remember to try to not draw unrelated things. This sheet is to help you see the bigger picture and "Soar like an eagle" on Sabbath.',
    "Please don't draw unrelated things somewhere else. Open your mind to notice something you didn't think of before.",
    "Please remember to focus during the sermon. If you don't focus, you might think they're saying something they're actually not. (The bigger picture builds on the parts.)",
    "Please focus, and don't draw unrelated things or chat. Remember: God is watching!",
  ];
  return reminders;
}
