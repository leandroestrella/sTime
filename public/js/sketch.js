/*
  'time is the intuition of ourselves and our inner space'
    - john cage

  'sTIME' a time subjectivizer app
    by leandro estrella  [leandroestrella.com]
    assisted by fernando cordón [github.com/fernanCordon]
*/

// time string variables
var timeType, subjectiveTime, randomTime, instructions;

// time counters
var millisCounter, millisPressed, secondsCounter, minutesCounter, hoursCounter;

// color and alpha variables
var mainColor, secondaryColor, randomAlpha, uiActive;

// subjective seconds and font size
var subjectiveSeconds, fontSize;

function preload() {
  font = loadFont("assets/OpenSans-Bold.ttf");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  initializeFields();
  /* string values */
  // artificial time
  timeType = "aTIME";
  instructions = "press for ten seconds to create your time";
  /* color setup*/
  mainColor = 255;
  secondaryColor = 107;
  randomAlpha = 0;
  /* font setup */
  fontSize = width;
  textFont(font, fontSize);
  textAlign(CENTER, CENTER);
  /* time setup */
  frameRate(20);
  // subjective second reference
  subjectiveSeconds = 1;
  secondsCounter = second();
  minutesCounter = minute();
  hoursCounter = hour();
  /* canvas setup */
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("content");
  /* input listener */
  canvas.mousePressed(startStimeCreation);
  canvas.mouseReleased(finishStimeCreation);
  canvas.touchStarted(startStimeCreation);
  canvas.touchEnded(finishStimeCreation);
}

function draw() {
  background(0);
  if (int(20 * subjectiveSeconds) > 0) {
    if (
      frameCount % int(20 * subjectiveSeconds) ===
      0 /* && secondsCounter > 0 */
    ) {
      // every 20 frames add a second & relates it to subjective seconds
      secondsCounter++;
    }
    if (
      frameCount % int(20 * subjectiveSeconds) === 0 &&
      secondsCounter % 60 === 0 &&
      secondsCounter > 0
    ) {
      // every 60 seconds add a minute
      minutesCounter++;
    }
    if (
      frameCount % int(20 * subjectiveSeconds) === 0 &&
      minutesCounter % 60 === 0 &&
      minutesCounter > 0
    ) {
      // every 60 minutes add an hour
      hoursCounter++;
    }
  }
  /* calculate sizes based on screen depth */
  let tSize, iSize, yPos;
  if (window.devicePixelRatio > 1) {
    tSize = (fontSize * 1.5) / window.devicePixelRatio;
    iSize = (fontSize * 0.225) / window.devicePixelRatio;
    yPos = (height * 0.045 * 3) / window.devicePixelRatio;
  } else {
    tSize = fontSize / window.devicePixelRatio;
    iSize = fontSize * 0.225;
    yPos = (height * 0.05) / window.devicePixelRatio;
  }
  /* time type (title) */
  textSize(iSize * window.devicePixelRatio);
  fill(secondaryColor);
  text(timeType, width / 2, yPos);
  /* instructions */
  textSize(iSize);
  fill(secondaryColor);
  text(instructions, width / 2, height - yPos);
  /* subjective time */
  textSize(tSize);
  fill(mainColor);
  subjectiveTime =
    nf(hoursCounter % 60, 2) +
    "." +
    nf(minutesCounter % 60, 2) +
    "." +
    nf(secondsCounter % 60, 2);
  text(subjectiveTime, width / 2, height / 2 - 5);
  /* random time */
  fill(255, randomAlpha);
  randomTime =
    nf(int(random(0, 59)), 2) +
    "." +
    nf(int(random(0, 59)), 2) +
    "." +
    nf(int(random(0, 59)), 2);
  text(randomTime, width / 2, height / 2 - 5);
}

function startStimeCreation() {
  /* text and color */
  mainColor = 0;
  randomAlpha = 255;
  secondaryColor = 0;
  uiActive = 1;
  toggleUI();
  /* reset to system time */
  secondsCounter = second();
  minutesCounter = minute();
  hoursCounter = hour();
  /* start millis count */
  millisCounter = millis();
}

function finishStimeCreation() {
  /* text and color */
  mainColor = 255;
  randomAlpha = 0;
  secondaryColor = 107;
  uiActive = 0;
  toggleUI();
  // compute millis pressed
  millisPressed = millis() - millisCounter;
  if (float(millisPressed) / 10000 <= 0.05) {
    // reset if subjectivized time is too fast
    subjectiveSeconds = 1;
    /* text and color */
    timeType = "aTIME";
    instructions = "press for ten seconds to create your time";
    /* reset to system time */
    secondsCounter = second();
    minutesCounter = minute();
    hoursCounter = hour();
    /* log */
    console.log("sTIME destroyed");
  } else {
    /* subjectivize time */
    // subjective seconds in relation to 10 seconds
    subjectiveSeconds = float(millisPressed) / 10000;
    console.log("sTIME created: " + subjectiveSeconds);
    /* text and color */
    timeType = "sTIME";
    instructions = "press for ten seconds to (re)create your time";
  }
  /* update sTIME in db */
  setStime();
}

function toggleUI() {
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    if (links[i].href) {
      if (uiActive) {
        links[i].style.color = "black";
      } else {
        links[i].style.color = "white";
      }
    }
  }
}

function initializeFields() {
  timeType = null;
  subjectiveTime = null;
  randomTime = null;
  instructions = null;
  millisCounter = 0;
  millisPressed = 0;
  secondsCounter = 0;
  minutesCounter = 0;
  hoursCounter = 0;
  mainColor = 0;
  secondaryColor = 0;
  randomAlpha = 0;
  subjectiveSeconds = 0;
  fontSize = 0;
  uiActive = 1;
}
