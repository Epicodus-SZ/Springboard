//Business Logic
//Array of options available on the web site
var options = [{
    name: "Bootstrap",
    webUrl: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css",
    zipFolder: "css/",
    file: "bootstrap.css",
    headContent: "<link href='css/bootstrap.css' rel='stylesheet' type='text/css'>"
  },
  {
    name: "jQuery",
    webUrl: "https://code.jquery.com/jquery-3.2.1.min.js",
    zipFolder: "js/",
    file: "jquery-3.2.1.js",
    headContent: "<script src='js/jquery-3.2.1.js'></script>"
  },
  {
    name: "Google Fonts",
    webUrl: "",
    zipFolder: "",
    file: "",
    headContent: "<link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet'>"
  },
  {
    name: "README.md",
    webUrl: "",
    zipFolder: "",
    file: "",
    headContent: ""
  }
];

var checkedArray = [];

//Index Object Constructor
function Index() {
  this.first = "<!DOCTYPE html>\n<html>\n"
  this.last = "  <body>\n  </body>\n</html>"
  this.head = function() {
    var tempHead = "  <head>\n"
    var s = headData(checkedArray);
    tempHead += s;
    // this.headItem.forEach(function(item){
    //  tempHead+="\n    " + item.headString;
    // });
    tempHead += "\n  </head>\n";
    console.log(tempHead);
    return tempHead;
  }
  this.index = function() {
    console.log(this.first + this.head() + this.last);
    return this.first + this.head() + this.last;
  };
}

function writeScriptHead(url) {
  //dummie code for now - need to add logic here
  return "<script src='js/" + url + "'></script>"
}

//Generating README
function GenerateReadme() {
  var d = new Date();
  var today = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
  var values = {
    name: $("#inputProject").val(),
    dev: $("#inputName").val(),
    day: today,
    year: d.getFullYear()
  }
  readmeText = "# {{name}}\n[Add your description here]. Originally coded on {{day}}. By {{dev}}. \n\n### License\nCopyright {{year}} {{dev}}\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.";
  return S(readmeText).template(values).s;
}

//Generating head data
function headData(checkedArray) {
  //sps = how far to indent
  var sps = "    ";
  var tempString = "";

  if ($.inArray("Google Fonts", checkedArray) !== -1) {
    var bootstrap = options.find(function(item) {
      return item.name === 'Google Fonts';
    });
    tempString += sps + bootstrap.headContent + "\n";
  }

  if ($.inArray("Bootstrap", checkedArray) !== -1) {
    var bootstrap = options.find(function(item) {
      return item.name === 'Bootstrap';
    });
    tempString += sps + bootstrap.headContent + "\n";
  }

  tempString += sps + "<link href='css/styles.css' rel='stylesheet' type='text/css'>\n"

  if ($.inArray("jQuery", checkedArray) !== -1) {
    var jQuery = options.find(function(item) {
      return item.name === 'jQuery';
    });
    tempString += sps + jQuery.headContent + "\n";
  }

  tempString += sps + "<script src='js/scripts.js'></script>";

  // var slicedTempString = tempString.slice(0,-1); //removes trailing newline
  return tempString;

}

