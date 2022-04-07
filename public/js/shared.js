/* global variables */
// database
var database, ref, firebase, stime;

// jspanel
var maxSize = 2,
  minSize = 2.5;

/* firebase configuration */
firebase.initializeApp(firebaseConfig);
database = firebase.database();
ref = database.ref("sTIMEdb");

/* welcome message */
console.log(
  "\n 'time is the intuition of ourselves and our inner space' — john cage \n\n 'sTIME' a time subjectivizer app by leandro estrella \n "
);

function setStime() {
  /* update sTIME in db */
  data = {
    sTIME: subjectiveSeconds,
  };
  ref.update(data);
}
