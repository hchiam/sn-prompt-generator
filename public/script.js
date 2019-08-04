// trying to understand this code?
// I recommend starting at "const prompts" and recognition.onresult

// NOTE: This diverges from https://codepen.io/hchiam/pen/XOPdgP

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
if (!isChrome) {
  $('#use-chrome').text('For best results, open this page in Chrome.');
  $('#use-chrome').css({color:'lightgrey', background:'blue'});
}

// -----------------

const prompts = [
  'To continue, say something like "please read Mark 12 30 to 31".',
  `To continue, say something like "let's turn to Matthew 6 verse 33".`,
  'To continue, say something like "first Corinthians chapter 13".'
];
let randomPromptIndex = Math.floor(Math.random()*prompts.length);
let prompt = prompts[randomPromptIndex];
$('#instruction').text(prompt);
$('#list-of-previous').hide();

// ------------------------------

window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

if ('SpeechRecognition' in window) {
  $('#output').text('Speech recognition support detected.');
  $('#remind-user-about-listening').text('🔴');
  $('#remind-user-about-listening').on('click', function() {
    alert('Web Speech Recognition API is on Continuous Mode');
  });
} else {
  $('#output').text('Speech recognition support not detected.');
  $('#remind-user-about-listening').text('');
  $('#remind-user-about-listening').on('click', function() {
    // do nothing
  });
}

let recognition;
setUpSpeechRecognition();
let timer = setInterval(setUpSpeechRecognition, 9000);
let previousVerses = [];

function setUpSpeechRecognition() {
  recognition = new window.SpeechRecognition();

  recognition.continuous = true;

  recognition.onresult = (event) => {
    // when speech recognition happens, do the following:
    let transcript = event.results[event.results.length-1][0].transcript;
    let isVerse = containsBookName(transcript);
    if (isVerse) transcript = cleanup(transcript);
    
    if (isVerse) {
      
      $('#instruction').text('I heard this verse: ');
      $('#instruction').css('color', 'grey');
      
      $('#output').text(transcript);
      showVerseWords(transcript);
      $('#output').css('color', 'white');
      $('#output').css('background', 'darkgreen');
      $('#output').css('padding', '5px');
      $('#output').css('font-size', '50px');
      
      showLastFewPreviousVerses(transcript);
      
    } else if (previousVerses.length == 0) {
      
      prompt = prompts[Math.floor(Math.random()*prompts.length)];
      $('#instruction').text(prompt);
      
      $('#output').text('I heard this: ' + transcript);
      
    } else {
      
      $('#instruction').text('');
      $('#instruction').css('color', 'grey');
      
      prompt = prompts[Math.floor(Math.random()*prompts.length)];
      $('#output').text(prompt)
      $('#output').css('color', 'grey');
      $('#output').css('background', 'rgb(32,32,32)');
      $('#output').css('padding', 'initial');
      $('#output').css('font-size', 'initial');
      
    }
  }

  recognition.start();
}

// -------------------------------------

const bookNames = [ // Note: Put 1 john before john. For easier processing later: some unpluralized, some reordered, and some alternates.
  // OT: 39
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 
  'Joshua', 'Judges', 'Ruth', '1st Samuel', '2nd Samuel', 
  '1st Kings', '2nd Kings', '1st Chronicles', '2nd Chronicles', 'Ezra', 
  'Nehemiah', 'Esther', 'Job', 'Psalms', 'Psalm', 'Proverbs', 'Proverb', 
  'Ecclesiastes', 'Song of Songs', 'Song of Solomon', 'Songs of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations', 'Lamentation', 
  'Ezechiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 
  'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 
  'Zephaniah', 'Haggai', 'Zechariah', 'Malachi', 
  // NT: 27
  'Matthew', 'Mark', 'Luke', '1st John', '2nd John', 
  '3rd John', 'John', 'Acts', 'Romans', '1st Corinthians', 
  '2nd Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', 
  '1st Thessalonians', '2nd Thessalonians', '1st Timothy', '2nd Timothy', 'Titus', 
  'Philemon', 'Hebrews', 'James', '1st Peter', '2nd Peter', 
  'Jude', 'Revelation', 'Revelations',
  'Chapter', 'chapter' // I know, I know, 'chapter' isn't a book, but including it enables listening to fragments (e.g. repeating just the chapter)
];

function containsBookName(transcript) {
  return bookNames.find(book => transcript.includes(book));
}

function whichBookNameIsContained(transcript) {
  return bookNames.find(book => (transcript.includes(book)) ? book : false);
}

function cleanup(transcript) {
  let transcriptStartingAtBookName = transcript.slice(
    transcript.indexOf(containsBookName(transcript))
  );
  
  transcriptStartingAtBookName = transcriptStartingAtBookName
    .replace(/ (c|C)hapters?/g, ' ')
    .replace(/ vers(e|u)s? /g, ':') // may mishear 'verses' as 'versus'
    .replace(/ vs /g, ':') // may mishear as 'vs'
    .replace(/(\d+) to (\d+)/g, '$1-$2') // replace 'to' with '-'
    .replace(/ and /g, ',')
    .replace(/(\d+) (\d+)/g, '$1,$2')
  ;
  
  return removeNonVerseWordsAfterBookName(transcriptStartingAtBookName);
}

function removeNonVerseWordsAfterBookName(transcript) {
  // example: Matthew is a book -> Matthew
  let bookName = whichBookNameIsContained(transcript);
  let supposedToBeVersePartOnly = transcript.substring(bookName.length + 1);
  supposedToBeVersePartOnly = supposedToBeVersePartOnly.replace(/[^0-9,.;:-]/g, '');
  return bookName + ' ' + supposedToBeVersePartOnly;
}

// -------------------------

function showLastFewPreviousVerses(lastVerse) {
  if (lastVerse == previousVerses[previousVerses.length-1]) {
    return; // ignore if just repeating
  }
  previousVerses.push(lastVerse);
  let lastFewVerses = previousVerses.slice(Math.max(0, previousVerses.length-5));
  $('#list-of-previous').empty();
  for (let verse of lastFewVerses) {
    $('#list-of-previous').prepend('<p>' + verse + '</p>');
  }
  $('#list-of-previous').prepend('<h4>Last heard:</h4>');
  $('#list-of-previous').show();
}

// -------------------------

let numberOfApiCalls = 0;
function showVerseWords(searchText, offset = 0) {
  let urlAPICall = `https://bibleverse.glitch.me/get-verse/${searchText}`;
  $.getJSON(urlAPICall, function(data) {
    let copyright = data.copyright;
    let content = data.content;
    let htmlContent = $('<div></div>');
    htmlContent.html(content);
    $('#verse-words').html(htmlContent);
    if (copyright) {
      $('#copyright').html('(' + copyright + ')');
    }
    numberOfApiCalls++;
    if (numberOfApiCalls > 100) {
      $('#verse-words').prop('title', 'Note that the free API has a daily limit of 5000 calls.');
      $('#many-api-calls').text('(Note: the free Bible verse API has a daily limit of 5000 calls.)');
    }
  });
}

// -------------------------

window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

var isMobile = window.mobilecheck();
if (isMobile) {
  $('#use-laptop').text('Wait for the beep. For best results, use this on a computer running a Chrome browser.');
  $('#use-laptop').css({color:'lightgrey', background:'darkgreen'});
}

// ----------------------
