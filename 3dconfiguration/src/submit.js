import state from './state';

import getArticle from './getArticle';

var submit = function() {
    var href = state.submitUrl + getArticle();
    console.log('cart:',href);
    window.open(
        href,
        '_blank'
    );
}

export default submit;