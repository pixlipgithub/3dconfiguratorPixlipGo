
var state = {
    length:4,
    width: 4,
    height: 2,
    cabin:0,
    counter:0,
    style1:0,
    style2:0,

    depthWall:0.15,
    walls:2,
   
    wallsName:'',
    countWalls:0,
    
    wallColor: '#fed765',
    wallColor1: '#fed765',
    wallColor2: '#fed765',

    opacityWall:0.6,
    
    limits: {
        length:[1,6],
        width:[1,6], 
        height:[2,2.5], 
        walls:[1,3],
        cabin:[0,1], 
        counter:[0,2], 
        style1:[0,1], 
        style2:[0,1], 
        textSize:[10,1000]
    },

    cabinProps: {
        width:1.85,
        depth:0.85
    },
    counterProps: {
        width:1,
        depth:0.4,
        height:1,
        offset:1
    },

    font:'sans-serif',
    fontColor:'#ff3300',
    textWall:'',
    textSize:100,

    wallpaper:false,
    isUpdateWallpaper:false,
    fileLogo:false,
    logoScale:100,
    canvasScale:100,
    isClearDragObj:false,

    submitUrl:'http://shopware6.pixlip.com/dvsn/quick-cart/add',

    logoOffset:[0,0],
    textOffset:[0,0],

    setLimits: function() {
        var localLim = {
            walls:[[1,3]],
            length:[[1,6]],
            width:[[1,6]],
            cabin:[[0,1]],
            counter:[[0,2]]
        };

        if (this.walls == 1) {
            localLim.cabin.push([0,0]);
            if (this.length<2) localLim.counter.push([0,0]);
            if (this.width<2) localLim.counter.push([0,1]);
            if (this.counter>0) localLim.length.push([2,6]);
            if (this.counter>1) localLim.width.push([2,6]);
            if (this.counter>1 && this.length<=2 && this.width<=2) localLim.walls.push([1,1]);
            if (this.counter>0 && this.width==1) localLim.walls.push([1,1]);

        } else if (this.walls == 2 ) {
            if (this.width<2 || this.length<2) localLim.counter.push([0,0]);
            if (this.width==2 && this.length==2) localLim.counter.push([0,1]);
            if (this.counter>0) {
                localLim.length.push([2,6]);
                localLim.width.push([2,6]);
                if (this.length < 3) localLim.walls.push([1,2]);
            }

            if (this.counter>1) {
                if (this.width == 2) localLim.length.push([3,6]);
                if (this.length == 2) localLim.width.push([3,6]);
                if (this.length < 4 && this.cabin == 0) localLim.walls.push([1,2]);
            }

            if (this.width<2 || this.length<2) {
                localLim.cabin.push([0,0]);
            }
            if (this.cabin>0) {
                if (this.counter>0) {
                    if (this.width == 2) localLim.length.push([3,6]);
                    if (this.length == 2) localLim.width.push([3,6]);
                }
                if (this.counter>1) {
                    localLim.length.push([3,6]);
                    localLim.width.push([4,6]);
                    if (this.length < 3) localLim.walls.push([1,2]);
                    if (this.length<=4 && this.width==2) localLim.walls.push([1,2]);
                    if (this.length==3 && this.width==3) localLim.walls.push([1,2]);
                }
                
                if (this.width==2 && this.length==2) localLim.counter.push([0,0]);
                if (this.width<=3 && this.length<=4) localLim.counter.push([0,1]);

                localLim.width.push([2,6]);
                localLim.length.push([2,6]);
            }

        } else if (this.walls == 3) {
            if (this.width<2 || this.length<=2) localLim.counter.push([0,0]);
            if (this.length==3 && this.cabin==0) localLim.counter.push([0,1]);
            if (this.counter>0) {
                localLim.length.push([3,6]);
                localLim.width.push([2,6]);
            }
            if (this.counter>1 && this.cabin==0) {
                localLim.length.push([4,6]);
            }

            localLim.length.push([2,6]);
            if (this.width<3 || this.length<2) {
                localLim.cabin.push([0,0]);
            }
            if (this.length<3 && this.width<3) localLim.cabin.push([0,0]);

            if (this.cabin>0) {
                if (this.counter>1) {
                    localLim.length.push([3,6]);
                    localLim.width.push([3,6]);
                    if (this.width==2) localLim.length.push([5,6]);
                    if (this.width==3) localLim.length.push([4,6]);
                    if (this.length==3) localLim.width.push([4,6]);
                }
                if (this.length<3) localLim.cabin.push([0,0]);
                if (this.width<4) localLim.cabin.push([0,0]);
                
                if (this.length == 2) localLim.width.push([3,6]);   
                if (this.width == 2) localLim.length.push([3,6]); 

                if (this.length<=4 && this.width==2) localLim.counter.push([0,1]);
                if (this.length==3 && this.width==3) localLim.counter.push([0,1]);
            }

        }
       
        if (this.cabin>0) {
            if (this.length<3 && this.width<3) localLim.walls.push([2,2]);
            localLim.walls.push([2,3]);
        }
        if (this.length<2) localLim.walls.push([1,2]);
        
        for (var name in localLim) {
            this.limits[name][0] = localLim[name][0][0];
            this.limits[name][1] = localLim[name][0][1];
            for(var i=1; i<localLim[name].length; i++) {
                if (this.limits[name][0]<localLim[name][i][0]) this.limits[name][0] = localLim[name][i][0];
                if (this.limits[name][1]>localLim[name][i][1]) this.limits[name][1] = localLim[name][i][1];
            }
        }
    },
    checkLimits: function(value,type) {
        if (type == 'height') var value = parseFloat(value);
        else var value = parseInt(value);
        if (typeof this.limits[type] !== 'undefined') {
            if (value < this.limits[type][0]) {
                value = this.limits[type][0];
            } else if (value > this.limits[type][1]) {
                value = this.limits[type][1];
            }
        }
        return value;
    },
    setState: function(action, callback) {
        if (typeof action === 'object') {
            if (typeof this[action.type] !== "undefined") {
                if (action.type=='width' || action.type=='height' || action.type=='length') {
                    this.isClearDragObj = true;
                }

                if (action.type=='style1' || action.type=='style2' || action.type=='textSize' || action.type=='logoScale' || action.type=='height') {
                    this[action.type] = this.checkLimits(action.value,action.type);
                    if (typeof callback === 'function') callback(this[action.type]);
                    this.needsUpdate=true;
                } else if (action.type == 'walls' || action.type == 'cabin' || action.type == 'counter' || action.type=='width' || action.type=='length') {
                    this[action.type] = this.checkLimits(action.value,action.type);
                    this.setLimits();
                    if (typeof callback === 'function') callback(this[action.type]);
                    this.needsUpdate=true;
                } else {
                    this[action.type] = action.value;
                    this.needsUpdate=true;
                    this.isUpdateWallpaper=true;
                }
                
            } else {
                if (action.type == 'loadfileLogo') {
                    this.fileLogo = action.value;
                    this.needsUpdate=true;
                    this.isUpdateWallpaper=true;
                } else if (action.type == 'setColor') {
                    this[action.name] = action.value;
                    if (action.name == 'trimColor' || action.name == 'rollupColor') {
                        this.isChangeColor = true;
                    }
                    this.needsUpdate=true;
                 }
            }
        }
        return this;
    },
    getScene: function () {
        //console.log(this.scene.toJSON());
    },
    scene:null,
    group:null,
    texture:null,

    is_find_position: false,
    holeGroup:null,
    baseUrl:'http://bydenis.com/3dconfiguration',
    controls:true,
    needsUpdate:true,
    needsUpdateCanvas:false,
    printWall:{},
    dragObj:{},
    isCreateObj:{},
    dragOffset:{'logoOffset':[0,0], 'textOffset':[0,0]},
    printHoles:false
}

export default state;