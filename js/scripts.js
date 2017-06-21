//Business Logic
//Array of options available on the web site
var options = [
  {name: "Bootstrap", webUrl: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" , zipFolder: "css/", headContent: "bootstrap.css"},
  {name: "jQuery", webUrl: "https://code.jquery.com/jquery-3.2.1.min.js" , zipFolder: "js/", headContent: "jquery-3.2.1.js"},
  {name: "README.md", webUrl: "" , zipFolder: "", headContent: ""}];

var checkedArray = [];

function HeadItem(headString,placeInHead){
  this.headString = headString;
  this.placeInHead = placeInHead;
}

//Index Object Constructor
function Index() {
  this.first = "<!DOCTYPE html>\n<html>\n"
  this.headItem = [];
  this.last = "  <body>\n  </body>\n</html>"
  this.head = function() {
    var tempHead = "  <head>\n"
    var s = headData(checkedArray);
    tempHead += s;
    // this.headItem.forEach(function(item){
    //  tempHead+="\n    " + item.headString;
    // });
    tempHead+="\n  </head>\n";
    console.log(tempHead);
    return tempHead;
  }
  this.index = function(){
    console.log(this.first + this.head() + this.last);
    return this.first + this.head() + this.last;
  };
}

function writeScriptHead(url){
  //dummie code for now - need to add logic here
  return "<script src='js/" + url + "'></script>"
}


//Generating README
function GenerateReadme() {
    var d = new Date();
    var today = (d.getMonth()+1)+"/"+d.getDate()+"/"+d.getFullYear();
    var values = {name: $("#inputProject").val(), dev: $("#inputName").val(), day: today, year:d.getFullYear()}
    readmeText = "# {{name}}\n[Add your description here]. Originally coded on {{day}}. By {{dev}}. \n\n### License\nCopyright {{year}} {{dev}}\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.";
    return S(readmeText).template(values).s;
}

//Generating head data
  function headData(checkedArray) {
    var cssBegValue = '    <link href="';
    var cssEndValue = '" rel="stylesheet" type="text/css">\n';
    var jsBegValue = '    <script href="';
    var jsEndValue = '"></script>\n';
    var tempString = "";

    if ($.inArray("Bootstrap",checkedArray)!==-1) {
      var bootstrap = options.find(function (item) {return item.name === 'Bootstrap';});
      tempString += cssBegValue + bootstrap.zipFolder + bootstrap.headContent + cssEndValue;
    }

    tempString += cssBegValue + 'css/styles.css' + cssEndValue;

    if ($.inArray("jQuery",checkedArray)!==-1) {
      var jQuery = options.find(function (item) {return item.name === 'jQuery';});
      tempString += jsBegValue + jQuery.zipFolder + jQuery.headContent + jsEndValue;
    }

    tempString += jsBegValue + 'js/scripts.js' + jsEndValue;

    var slicedTempString = tempString.slice(0,-1); //removes trailing newline
    return slicedTempString;

  }

//////////////////////////////
//UI Logic
//////////////////////////////

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
  //
  // <div class="checkbox">
  //   <label style="font-size: 1.5em">
  //       <input type="checkbox" value="">
  //       <span class="cr"><i class="cr-icon fa fa-check"></i></span>
  //       Bigger
  //   </label>
  // </div>



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

    //creates our zip file object
    var zip = new JSZip();
    var projectName = $("#inputProject").val();
    var developerName = $("#inputName").val();


    //creates a new index object
    var newIndex = new Index();

    //gets the selected items from our form
    $("input[type='checkbox']:checked").each (function() {
      checkedArray.push($(this).val());
    }); // will delete if checkedObjectArray works

    //Adds a README to the zip file
    if ($.inArray("README.md",checkedArray) > -1) {
      zip.file(projectName+"/README.md",GenerateReadme());
    }

    //Adds the index.html file to the zip
    zip.file(projectName+"/index.html",newIndex.index());

    //Add CSS file
    zip.file(projectName+"/css/styles.css","");

    //Add a blank scripts.js file
    zip.file(projectName+"/js/scripts.js","");

    //Add the files to the zip
    checkedArray.forEach(function(item){

      var Opts = $.grep(options, function(option){ return option.name === item; });

      if (Opts[0].webUrl){
        var url = Opts[0].webUrl;
        var filename = projectName+"/"+Opts[0].zipFolder+Opts[0].headContent;
        zip.file(filename, urlToPromise(url), { binary: true });
      }
    });

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
        saveAs(blob, projectName+".zip");

        showMessage("done !");
      }, function(e) {
        showError(e);
      });
  });

  $("#resetButton").click (function() {
    $("#zipForm")[0].reset();
    var checkedArray = [];
  });

  //validation on input text field
  $('#inputProject').on('input', function() {
  	var input=$(this);
    var re = /^[A-Za-z0-9_](?!.*?\s$)[A-Za-z0-9\s]{0,20}$/;
    if (!(input.val().match(re))){
      $("#zipButton").addClass('disabled');
      $(this).addClass('has-error');
      input.popover('show');

    }
    else {
      $("#zipButton").removeClass('disabled');
      $(this).removeClass('has-error');
      input.popover('hide');
    }
  }); // end of input event listener
  // Get the modal
  var modal = document.getElementById('myModal');

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  btn.onclick = function() {
      modal.style.display = "block";
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
  
});
