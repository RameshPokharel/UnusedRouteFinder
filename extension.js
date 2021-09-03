const vscode = require('vscode');
const command = require('./command.js');

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    'finder.helloWorld',
    function () {
      command.generate();
    }
  );
  let codeAction = vscode.languages.registerCodeActionsProvider(
    [
      {
        language: 'json',
        scheme: 'file',
      },
    ],
    {
      provideCodeActions: function () {
        return Promise.resolve([
          {
            command: 'finder.helloWorld',
            title: 'FindUnUsedObject',
            tooltip: 'auto find object',
          },
        ]);
      },
    }
  );
  context.subscriptions.push(disposable);
  context.subscriptions.push(codeAction);
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

exports.deactivate = deactivate;
