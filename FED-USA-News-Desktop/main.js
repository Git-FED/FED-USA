const { app, BrowserWindow, shell, session } = require('electron');
const path = require('path');
const { buildMenu } = require('./menu');
function external(url){ if(/^https?:|^mailto:/.test(url)) shell.openExternal(url); }
function createWindow(){ const win=new BrowserWindow({width:1200,height:800,minWidth:800,minHeight:600,backgroundColor:'#07070a',webPreferences:{contextIsolation:true,nodeIntegration:false,sandbox:true,preload:path.join(__dirname,'preload.js')}}); win.webContents.setWindowOpenHandler(({url})=>{external(url);return {action:'deny'}}); win.webContents.on('will-navigate',(e,{url})=>{if(!url.startsWith('file://')){e.preventDefault();external(url)}}); win.loadFile(path.join(__dirname,'app/site/index.html')); buildMenu(win); }
app.whenReady().then(()=>{session.defaultSession.setPermissionRequestHandler((_w,_p,cb)=>cb(false));createWindow();app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)createWindow()})}); app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit()});
