import { app, BrowserWindow, ipcMain, screen } from 'electron'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
const appVersion = process.env.npm_package_version

const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`


let mainWindow = null

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 700,
        useContentSize: true, //将设置为 web 页面的尺寸
        frame: false, // PS:隐藏窗口菜单
        resizable: true, //是否可放大
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        }
    })

    mainWindow.loadURL(winURL)

    //重点在下面这行，开启调试
    mainWindow.webContents.closeDevTools()

    mainWindow.on('closed', () => {
        mainWindow = null
    })

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})


// 最小化窗体
ipcMain.on('minWindow', () => {
    mainWindow.minimize()
})

//关闭窗体
ipcMain.on('closeWindow', () => {
    mainWindow.close()
})

// 最大化窗体
ipcMain.on('maxWindow', () => {
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize()
})