//////////////////////////////
//UI Logic
//////////////////////////////
function generateFileTree() {

  var checkedBoxes = $("input:checked").get();
  var unchecked = $("input:checkbox:not(:checked)").get();

  // hide all unchecked options
  unchecked.forEach(function(item) {
    if (item.value === "README.md") {
      $("#liReadme").hide();
    }
    if (item.value === "Bootstrap") {
      $("#liBootstrap").hide();
    }
    if (item.value === "jQuery") {
      $("#liJquery").hide();
    }
  });

  // show all checked options
  checkedBoxes.forEach(function(item) {
    if (item.value === "README.md") {
      $("#liReadme").show();
    }
    if (item.value === "Bootstrap") {
      $("#liBootstrap").show();
    }
    if (item.value === "jQuery") {
      $("#liJquery").show();
    }
  });
}


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

  var optionList = $('#optionNameMenu')

  $("#spanProject").text("New Project");

  //dynamic checkboxes
  $.each(options, function(item) {

    var formCheck = $('<div>')
      .addClass('checkbox')
      .appendTo(optionList);

    var label = $('<label>')
      .addClass('cbLabel')
      .text(options[item].name)
      .appendTo($(".checkbox").last());

    var inputCheckbox = $('<input>')
      .attr('type', 'checkbox')
      .attr('value', options[item].name)
      .appendTo($(".cbLabel").last());

    var span = $('<span>')
      .addClass('cr')
      .appendTo($(".cbLabel").last());

    var fancyCB = $('<i>')
      .addClass('cr-icon fa fa-check')
      .appendTo($(".cr").last());
  });

  //Event listener for Download button
  $("#zipButton").click(function(event) {
    event.preventDefault(); // supresses a server event

    //plays bounce sound effect
    var audioDownload = document.getElementById("audio");
    audioDownload.play();

    //creates our zip file object
    var zip = new JSZip();
    var projectName = $("#inputProject").val();
    var developerName = $("#inputName").val();

    //creates a new index object
    var newIndex = new Index();

    //gets the selected items from our form
    $("input[type='checkbox']:checked").each(function() {
      checkedArray.push($(this).val());
    }); // will delete if checkedObjectArray works

    //Adds a README to the zip file
    if ($.inArray("README.md", checkedArray) > -1) {
      zip.file(projectName + "/README.md", GenerateReadme());
    }

    //Adds the index.html file to the zip
    zip.file(projectName + "/index.html", newIndex.index());

    //Add CSS file
    zip.file(projectName + "/css/styles.css", "");

    //Add a blank scripts.js file
    zip.file(projectName + "/js/scripts.js", "");

    //Add the files to the zip
    checkedArray.forEach(function(item) {

      var Opts = $.grep(options, function(option) {
        return option.name === item;
      });

      if (Opts[0].webUrl) {
        var url = Opts[0].webUrl;
        var filename = projectName+"/"+Opts[0].zipFolder+Opts[0].file;
        zip.file(filename, urlToPromise(url), { binary: true });
      }
    });

    // when everything has been downloaded, we can trigger the dl
    zip.generateAsync({
        type: "blob"
      }, function updateCallback(metadata) {
        var msg = "progression : " + metadata.percent.toFixed(2) + " %";
        if (metadata.currentFile) {
          msg += ", current file = " + metadata.currentFile;
        }
        showMessage(msg);
        updatePercent(metadata.percent | 0);
      })
      .then(function callback(blob) {

        // see FileSaver.js
        saveAs(blob, projectName + ".zip");

        showMessage("done !");
      }, function(e) {
        showError(e);
      });
  });

  $("#resetButton").click(function() {
    $("#zipForm")[0].reset();
    checkedArray = []; // clear the array
    $("#spanProject").text("New Project"); //reset the
    generateFileTree(); //reset the file tree view
    $("#zipButton").addClass('disabled'); //disable the download button
  });

  //validation on input text field
  $('#inputProject').on('input', function() {

    var input = $(this);
    var re = /^[A-Za-z0-9_](?!.*?\s$)[A-Za-z0-9\s]{0,20}$/;
    if (!(input.val().match(re))) {
      $("#zipButton").addClass('disabled');
      $(this).addClass('has-error');
      input.popover('show');

    } else {
      $("#zipButton").removeClass('disabled');
      $(this).removeClass('has-error');
      input.popover('hide');
    }

    $("#spanProject").text($("#inputProject").val());


  }); // end of input event listener

  //change event listener
  $("input").change(function() {
    //refresh the file list
    generateFileTree();
  });

  // Get the modal
  var modal = document.getElementById('myModal');

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";

    var audioModal = document.getElementById("audio1");
    audioModal.play();
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  //temp bug fix for bootstrap js
  $('body').on('hidden.bs.popover', function(e) {
    $(e.target).data("bs.popover").inState.click = false;
  });
});
