const path = require('path')
const fs = require('fs')
const moment = require('moment')
const request  = require('request')
const loadJsonFile = require('load-json-file')

const headers = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
} 
const extName = ['.json','.txt']
const imgName = ['.png','.jpg','.jpeg','.gif']
const musicName = ['.mp3']
/**
 * 查看文件是否存在
 * @param {String} paths 
 */
export const existDirCreate = (paths) => {
    return new Promise(function (resolve,reject){
        if (fs.existsSync(paths)) {
            resolve('本地存在缓存路径');
        } else {
            mkdir(paths)
            resolve('创建缓存文件夹成功')
        }
    })
}

/**
 * 创建文件夹
 * @param {String}} filepath 
 */
export const mkdir = (filepath) => {
    fs.mkdir(path.normalize(filepath), { recursive: false }, (err) => {
        if (err) {
            console.log('创建失败')
        } else {
            console.log('创建成功')
        }
    })
}


/**
 * 读取所有的文件
 * @param {String} filepath 
 */
export const findDirAndFile = (filepath) => {
    return new Promise(function(resolve,reject){
        let dirLists = [];
        let fileLists = [];
        fs.readdir(path.normalize(filepath), function(err, files){
            for (let i=0; i< files.length; i++)
            {
               fs.stat(path.join(filepath, files[i]), function(err, data){     
                    if(data.isFile()){               
                        fileLists.push(path.join(filepath, files[i]));
                    }else if(data.isDirectory()){
                        dirLists.push(path.join(filepath, files[i]));
                    }
                });
            } 
        });
        setTimeout(()=>{
            resolve({dirLists,fileLists})
        },500)
    })
}

/**
 * 读取文件的信息
 * @param {String}} filepath 
 */
export const readFileInfo = (filepath) => {
    return new Promise(function(resolve){
        fs.readdir(path.normalize(filepath),async function(err, files){
            if(err){
                console.log("获取失败"+  err.toString())
            }else{
                resolve(await readFile(filepath,files,{})) //遍历读取到的文件列表
            }
        })
    })
}

/**
 * 读取文件
 * @param {String} filepath 
 * @param {Array} files 
 * @param {Object} obj 
 */
export const readFile = (filepath,files,obj) =>{
    return new Promise(function(resolve){
        files.forEach(function(filename){
            let filedir = path.join(filepath, filename);//获取当前文件的绝对路径
            fs.stat(filedir,function(eror, stats){ //根据文件路径获取文件信息，返回一个fs.Stats对象
                if(eror){
                    console.warn('获取文件stats失败');
                }else{
                    
                    if(extName.indexOf(path.extname(filename)) != -1){
                        loadJsonFile(filedir).then(json => {
                            Object.assign(obj,{...json})
                        });
                        // fs.readFile(filedir,'utf8',function(err,data){
                        //     if(!err){
                        //         const newObj = JSON.parse(data)
                        //         Object.assign(obj,{...newObj})// json
                        //     }
                        // })
                    }
                   
                    else if(imgName.indexOf(path.extname(filename)) != -1){
                        obj.pic = filedir // 图片
                    }
                   
                    else if(musicName.indexOf(path.extname(filename)) != -1){
                        obj.src = filedir // mp3
                    }

                    obj.size = getfilesize(stats.size)
                    obj.time = moment(stats.ctime).format('YYYY-MM-DD HH:mm:ss')
                    resolve(obj)
                }
            })
        })
    })
}


/**
 * //把字节转换成正常文件大小
 * @param {Number} size 
 */
export const getfilesize = (size) => {
    if (!size)  return "";
    let num = 1024.00; //byte
    if (size < num)
        return size + "B";
    if (size < Math.pow(num, 2))
        return (size / num).toFixed(2) + "KB"; //kb
    if (size < Math.pow(num, 3))
        return (size / Math.pow(num, 2)).toFixed(2) + "MB"; //M
    if (size < Math.pow(num, 4))
        return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
    return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
}


// -----------------文件下载保存本地-----------------

/**
 * 文件下载保存本地
 * @param {String} baseUrl 
 * @param {String} saveUrl 
 */
export const fileDownload = (baseUrl,dirPath,dirName) =>{
    mkdir(path.join(dirPath,'music'))
    return new Promise(function (resolve, reject) {
        existDirCreate(path.join(dirPath,'music',dirName)).then(isCreate =>{
            if(typeof(baseUrl) === "string"){
                let fileName = baseUrl.substr(baseUrl.lastIndexOf('/') + 1); //文件名称
                fileName = fileName.split('?')[0]
                let extNameStr = path.extname(fileName)
                request(baseUrl,{headers: headers}, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        let stream = fs.createWriteStream(path.join(dirPath,'music',dirName,fileName));
                        request(baseUrl).pipe(stream).on("close", function (err) {  
                            resolve(imgName.indexOf(extNameStr) != -1 ? "下载图片成功" : "下载歌曲成功");
                        });
                    } else {
                        if (error) {
                            reject(error);
                        } else {
                            reject(new Error("下载失败，返回状态码不是200，状态码：" + response.statusCode));
                        }
                    }
                });
            }else{
                let str = JSON.stringify(baseUrl,"","\t");
                fs.writeFile(path.join(dirPath,'music',dirName,dirName + '.json'),str,function(err){
                    if (err) {
                        reject(error);
                    }else{
                        resolve('写入音乐文件成功')
                    }
                })
            }
        })
    });
}

