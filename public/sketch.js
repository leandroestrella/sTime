/*
  "Time is the intuition of ourselves and our inner space"
    - John Cage
  "sTIME || Time Subjectivizer"
    by Leandro Estrella  [leandroestrella.com]
    assisted by Fernando Cordón [github.com/fernanCordon]
*/

// time string variables
var timeType, subjectiveTime, randomTime, instructions;

// time counters
var millisCounter, millisPressed, secondsCounter, minutesCounter, hoursCounter;

// color and alpha variables
var timeColor, instructionsColor, randomAlpha;

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
  instructions = "press for 10'' to make your time";
  /* color setup*/
  timeColor = 255;
  instructionsColor = 107;
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
  createCanvas(windowWidth, windowHeight);
  // API wip
  loadJSON('/get', gotStime);
}

function gotStime(stime) {
  console.log(stime);
  var values = Object.values(stime);
  //console.log(values);
}

function draw() {
  background(0);
  if (int(20 * subjectiveSeconds) > 0) {
    if (frameCount % int(20 * subjectiveSeconds) === 0) {
      // every 20 frames add a second & relates it to subjective seconds
      secondsCounter++;
    }
    if (
      frameCount % int(20 * subjectiveSeconds) === 0 &&
      secondsCounter % 60 === 0
    ) {
      // every 60 seconds add a minute
      minutesCounter++;
    }
    if (
      frameCount % int(20 * subjectiveSeconds) === 0 &&
      minutesCounter % 60 === 0
    ) {
      // every 60 minutes add an hour
      hoursCounter++;
    }
  }
  textSize(fontSize / 4.25);
  /* time type */
  fill(instructionsColor);
  text(timeType, width / 2, height / 2 - fontSize);
  fill(7.5);
  // subjective difference
  text(subjectiveSeconds, width / 2, height / 2 + fontSize * 1.5);
  /* instructions */
  fill(instructionsColor);
  text(instructions.toUpperCase(), width / 2, height / 2 + fontSize);
  /* subjective time */
  textSize(fontSize);
  fill(timeColor);
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

function mousePressed() {
  /* text and color */
  timeColor = 0;
  randomAlpha = 255;
  instructionsColor = 0;
  /* reset to system time */
  secondsCounter = second();
  minutesCounter = minute();
  hoursCounter = hour();
  /* start millis count */
  millisCounter = millis();
}

function mouseReleased() {
  /* text and color */
  timeColor = 255;
  randomAlpha = 0;
  instructionsColor = 107;
  // compute millis pressed
  millisPressed = millis() - millisCounter;
  if (float(millisPressed) / 10000 <= 0.05) {
    // reset if subjectivized time is too fast
    subjectiveSeconds = 1;
    /* text and color */
    timeType = "aTIME";
    instructions = "press for 10'' to make your time";
    /* reset to system time */
    secondsCounter = second();
    minutesCounter = minute();
    hoursCounter = hour();
    /* log */
    console.log('time reset and set to aTime');
  } else {
    // subjectivize time
    // subjective seconds in relation to 10 seconds
    subjectiveSeconds = float(millisPressed) / 10000;
    console.log('sTime created and set to ' + subjectiveSeconds);
    /* text and color */
    timeType = "sTIME";
    instructions = "tap to reset";
    /* api wip */
    loadJSON('set/' + subjectiveSeconds, finished);
    function finished(data){
      console.log(data);
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
  timeColor = 0;
  instructionsColor = 0;
  randomAlpha = 0;
  subjectiveSeconds = 0;
  fontSize = 0;
}