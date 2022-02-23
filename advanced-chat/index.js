if(mp.storage.data.timeStamp === undefined)
    mp.storage.data.timeStamp = false;
if(mp.storage.data.pageSize === undefined)
    mp.storage.data.pageSize = 18;
if(mp.storage.data.fontSize === undefined)
    mp.storage.data.fontSize = 0.9;
if(mp.storage.data.toggleChat === undefined)
    mp.storage.data.toggleChat = true;

// Mark chat as active
mp.gui.chat.show(false);
const chat = mp.browsers.new('package://advanced-chat/index.html');
chat.markAsChat();

// Set Data
chat.execute(`setToggleTimestamp(${mp.storage.data.timeStamp});`);
chat.execute(`setPageSize(${mp.storage.data.pageSize});`);
chat.execute(`setFontSize(${mp.storage.data.fontSize});`);
chat.execute(`setToggleChat(${mp.storage.data.toggleChat});`);


// Add commands
mp.events.addCommand("timestamp", () => {
    
    let timeStamp = !mp.storage.data.timeStamp;
    chat.execute(`setToggleTimestamp(${timeStamp});`);
    mp.storage.data.timeStamp = timeStamp;
});

mp.events.addCommand("fontsize", (fontSize) => {
    if(fontSize< 0.5 || fontSize > 1.5)
    {
        mp.gui.chat.push("/fontsize accepts values between 0.5 and 1.5 (Default: 0.9)");
        return;
    }
    mp.storage.data.fontSize = fontSize;
    chat.execute(`setFontSize(${fontSize});`);
});

mp.events.addCommand("pagesize", (pageSize) => {
    if(pageSize< 4 || pageSize > 24)
    {
        mp.gui.chat.push("/pagesize accepts values between 4 and 24 (Default: 18)");
        return;
    }
    mp.storage.data.pageSize = pageSize;
    chat.execute(`setPageSize(${pageSize});`);
});

mp.events.addCommand("togglechat", () => {
    mp.storage.data.toggleChat = !mp.storage.data.toggleChat;
    chat.execute(`setToggleChat(${mp.storage.data.toggleChat});`);
});

mp.events.addCommand("chathelp", () => {
    mp.gui.chat.push("/timestamp /fontsize /pagesize /togglechat");
});


// Anti spam
mp.players.local.lastMessage = new Date().getTime();
mp.events.add("setLastMessage", (ms) =>
{
    mp.players.local.lastMessage = ms + 350;
});

// Clear chat event, call from server
mp.events.add("server:clearChat", () =>
{
    chat.execute(`chatAPI.clear();`);
});