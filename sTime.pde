/**************************************************************
 * "Time is the intuition of ourselves and our inner space"   *
 *                                                  John Cage *
 * "sTIME || Time Subjectivizer"                              *
 * by Leandro Estrella  [cargocollective.com/leandroestrella] *
 * assisted by Fernando Cordón [github.com/fernanCordon]      *
 **************************************************************/

String timeType, subjectiveTime, randomTime, instructions;  // time string variables
int millisCounter, millisPressed, secondsCounter, minutesCounter, hoursCounter;  // time counters
int timeColor, instructionsColor, randomAlpha;  // color and alpha variables
float subjectiveSeconds, fontSize;  // subjective seconds and font size

void settings() {
  fullScreen();
}

void setup() {
  /* string values */
  timeType = "aTIME";  // artificial time
  instructions = "press for 10'' to make your time";
  /* color setup*/
  timeColor = 255;
  instructionsColor = 107;
  randomAlpha = 0;
  /* font setup */
  fontSize = width/5.5;
  textFont(createFont("FuturaBold.otf", fontSize));
  textAlign( CENTER, CENTER );
  /* time setup */
  frameRate( 20 );
  subjectiveSeconds = 1;  // subjective second reference
  secondsCounter = second();
  minutesCounter = minute();
  hoursCounter = hour();
}

void draw() {
  background( 0 );
  if ( int( 20 * subjectiveSeconds ) > 0 ) {
    if ( frameCount % int( 20 * subjectiveSeconds ) == 0 ) {
      secondsCounter++;  // every 20 frames add a second & relates it to subjective seconds
    }
    if ( frameCount % int( 20 * subjectiveSeconds ) == 0 && secondsCounter % 60 == 0 ) {
      minutesCounter++;  // every 60 seconds add a minute
    }
    if ( frameCount % int( 20 * subjectiveSeconds ) == 0 && minutesCounter % 60 == 0 ) {
      hoursCounter++;  // every 60 minutes add an hour
    }
  }
  textSize( fontSize/4.25 );
  /* time type */
  fill( instructionsColor );
  text( timeType, width/2, height/2 - fontSize );
  fill( 7.5 );
  text( subjectiveSeconds, width/2, height/2 + fontSize*1.5 );  // subjective difference
  /* instructions */
  fill ( instructionsColor );
  text( instructions.toUpperCase(), width/2, height/2 + fontSize );
  /* subjective time */
  textSize( fontSize );
  fill( timeColor );
  subjectiveTime = nf( hoursCounter % 60, 2 ) + "." + nf( minutesCounter % 60, 2 ) + "." + nf( secondsCounter % 60, 2 );
  text( subjectiveTime, width/2, height/2 - 5 );
  /* random time */
  fill( 255, randomAlpha );
  randomTime = nf( int(random(0, 59)), 2 ) + "." + nf( int(random(0, 59)), 2 ) + "." + nf( int(random(0, 59)), 2 );
  text( randomTime, width/2, height/2 - 5 );
}

void mousePressed() {
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

void mouseReleased() {
  /* text and color */
  timeColor = 255;
  randomAlpha = 0;
  instructionsColor = 107;
  millisPressed = millis() - millisCounter;  // compute millis pressed
  if ( (float( millisPressed )/ 10000) <= 0.05 ) {  // reset if subjectivized time is too fast
    subjectiveSeconds = 1;
    /* text and color */
    timeType = "aTIME";
    instructions = "press for 10'' to make your time";
    /* reset to system time */
    secondsCounter = second();
    minutesCounter = minute();
    hoursCounter = hour();
  } else {  // subjectivize time
    subjectiveSeconds = float( millisPressed ) / 10000;  // subjective seconds in relation to 10 seconds
    /* text and color */
    timeType = "sTIME";
    instructions = "tap to reset";
  }
}