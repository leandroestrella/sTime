/* global variables */
var val, player;

// load the IFrame Player API code asynchronously
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// create an <iframe> (and YouTube player) after the API code downloads
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "750",
    width: "563",
    videoId: "tymHYCbMJ-o",
    playerVars: {
      playsinline: 1,
      controls: 1,
      autoplay: 1,
      modestbranding: 1,
      loop: 1,
      iv_load_policy: 3,
      disablekb: 1,
      cc_load_policy: 0,
      enablejsapi: 1,
    },
    events: {
      onReady: onPlayerReady,
    },
  });
}

// call this function when the video player is ready
function onPlayerReady(event) {
  event.target.setPlaybackRate(1);
}

// set new playback rate when new sTIME is set
ref.on("child_changed", (snapshot) => {
  const changedPost = snapshot.val();
  val = changedPost;
  stime = 1 / changedPost;
  player.setPlaybackRate(stime);
  console.log("playback rate: " + stime);
});
