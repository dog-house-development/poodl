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
            }
            else  if (key === 'dateRange'){
              //this will be set up to send dat dateRange
              dates = data[key].split(',')
              request += '\"startDate\" : {\"\$gte\" : \"' + dates[0] + 'T00:00:00.000Z\",\"\$lt\": \"' + dates[1] + '\"}}'
            }
            else{
            request += '\"' + key + '\":\"' + data[key] + '\",';
          }
        }
    }
    request = request.substring(0, request.length - 1);
    request += '}';
    return [JSON.parse(request),page,pageSize];
};
