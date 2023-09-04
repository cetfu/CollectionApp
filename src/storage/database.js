import RNFS from 'react-native-fs';
import { deviceLanguage } from '../../i18n/i18n.config';
import {
    DATA_FILE_NAME,
    DATA_FILE_PATH,
    DB_DIR_NAME,
    SETTINGS_FILE_NAME, SETTINGS_FILE_PATH,
    TABLE_FILE_NAME,
    TABLE_FILE_PATH,
    TEMP_PATH
} from '../CONSTANTS';

/**
 * readDir returns
 * [{"ctime": null,
 * "isDirectory": [Function isDirectory],
 * "isFile": [Function isFile],
 * "mtime": 2022-07-01T10:47:31.000Z,
 * "name": "Screenshot_1656668657.png",
 * "path": "/data/user/0/com.collectionapp/cache/images/Screenshot_1656668657.png",
 * "size": 472276}]
 * @type {ReadDirItem[]}
 */

const createResponse = (status, no, message, data) => {
    return {
        status, no, message, data,
    };
};

export class Database {
    constructor() {
        RNFS.exists(`${RNFS.TemporaryDirectoryPath}/${DB_DIR_NAME}`)
            .then(f => {
                if (f === false) {
                    RNFS.mkdir(`${RNFS.TemporaryDirectoryPath}/${DB_DIR_NAME}`)
                        .then(() => console.log(`${DB_DIR_NAME} is created`))
                }
                RNFS.exists(`${TABLE_FILE_PATH}`)
                    .then(a => {
                        if (a === false) {
                            RNFS.writeFile(`${TABLE_FILE_PATH}`, JSON.stringify({}), 'utf8')
                                .then(() => console.log(`${TABLE_FILE_NAME} is created`))
                        }
                    });
                RNFS.exists(`${DATA_FILE_PATH}`)
                    .then(a => {
                        if (a === false) {
                            RNFS.writeFile(`${DATA_FILE_PATH}`, JSON.stringify({}), 'utf8')
                                .then(() => console.log(`${DATA_FILE_NAME} is created`))
                        }
                    })
                RNFS.exists(`${SETTINGS_FILE_PATH}`)
                    .then(a => {
                        if (a === false) {
                            RNFS.writeFile(`${SETTINGS_FILE_PATH}`, JSON.stringify({
                                theme: "INDIGO",
                                language: deviceLanguage
                            }), 'utf8')
                                .then(() => console.log(`${SETTINGS_FILE_NAME} is created`))
                        }
                    })
                RNFS.readDir(`${RNFS.TemporaryDirectoryPath}/${DB_DIR_NAME}`)
                    .then(f => {
                        //console.log(f);
                    });
            });
    }

    copyFileToTemp(filePath, fileName) {
        return new Promise(async (resolve, reject) => {
            try {
                const f = await RNFS.readFile(filePath, "base64")
                if (f) {
                    const dest = `${RNFS.TemporaryDirectoryPath}/${DB_DIR_NAME}/${fileName}`
                    const res = await RNFS.copyFile(filePath, dest);
                    resolve(createResponse(true, 2, 'SUCCESS', dest));
                } else {
                    reject(createResponse(false, 1, 'ERROR'));
                }
            } catch (e) {
                reject(createResponse(false, 0, e));
            }
        });
    }

    getCachedFiles() {
        return new Promise(async (resolve, reject) => {
            const fs = await RNFS.readDir(TEMP_PATH)
            resolve(fs)
        })
    }

    createCollectionTable(collectionName, tables = {}) {
        /*
            example table data
            {
                    "table1": {
                    field1: "image",
                    field2: "text",
                    field3: "date"
                },
                    "table2": {
                    field1: "image",
                    field2: "text",
                    field3: "date"
                }
            }
         */
        return new Promise(async (resolve, reject) => {
            try {
                const tableFile = JSON.parse(await RNFS.readFile(TABLE_FILE_PATH, 'utf8'));
                if (typeof tableFile[collectionName] === 'undefined') tableFile[collectionName] = {}
                let keys = Object.keys(tableFile)
                let table = {
                    ...tables,
                    id: keys.length,
                };
                let newFile = {
                    ...tableFile,
                };
                newFile[collectionName] = table;
                await RNFS.writeFile(TABLE_FILE_PATH, JSON.stringify(newFile), 'utf8');
                resolve(createResponse(true, 1, 'SUCCESS'));
            } catch (e) {
                reject(createResponse(false, 0, e));
            }
        });
    }

    addField(collectionName, fieldName, fieldType) {
        return new Promise(async (resolve, reject) => {
            try {
                const tableFile = JSON.parse(await RNFS.readFile(TABLE_FILE_PATH, 'utf8'));
                if (typeof tableFile[collectionName] === 'undefined') {
                    let tables = Object.keys(tableFile)
                    tableFile[collectionName] = {id: "ID"};
                }
                tableFile[collectionName][fieldName] = fieldType;
                const r = await RNFS.writeFile(TABLE_FILE_PATH, JSON.stringify(tableFile), 'utf8');
                resolve(createResponse(true, 1, 'SUCCESS'));
            } catch (e) {
                reject(createResponse(false, 0, e));
            }
        });
    }

    getFields(collectionName = '') {
        return new Promise(async (resolve, reject) => {
            try {
                const tableFile = JSON.parse(await RNFS.readFile(TABLE_FILE_PATH, 'utf8'));
                if (typeof tableFile[collectionName] === 'undefined') tableFile[collectionName] = {}
                let response = []
                for (let obj in tableFile[collectionName]) {
                    let f = {
                        fieldName: obj,
                        fieldType: tableFile[collectionName][obj]
                    }
                    response.push(f)
                }
                resolve(createResponse(true, 2, "SUCCESS", response))
            } catch (e) {
                reject(false, 0, e)
            }
        })
    }

