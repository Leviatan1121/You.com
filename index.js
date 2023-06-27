/*npm install --save-dev electron
npm install -g electron-builder
electron-builder --win*/

const { app, Menu, BrowserWindow } = require('electron')
const path = require('path')

const HOME = 'https://you.com'
var mainWindow 

const menuTemplate = [
    {
        label: 'Inicio (Alt + 1)',
        accelerator: 'Alt+1',
        click: () => {
            mainWindow.loadURL(HOME)
            mainWindow.webContents.on('did-finish-load', () => mainWindow.setTitle('YOU.com'))
        },
    },
    {
        label: 'Opciones (Alt + 2)',
        accelerator: 'Alt+2',
        id: 'options',
        submenu: [
            {
                label: 'Abrir',
                visible: false,
                accelerator: 'Alt+2',
                click() {
                    const menu = Menu.getApplicationMenu()
                    const optionsMenuItem = menu.getMenuItemById('options')
                    optionsMenuItem.submenu.popup()
                }
            },
            {
                label: 'Atrás',
                accelerator: 'Alt+Left',
                click() {
                    mainWindow.webContents.goBack()
                }
            },
            {
                label: 'Adelante',
                accelerator: 'Alt+Right',
                click() {
                    mainWindow.webContents.goForward()
                }
            }
        ]
    },
    {
        label: 'Salir (Alt + Q)',
        accelerator: 'Alt+Q',
        click() {
            app.quit()
        }
    }
]

const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)

createWindow = () => {
    mainWindow = new BrowserWindow({
        icon: path.join(__dirname, 'icon.png'),
        width: 800,
        height: 600,
        autoHideMenuBar: false,
        show: false,
    })

    mainWindow.setMenu(menu)
    mainWindow.loadURL(HOME)
    
    /*mainWindow.webContents.on('did-navigate', (event, url) => console.log(url))*/
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.setTitle('YOU.com')
        mainWindow.maximize()
        //mainWindow.show()
    });
    mainWindow.on('closed', () => mainWindow = null)
}

app.on('ready', createWindow)