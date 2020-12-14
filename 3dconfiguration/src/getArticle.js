import state from './state';

var getArticle = function() {
    var cart = new Object();

    var $arr_articles = new Object();
    $arr_articles['GO LIGHTBOX 085 200'] = 'GO-LB-085200-B';
    $arr_articles['GO LIGHTBOX 100 200'] = 'GO-LB-100200-B';
    $arr_articles['GO LIGHTBOX 185 200'] = 'GO-LB-185200-B';
    $arr_articles['GO LIGHTBOX 200 200'] = 'GO-LB-200200-B';

    $arr_articles['GO LIGHTBOX 085 225'] = 'GO-LB-085225-B';
    $arr_articles['GO LIGHTBOX 100 225'] = 'GO-LB-100225-B';
    $arr_articles['GO LIGHTBOX 185 225'] = 'GO-LB-185225-B';
    $arr_articles['GO LIGHTBOX 200 225'] = 'GO-LB-200225-B';

    $arr_articles['GO LIGHTBOX 085 250'] = 'GO-LB-085220-B';
    $arr_articles['GO LIGHTBOX 100 250'] = 'GO-LB-100250-B';
    $arr_articles['GO LIGHTBOX 185 250'] = 'GO-LB-185250-B';
    $arr_articles['GO LIGHTBOX 200 250'] = 'GO-LB-200250-B';

    $arr_articles['GO COUNTER L WHITE'] = 'GO-COUNTER-L';
    $arr_articles['FUSSPLATTEN EINSEITIG'] = 'GO-FEET-ES';
    $arr_articles['TÜR SET'] = 'GO-DOOR';
    $arr_articles['SYSTEMVERBINDER FLEX'] = 'GO-CONNECT-FLEX';

    var addCart = function(prop,count) {
        if (typeof count == 'undefined') count=1;
        if (typeof cart[prop] === 'undefined') {
            cart[prop] = count
        } else {
            cart[prop] += count;
        }
    }

    var getCart = function() {
        var art = new Array();
        var q = new Array();
        for (var key in cart) {
            if (cart[key]>0) {
                if (typeof $arr_articles[key] !== 'undefined') {
                    art.push($arr_articles[key]);
                    q.push(Math.ceil(cart[key]));
                } else {
                    art.push(key);
                    q.push(Math.ceil(cart[key]));
                }
            }
        }
        return '?products='+ art.join(',') + '&quantity=' + q.join(',');
    } 

    var width = state.width;
    var length = state.length;
    if (state.wallsName == 'I') {
        width = state.length;
        length = state.width;
    }
    for (var i1 = 0; i1<state.group.children.length; i1++) {
        if (state.group.children[i1].isLightBox===true) {
            addCart(state.group.children[i1].userData.name);
            if (typeof state.group.children[i1].userData.foot!= 'undefined') {
                addCart('FUSSPLATTEN EINSEITIG', state.group.children[i1].userData.foot);
            }
        }
        for (var i2 = 0; i2<state.group.children[i1].children.length; i2++) {
           if (state.group.children[i1].children[i2].isLightBox===true) {
                addCart(state.group.children[i1].children[i2].userData.name);
                if (typeof state.group.children[i1].children[i2].userData.foot!= 'undefined') {
                    addCart('FUSSPLATTEN EINSEITIG', state.group.children[i1].children[i2].userData.foot);
                }
           }
        }
    }
    
    var article=state.wallsName+'-';
    switch (width) {
        case 1: article += 'A'; break;
        case 2: article += 'B'; break;
        case 3: article += 'C'; break;
        case 4: article += 'D'; break;
        case 5: article += 'E'; break;
        case 6: article += 'F'; break;
    }
    article += length; 
    if (state.cabin>0) article+='-K';
    
    if (state.wallsName=='L') {
        addCart('SYSTEMVERBINDER FLEX', 1);
    } else if (state.wallsName=='U') {
        addCart('SYSTEMVERBINDER FLEX', 2);
    }

    if (state.cabin>0 && state.width>1 && state.length>1 && state.walls>1 ) addCart('TÜR SET', 1);
    if (state.counter>0 && state.width>1 && state.length>1) addCart('GO COUNTER L WHITE', state.counter);
    if (state.counter == 1) {
        article += '-C';
    } else if (state.counter == 2) {
        article += '-CC';
    }
    addCart(article,1);
    
    //REMOVE
    //console.log('oredr '+ article +':',cart);
    $("#oredr-info").html(getCart());

    return getCart();
}

export default getArticle;