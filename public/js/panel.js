/* global variables */
let isDescriptionVisible = false;
let isQuoteVisible = false;

function createMetronome() {
  jsPanel.create({
    id: "metronome",
    headerTitle: "&#128065;",
    contentFetch: "video.html",
    headerControls: {
      smallify: "remove",
      maximize: "remove",
      close: "remove",
    },
    theme: {
      bgPanel: "#000",
      bgContent: "rgba(0, 0, 0, 1)",
      colorHeader: "#fff",
      colorContent: "#fff",
      border: "thin groove rgba(255, 255, 255, .25)",
    },
    container: "#panel",
    opacity: 0.75,
    boxShadow: 1,
    closeOnEscape: false,
    contentOverflow: "hidden",
    position: {
      my: "left-top",
      at: "left-top",
      offsetX: 40,
      offsetY: 40,
    },
    contentSize: {
      width: () => (window.innerWidth / 9) * 4,
      height: () => (window.innerWidth / 16) * 4,
    },
    resizeit: {
      aspectRatio: "content",
    },
  });
  document.getElementById("eye").style.visibility = "hidden";
  console.log("metronome enabled");
}

function createDescription() {
  if (!isDescriptionVisible) {
    jsPanel.create({
      id: "description",
      headerTitle: "&#8505;",
      contentFetch: "description.html",
      headerControls: {
        smallify: "remove",
        minimize: "remove",
        maximize: "remove",
        size: "md",
      },
      theme: {
        bgPanel: "#000",
        bgContent: "rgba(0, 0, 0, 1)",
        colorHeader: "#fff",
        colorContent: "#fff",
        border: "thin groove rgba(255, 255, 255, .25)",
      },
      container: "#panel",
      opacity: 0.75,
      boxShadow: 1,
      closeOnEscape: false,
      position: {
        my: "left-top",
        at: "left-top",
        offsetX: 20,
        offsetY: 120,
      },
      contentSize: {
        width: () => window.innerWidth / 1.5,
        height: () => window.innerHeight / 2,
      },
      onclosed: function () {
        isDescriptionVisible = false;
        document.getElementById("info").style.visibility = "visible";
        console.log("description closed");
      },
    });
    isDescriptionVisible = true;
    document.getElementById("info").style.visibility = "hidden";
    console.log("description opened");
  }
}

function createQuote() {
  if (!isQuoteVisible) {
    jsPanel.create({
      id: "quote",
      headerTitle: "&#8221;",
      contentFetch: "quote.html",
      headerControls: {
        smallify: "remove",
        minimize: "remove",
        maximize: "remove",
      },
      theme: {
        bgPanel: "#000",
        bgContent: "rgba(0, 0, 0, 1)",
        colorHeader: "#fff",
        colorContent: "#fff",
        border: "thin groove rgba(255, 255, 255, .25)",
      },
      container: "#panel",
      opacity: 0.75,
      boxShadow: 1,
      closeOnEscape: false,
      contentOverflow: "hidden",
      position: {
        my: "left-top",
        at: "left-top",
        offsetX: 100,
        offsetY: 80,
      },
      contentSize: {
        width: () => window.innerWidth / 2.5,
        height: () => window.innerHeight / 7,
      },
      onclosed: function () {
        isQuoteVisible = false;
        document.getElementById("mark").style.visibility = "visible";
        console.log("quote closed");
      },
    });
    isQuoteVisible = true;
    document.getElementById("mark").style.visibility = "hidden";
    console.log("quote opened");
  }
}
