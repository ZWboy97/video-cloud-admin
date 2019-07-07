/**
 * 提供一些公用的工具函数
 */

//解析url中的参数
export const queryString = () => {
    let _queryString = {};
    const _query = window.location.search.substr(1);
    const _vars = _query.split('&');
    _vars.forEach((v, i) => {
        const _pair = v.split('=');
        if (!_queryString.hasOwnProperty(_pair[0])) {
            _queryString[_pair[0]] = decodeURIComponent(_pair[1]);
        } else if (typeof _queryString[_pair[0]] === 'string') {
            const _arr = [_queryString[_pair[0]], decodeURIComponent(_pair[1])];
            _queryString[_pair[0]] = _arr;
        } else {
            _queryString[_pair[0]].push(decodeURIComponent(_pair[1]));
        }
    });
    return _queryString;
};

// 将以秒为单位的时间进行美化
export const secondToString = (time) => {
    var days = Math.floor((time / (3600 * 24)))
    var hours = Math.floor((time - (days * 3600 * 24)) / 3600)
    var minutes = Math.floor((time - (days * 3600 * 24) - (hours * 3600)) / 60)
    var seconds = Math.floor(time % 60)
    var time_string = ""
    if (days > 0) {
        time_string += (days + "天 ")
    }
    if (hours > 0) {
        time_string += (hours + "小时 ")
    }
    time_string += (minutes + "分钟 ")
    time_string += (seconds + "秒")
    return time_string
}