    getTables() {
        return new Promise(async (resolve, reject) => {
            try {
                const tableFile = JSON.parse(await RNFS.readFile(TABLE_FILE_PATH, 'utf8'));
                let tables = Object.keys(tableFile)
                resolve(createResponse(true, 1, "SUCCESS", tables))
            } catch (e) {
                reject(createResponse(false, 0, e))
            }
        })
    }

    addValue(collectionName, datas) {
        return new Promise(async (resolve, reject) => {
            try {
                const tableFile = JSON.parse(await RNFS.readFile(TABLE_FILE_PATH, 'utf8'));
                const dataFile = JSON.parse(await RNFS.readFile(DATA_FILE_PATH, "utf8"))
                if (typeof tableFile[collectionName] !== "undefined") {
                    if (typeof dataFile[collectionName] === 'undefined') dataFile[collectionName] = []
                    let imageField = ""
                    for (let key in tableFile[collectionName]) {
                        if (tableFile[collectionName][key] === "IMAGE") imageField = key
                    }
                    let obj = {}
                    let files = await this.getCachedFiles()
                    for (let value in datas) {
                        if (value === imageField) {
                            const f = await this.copyFileToTemp(datas[value], `${files.length}.png`)
                            obj[value] = `file://${f.data}`
                        } else {
                            obj[value] = datas[value]
                        }
                        // tr ülke
                        // content://com.android.providers.downloads.documents/document/raw%3A%2Fstorage%2Femulated%2F0%2FDownload%2FScreenshot_1656668657.png resim
                    }
                    obj["id"] = dataFile[collectionName].length + 1
                    dataFile[collectionName].push(obj)
                    await RNFS.writeFile(DATA_FILE_PATH, JSON.stringify(dataFile), "utf8")
                    resolve(createResponse(true, 2, "SUCCESS"))
                } else {
                    reject(createResponse(false, 1, "ERROR addValue invalid table"))
                }
            } catch (e) {
                reject(createResponse(false, 0, e))
            }
        })
    }

    getValues(collectionName) {
        return new Promise(async (resolve, reject) => {
            try {
                const dataFile = JSON.parse(await RNFS.readFile(`${DATA_FILE_PATH}`, "utf8"))
                if (typeof dataFile[collectionName] === "undefined") dataFile[collectionName] = []
                let response = []
                for (let i in dataFile[collectionName]) {
                    let fields = Object.keys(dataFile[collectionName][i])
                    let f = {}
                    for (let key of fields) {
                        f[key] = dataFile[collectionName][i][key]
                    }
                    response.push(f)
                }
                resolve(createResponse(true, 1, "SUCCESS", response))
            } catch (e) {
                reject(createResponse(false, 0, e))
            }
        })
    }

    deleteValue(collectionName, valueId) {
        return new Promise(async (resolve, reject) => {
            try {
                const dataFile = JSON.parse(await RNFS.readFile(DATA_FILE_PATH, "utf8"))
                if (typeof dataFile[collectionName] === "undefined") dataFile[collectionName] = []
                let response = []
                for (let i in dataFile[collectionName]) {
                    if (dataFile[collectionName][i].id === valueId) {
                        dataFile[collectionName].splice(i, 1)
                    }
                }
                await RNFS.writeFile(DATA_FILE_PATH, JSON.stringify(dataFile), "utf8")
                resolve(createResponse(true, 1, "SUCCESS"))
            } catch (e) {
                reject(createResponse(false, 0, e))
            }
        })
    }

    deleteCollection(collectionName) {
        return new Promise(async (resolve, reject) => {
            try {
                const tableFile = JSON.parse(await RNFS.readFile(TABLE_FILE_PATH, 'utf8'));
                const dataFile = JSON.parse(await RNFS.readFile(DATA_FILE_PATH, "utf8"));
                if (typeof tableFile[collectionName] !== "undefined") {
                    delete tableFile[collectionName]
                    delete dataFile[collectionName]
                    await RNFS.writeFile(TABLE_FILE_PATH, JSON.stringify(tableFile), "utf8")
                    await RNFS.writeFile(DATA_FILE_PATH, JSON.stringify(dataFile), "utf8")
                    resolve(createResponse(true, 1, "SUCCESS"))
                } else {
                    reject(createResponse(false, 1, "ERROR deleteCollection invalid table"))
                }
            } catch (e) {
                reject(createResponse(false, 0, e))
            }
        })
    }
    updateSettings(settings){
        console.log(settings)
        return new Promise(async (resolve, reject) => {
            try {
                //const settingsFile = JSON.parse(await RNFS.readFile(SETTINGS_FILE_PATH, "utf8"))
                await RNFS.writeFile(SETTINGS_FILE_PATH, JSON.stringify(settings), "utf8")
                resolve(createResponse(true, 1, "SUCCESS"))
            } catch (e) {
                reject(createResponse(false, 0, e))
            }
        })
    }
    getSettings(){
        return new Promise(async (resolve, reject) => {
            try {
                const settingsFile = JSON.parse(await RNFS.readFile(SETTINGS_FILE_PATH, "utf8"))
                if(settingsFile){
                    resolve(createResponse(true, 1, "SUCCESS", settingsFile))
                }
            } catch (e) {
                reject(createResponse(false, 0, e))
            }
        })
    }
}
