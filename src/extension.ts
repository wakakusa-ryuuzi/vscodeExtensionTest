// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let count: number = 0;



let showSelectedFileNameInInformation = ( e: vscode.TextEditor|undefined , thisArgs:number = count ): any => {
	count++;
	vscode.window.showInformationMessage(count.toString());
	

	const filenName:string | undefined = e?.document.fileName;
	switch (typeof filenName){
		case "string": {
			vscode.window.showInformationMessage(filenName);
			break;
		}
		case "undefined": {
			vscode.window.showInformationMessage("undefined");
			break;
		}
	}
}



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	//フォーカスされてるエディタの選択文字列を表示
	let testCommand1 = vscode.commands.registerCommand('vscodeExtensionTest.command1', () => {
		const editor:vscode.TextEditor | undefined = vscode.window.activeTextEditor;
		if ( editor !== undefined ){
			const document:vscode.TextDocument = editor.document;
			const selection:vscode.Selection = editor.selection;
			const word:string = document.getText(selection);
			vscode.window.showInformationMessage(word);

			//vscode.languages.registerFoldingRangeProvider({ language: 'semanticLanguage'}, new FoldingRangeProvider());
		}
	});

	//全エディタの選択文字列を表示
	let testCommand2 = vscode.commands.registerCommand('vscodeExtensionTest.command2', () => {
		const editors:vscode.TextEditor[] | undefined = vscode.window.visibleTextEditors;
			let text = "";
			for (const editor of editors) {
				const document:vscode.TextDocument = editor.document;
				const selection:vscode.Selection = editor.selection;
				const word:string = document.getText(selection);
				text = text + ` ${word}`;
			}
			
			vscode.window.showInformationMessage(text);
	});

	
	//イベントハンドラ
	vscode.window.onDidChangeActiveTextEditor( showSelectedFileNameInInformation )

	context.subscriptions.push(testCommand1);
	context.subscriptions.push(testCommand2);
}

// this method is called when your extension is deactivated
export function deactivate() {}


class FoldingRangeProvider implements vscode.FoldingRangeProvider {

	provideFoldingRanges(document: vscode.TextDocument, context: vscode.FoldingContext, token: vscode.CancellationToken): vscode.ProviderResult<vscode.FoldingRange[]> {

		return;
	}

	test (a: void): void {
		const editor:vscode.TextEditor | undefined = vscode.window.activeTextEditor;
		if ( editor !== undefined ){
			const document:vscode.TextDocument = editor.document;
			const test: vscode.FoldingRange = new vscode.FoldingRange(2, 3, vscode.FoldingRangeKind.Comment);
			const token: vscode.CancellationTokenSource = new vscode.CancellationTokenSource();
		}
	}
}