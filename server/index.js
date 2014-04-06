/**
 * @author: gyzerok@gmail.com
 * Date: 4/6/14
 * Time: 12:31 PM
 */

var app = require('./app/app');

var port = app.get('port');
app.listen(port);
console.log('Server started on port: ' + port);