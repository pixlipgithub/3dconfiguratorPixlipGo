var getNameBox = function(w,h,_foot) {
    var width = w*100;
    var foot = 1;
    if (width>100) foot = 1.5;
    if (width==85) width ='085';
    if (typeof _foot!='undefined') foot = _foot;

    return { 'name': 'GO LIGHTBOX ' + width + ' ' + (h*100), 'foot': foot };
}

export default getNameBox;