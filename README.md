# SPRINGBOARD
A simple, web development file structure, to speed web development.  This template is a good starting point for a web site requiring Bootstrap, jQuery, Google Fonts and README. Coded by Team Bunny and presented on June 22,2017 at the Epicodus Trade Show.

## Install Instructions
1. Go to this [link]()
2. Input the Project Name to activate the download button
3. You have the option of filling out the field for Developer Name
4. Select the options that you would like to include in your project
5. Click the 'Download it!' button
6. Open the zip file and unzip the content
7. Build your web page!

## Specs
|Behavior - Plain English|Input|Output|
|---|---|---|
|The user inputs the project name which activates the Download it! button. The application then downloads |Project: My-Project, click Download it!| Download a zip file with a project folder containing an index.html, scripts.js, and styles.css.|
|The user inputs the project name, their developer name and chooses one or more options in the checkboxes. Clicks the Download it! button. The application then downloads the chosen options and includes links to them in the index.html head if needed.|Project: My-Project, Developer: My Name, choose Bootstrap and README. Click Download it! button |Download a zip file with an index.html, scripts.js, styles.css, bootstrap.css, and README.md. Link to Bootstrap appears on index.html |
|The user inputs special characters on the Project Name field form and a no special characters pop-over appears keeping the download button disabled| Project Name: &$^%#@ | A pop-over appears saying 'Project names cannot contain special characters' and the 'Download it!' button remains disabled |
|The user can see the file structure on the right of the checkbox list | Project Name: My Project, no selections on checkbox list | Downloads a zip file: 'My Project'; folder: 'My Project'; files: index.html file, js and css subdirectories that contain a blank scripts.js file and a blank styles.css file respectively. The file tree on the right of the checkbox list updates with the name of the project appearing on the main project folder.|
|The user can see the file structure on the right of the checkbox list including the checked choices.| Project Name: My Project, Developer: John Doe; jQuery and Google Fonts are checked.|Downloads a zip file: 'My Project'; folder: 'My Project'; files: index.html file, js subdirectory with blank scripts.js and jquery.js files; a css subfolder with a blank styles.css file. The index html file contains links to scripts.js, jquery.js, styles.css and a url for Google Fonts. The file tree on the right of the checkbox list updates with the name of the project, and jQuery.|
|The user clicks the "Cancel" button to clear the form.|Project: My Project, Developer: John Doe, click "Cancel"| The form gets cleared out.|

## What's included
Within the repository you'll find the following directories and files:

```
project-folder/
├── css/
│    ├── styles.css
│    └── bootstrap.css
├── img/
│    └── bunny.png
├── js/
│    ├── jquery-3.2.1.js
│    └── FileSaver.js
│    └── bootstrap.min.js
│    └── downloader.js
│    └── jszip-utils.js
│    └── jszip.js
│    └── scripts.js
│    └── string.js
├── .gitignore
├── index.html
└── README.md
```

Direct questions and comments to: [github@zaske.com](mailto:github@zaske.com)

## Technologies Used
* JavaScript
* jQuery
* Bootstrap
* Google Fonts
* JSZip
* JSZipUtils
* FileSaver
* String.js

### License
Copyright (c) 2017 Team Bunny

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
