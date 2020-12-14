import state from './state';

var clearDragObj = function(type) {
    if (typeof state.dragObj[type] != 'undefined') {
        state.dragGroup.remove(state.dragObj[type]);
        state.dragObj[type] = {};

        state.printWall[type] = {};
        state.printWall[type]['imageX'] = 0;
        state.printWall[type]['imageY'] = 0;
    
        state.dragOffset[type][0]=0;
        state.dragOffset[type][1]=0;
    }
}

export default clearDragObj;