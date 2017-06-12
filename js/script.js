$(document).ready(function() {

  "use strict";

  var Promise = window.Promise;
  if (!Promise) {
    Promise = JSZip.external.Promise;
  }

  /**
   * Reset the message.
   */
  function resetMessage() {
    $("#result")
      .removeClass()
      .text("");
  }
  /**
   * show a successful message.
   * @param {String} text the text to show.
   */
  function showMessage(text) {
    resetMessage();
    $("#result")
      .addClass("alert alert-success")
      .text(text);
  }
  /**
   * show an error message.
   * @param {String} text the text to show.
   */
  function showError(text) {
    resetMessage();
    $("#result")
      .addClass("alert alert-danger")
      .text(text);
  }
  /**
   * Update the progress bar.
   * @param {Integer} percent the current percent
   */
  function updatePercent(percent) {
    $("#progress_bar").removeClass("hide")
      .find(".progress-bar")
      .attr("aria-valuenow", percent)
      .css({
        width: percent + "%"
      });
  }

  /**
   * Fetch the content and return the associated promise.
   * @param {String} url the url of the content to fetch.
   * @return {Promise} the promise containing the data.
   */
  function urlToPromise(url) {
    return new Promise(function(resolve, reject) {
      JSZipUtils.getBinaryContent(url, function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  // our object
  function templateItem(name, filename, url) {
    this.name = name;
    this.filename = filename;
    this.url = url;
  }

  var options = [];

  // add out list of items
  options.push(new templateItem("bootstrap", "bootstrap.css", "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"));
  options.push(new templateItem("jquery", "jquery-3.2.1.js", "https://code.jquery.com/jquery-3.2.1.min.js"));

  var optionList = $('#optionNameMenu')

  //dynamic checkboxes
  $.each(options, function(item) {
    var li = $('<li/>')
      .addClass('ui-menu-item')
      .attr('role', 'menuitem')
      .appendTo(optionList);

    var input = $('<input/>')
      .addClass('ui-all')
      .attr('type', 'checkbox')
      .data('url', options[item].url)
      .appendTo(li);

    var label = $('<label/>')
      .addClass('ui-all')
      .text(options[item].name)
      .appendTo(li);
  });



  $("#zipForm").submit(function(event) {
    event.preventDefault();
    var zip = new JSZip();
    zip.file("readme.txt", "is this really in the file\nI guess I'll see");
    zip.file("js/hello.js", "alert('hi');");

    //var url = "/jszip/test/ref/complex_files/Franz Kafka - The Metamorphosis.epub";
    //var filename = "Franz Kafka - The Metamorphosis.epub";

    // works
    //var url = "https://s3.amazonaws.com/www.zaske.com/me.png";

    //does not because of a strange IMAGE CORS configuration issue on AWS S3
    // var url = "https://www.zaske.com/me.png";

    //does work
    var url = "https://www.zaske.com/files/resume_stz.pdf";
    var filename = "img/me.png";


    zip.file(filename, urlToPromise(url), { binary: true });

    //works
    zip.file("bootstrap.css", urlToPromise("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"), { binary: true });
    zip.file("jquery-3.2.1.js", urlToPromise("https://code.jquery.com/jquery-3.2.1.min.js"), { binary: true });

    // when everything has been downloaded, we can trigger the dl
    zip.generateAsync({ type: "blob" }, function updateCallback(metadata) {
        var msg = "progression : " + metadata.percent.toFixed(2) + " %";
        if (metadata.currentFile) {
          msg += ", current file = " + metadata.currentFile;
        }
        showMessage(msg);
        updatePercent(metadata.percent | 0);
      })
      .then(function callback(blob) {

        // see FileSaver.js
        saveAs(blob, "example.zip");

        showMessage("done !");
      }, function(e) {
        showError(e);
      });


    // create the file and send to user
    //   zip.generateAsync({ type: "blob" })
    //     .then(function(blob) {
    //       saveAs(blob, "hello.zip");
    //     });
  });




});