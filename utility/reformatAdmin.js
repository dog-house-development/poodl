module.exports = function reformatAdmin(data) {
    let request = '{';
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'password2') {
              continue
            }else{
            request += '\"' + key + '\":\"' + data[key] + '\",';
          }
        }
    }
    request = request.substring(0, request.length - 1);
    request += '}';
    return JSON.parse(request);
};
