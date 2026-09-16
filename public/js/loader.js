(function () {
  /* run once per document, even if this file is included again */
  if (window.stimeScriptsLoaded) return;
  window.stimeScriptsLoaded = true;

  var scripts = Array.from(document.querySelectorAll("script")).map(
    (scr) => scr.src
  );

  /* the DOM resolves script.src to an absolute URL, so resolve the
     candidate against the same base before you compare */
  function has(src) {
    return scripts.includes(new URL(src, document.baseURI).href);
  }

  /* secrets */
  if (!has("js/secrets.js")) {
    var tag = document.createElement("script");
    tag.defer = true;
    tag.src = "js/secrets.js";
    document.getElementsByTagName("head")[0].appendChild(tag);
    console.log("secrets added");

    tag.onload = function () {
      /* firebase */
      if (
        !has("https://www.gstatic.com/firebasejs/9.6.9/firebase-app-compat.js")
      ) {
        var tag = document.createElement("script");
        /* tag.defer = true; */
        tag.src =
          "https://www.gstatic.com/firebasejs/9.6.9/firebase-app-compat.js";
        document.getElementsByTagName("head")[0].appendChild(tag);
        console.log("firebase-app added");

        tag.onload = function () {
          if (
            !has(
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
                !has(
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
                  if (!has("js/shared.js")) {
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
})();
