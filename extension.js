const vscode = require("vscode");

module.exports = {
    activate,
    deactivate,
};

class WatchTreeProvider
{
    getTreeItem(element)
    {
        return element;
    }

    async getChildren(element)
    {
        if (!element)
        {
            let item = {};
            item.label = "Hello, world!";
            return [item];
        }
        else
        {
            return [];
        }
    }
}

function activate(context)
{
    const watchTreeProvider = new WatchTreeProvider();

    const debuggerTracker = {
        onWillStartSession: function() {
        },

        onWillStopSession: function() {            
        },

        onWillReceiveMessage: async function() {
        // if (msg.type === "request" && msg.command === "scopes") {
        //   return debugVariablesTrackerService().onScopesRequest(msg);
        // } else if (msg.type === "request" && msg.command === "variables") {
        //   return debugVariablesTrackerService().onVariablesRequest(msg);
        // } else if (msg.type === "request" && msg.command === "evaluate" && /^\s*$/.test(msg.arguments.expression)) {
        //   // this is our call, in "update-frame-id" command.
        //   return debugVariablesTrackerService().setFrameId(msg.arguments.frameId);
        // }
        },

        onDidSendMessage: async function(message) {
            if (message.type === "event" && message.event === "stopped" && message.body.threadId !== undefined)
            {
                console.log("Debugger stopped");
            }
        }
    };

    context.subscriptions.push(
        vscode.window.registerTreeDataProvider(
            "watch",
            watchTreeProvider
        )
    );

    vscode.debug.registerDebugAdapterTrackerFactory("python", { createDebugAdapterTracker: () => debuggerTracker });
}

function deactivate() { }