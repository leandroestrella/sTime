let scripts = Array.from(document.querySelectorAll("script")).map(
  (scr) => scr.src
);
/* secrets */
if (!scripts.includes("js/secrets.js")) {
  var tag = document.createElement("script");
  tag.defer = true;
  tag.src = "js/secrets.js";
  document.getElementsByTagName("head")[0].appendChild(tag);
  console.log("secrets added");

  tag.onload = function () {
    /* firebase */
    if (
      !scripts.includes(
        "https://www.gstatic.com/firebasejs/9.6.9/firebase-app-compat.js"
      )
    ) {
      var tag = document.createElement("script");
      /* tag.defer = true; */
      tag.src =
        "https://www.gstatic.com/firebasejs/9.6.9/firebase-app-compat.js";
      document.getElementsByTagName("head")[0].appendChild(tag);
      console.log("firebase-app added");

      tag.onload = function () {
        if (
          !scripts.includes(
            "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth-compat.js"
          )
        ) {
          var tag = document.createElement("script");
          /* tag.defer = true; */
          tag.src =
            "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth-compat.js";
          document.getElementsByTagName("head")[0].appendChild(tag);
          console.log("firebase-auth added");

          tag.onload = function () {
            if (
              !scripts.includes(
                "https://www.gstatic.com/firebasejs/9.6.9/firebase-database-compat.js"
              )
            ) {
              var tag = document.createElement("script");
              /* tag.defer = true; */
              tag.src =
                "https://www.gstatic.com/firebasejs/9.6.9/firebase-database-compat.js";
              document.getElementsByTagName("head")[0].appendChild(tag);
              console.log("firebase-database added");

              tag.onload = function () {
                /* shared */
                if (!scripts.includes("js/shared.js")) {
                  var tag = document.createElement("script");
                  tag.defer = true;
                  tag.src = "js/shared.js";
                  document.getElementsByTagName("head")[0].appendChild(tag);
                  console.log("shared added");
                }
              };
            }
          };
        }
      };
    }
  };
}
