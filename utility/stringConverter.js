module.exports = function formatFilterString(data) {
    let request = '{';
    let page = 0
    let pageSize = 0
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'page') {
              page = data[key]
            }
            else if (key === 'pageSize') {
              pageSize = data[key]
            }else{
            request += '\"' + key + '\":\"' + data[key] + '\",';
          }
        }
    }
    request = request.substring(0, request.length - 1);
    request += '}';
    return [JSON.parse(request),page,pageSize];
};
