var foundCanvas = (function(){
 
    var localBox = [];
 
    // 创建画布
    function _createCanvas(boxList, id, config){
        // 判断标签容器是否存在
        if(!document.getElementById(id)) {
            console.log(`标签id:${id},不存在`);
           return
        }
        var div = document.getElementById(id);
        var list = JSON.parse(JSON.stringify(boxList));
        var divSize = {
            w: div.offsetWidth/list.length, // 返回元素的总宽度
            h: div.offsetHeight/(list.length)// 返回元素的总高度
        }
        // 创建canvas标签
        for(var i=0;i<list.length;i++){
            var canvas = document.createElement('canvas');
            var canvasId = "canvas" + i+"_"+id;
            canvas.id= canvasId;
            div.appendChild(canvas);
            var img = document.getElementById(canvasId);
            img.style.padding = "2px 2px";
            _initCanvas(divSize,list[i],canvasId,config);
        }
    };
 
    // 初始化 显示画布
    function _initCanvas(divSize, localBox, id, config){
        const pointArray = [];
        const history = [];
        let mousedown = null;
        let dragging = false;
 
        var  boxList =  Object.assign({}, localBox);
        var conv=document.getElementById(id);
        var ctx=conv.getContext("2d");
        var imgwidth;                       // 图片宽度
        var imgheight;                      // 图片高度
        var imgObj = new Image();           // 创建image对象
        imgObj.src = boxList.src;
 
        imgObj.onload = function(){
            // 设置画布大小
            imgwidth = imgObj.width;
            imgheight = imgObj.height;
            document.getElementById(id).width = divSize.w;
            document.getElementById(id).height = divSize.h;
            // this即是imgObj
            ctx.drawImage(this, 0, 0, divSize.w, divSize.h);
            boxList = _calculateSize(divSize, boxList, imgwidth, imgheight);
 
            _drawOldRecs(boxList.rects, config);
        };
 
        // 计算比例尺寸显示适配
        function _calculateSize(divSize, boxList, imgwidth, imgheight){
            var widthImgCanvasPercentage;       // 宽度比例
            var heightImgCanvasPercentage;      // 高度比例
            let subWidth = divSize.w / imgwidth;// 算出显示比例
            let subHeight = divSize.h / imgheight
            widthImgCanvasPercentage = subWidth.toString();
            heightImgCanvasPercentage = subHeight.toString();
 
            boxList.rects.forEach(function (element) { // 计算显示尺寸并适配显示
                element.x = Math.round(element.x * widthImgCanvasPercentage);
                element.y = Math.round(element.y * heightImgCanvasPercentage);
                element.w = Math.round(element.w * widthImgCanvasPercentage);
                element.h = Math.round(element.h * heightImgCanvasPercentage);
            });
            return boxList;
        };
 
        // 画框
        function _drawOldRecs(rects, config) {
            if (rects.length == 0) {
                return;
            }
 
            for (var i = 0; i < rects.length; i++) {
                ctx.beginPath();
                ctx.lineWidth = config.lineWidth;
                ctx.strokeStyle = config.strokeStyle;
                ctx.strokeRect(rects[i].x, rects[i].y, rects[i].w, rects[i].h);
                // ctx.fillText("异物01", rects[i].x, rects[i].y);    // 画框上加文字
            }
        };
    };
 
    // js入口，监听屏幕
    function _prepareCanvas(boxList, id, config){
        localBox =  JSON.parse(JSON.stringify(boxList));
        _delCanvas(boxList, id);
        var conf = _isConfig(config);
        _createCanvas(boxList, id, conf);
        // 执行一次
        window.addEventListener('load', function() {
            // 窗口改变执行
            window.addEventListener('resize', function() {
                localBox =  JSON.parse(JSON.stringify(boxList));
                _delCanvas(boxList, id);
                // 重新创建画布
                _createCanvas(localBox, id, conf);
            })
 
        })
    };
 
    // 判断是否配置
    function _isConfig(config){
        var conf = {};
         // 配置判断
        if(config && config != ""){
            conf = Object.assign({}, config);
        }else{
            conf = {
                lineWidth:3,                    // 画框线粗细
                strokeStyle:"rgb(121, 245, 57)" // 画框线颜色
            }
        }
        return conf;
    };
 
    // 删除画布canvas标签
    function _delCanvas(boxList,id){
        localBox =  JSON.parse(JSON.stringify(boxList));
         // 判断标签容器是否存在
         if(!document.getElementById(id)) {
            console.log(`标签id:${id},不存在`);
           return;
        }
        // 删除画布
        var div = document.getElementById(id);
        var canvasCount = div.getElementsByTagName("canvas");
 
        if(canvasCount.length>0){
            for(var i=0; i<localBox.length; i++){
                document.getElementById("canvas"+i+"_"+id).remove();
            }
        }
    };
 
    return {
        prepareCanvas:_prepareCanvas
    };
 
})();
 


export default foundCanvas