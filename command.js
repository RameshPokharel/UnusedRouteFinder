const vscode = require('vscode');

function task(i) {
  setTimeout(function () {
    // Add tasks to do
  }, 2000 * i);
}

async function generate() {
  const editor = vscode.window.activeTextEditor;
  const componentName = editor.document.getText();
  if (!componentName) {
    vscode.window.showErrorMessage('You must select JSON file!');
    return;
  }
  try {
    let jsonData = JSON.parse(componentName);
    let validatorJson = jsonData.validatorJson;

    const promises = [];
    let j = 0;
    Object.keys(validatorJson).forEach(async function (key) {
      j++;
      var methodValue = validatorJson[key];
      console.log('key', key);
      console.log('methodValue', methodValue);
      let i = 0;
      Object.keys(methodValue).forEach(async function (childkey) {
        //check childkey occurrences
        i++;

        promises.push(
          new Promise((resolve) => {
            setTimeout(function () {
              console.log('childkey', childkey);
              vscode.commands.executeCommand('workbench.action.findInFiles', {
                query: childkey, // arguments to the findInFiles command

                triggerSearch: true,
                preserveCase: true,
                useExcludeSettingsAndIgnoreFiles: true,
                isRegex: false,
                isCaseSensitive: true,
                matchWholeWord: true,
                filesToInclude: '',
                filesToExclude: './*.css',
              });
              resolve();
            }, 5000 * i * j);
          })
        );
      });
    });
    Promise.all(promises);
  } catch (e) {
    vscode.window.showErrorMessage('selected file is not a valid JSON file');
    return;
  }

  vscode.window.showInformationMessage('Hello World from finder!');
}

exports.generate = generate;
