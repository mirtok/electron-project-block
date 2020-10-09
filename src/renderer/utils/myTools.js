/**
 * 消息提示
 * @param {} text 
 * @param {*} successback 
 * @param {*} closeback 
 */
export const showMsg = (text,successback = null,closeback = null) => {
    layer.open({
        content: '<div style="padding: 10px 50px;">'+ 4156 +'</div>',
        yes() {
            layer.closeAll();
            successback ? successback() : null
        },
        cancel(){
            closeback ? closeback() : null
        }
    })
}

/**
 * 提示/状态
 * @param {} text 
 * @param {*} successback 
 * @param {*} closeback 
 */
export const msg = (text,icon = 1,closeback = null) => {
    layer.msg(text, {icon: icon, time: 2000}, closeback ); 
}

