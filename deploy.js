var chalk = require('chalk');
var path = require('path');
var fs = require('fs');
var Client = require('ftp');

var ENV = process.env;
var BUILD_PATH = 'build'; //path.resolve(__dirname, ENV.FTP_BUILD_PATH || 'build');
var TARGET_PATH = ''; //ENV.FTP_SERVER_PATH;
var USERNAME = 'spphotoformdeploy@schanelyphotography.com'; //ENV.FTP_USERNAME;
var PASSWORD = 'spPh0t0F0rms'; //ENV.FTP_PASSWORD;
var HOST = 'ftp.schanelyphotography.com'; //ENV.FTP_SERVER_HOST;
var PORT = 21; //ENV.FTP_SERVER_PORT || 21;

// List all files in a directory in Node.js recursively in a synchronous fashion
var walkSync = function(dir, filelist) {
    var path = path || require('path');
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = walkSync(path.join(dir, file), filelist);
        }
        else {
            filelist.push(path.join(dir, file));
        }
    });
    return filelist;
};

var uploadList = walkSync('build');
console.log(uploadList);

var client = new Client();
client.on('greeting', function(msg) {
  console.log(chalk.green('greeting'), msg);
});
client.on('ready', function() {
  client.list(TARGET_PATH, function(err, serverList) {
    console.log(serverList);
  });
// console.log(chalk.green('starting upload.'));
//   var total = uploadList.length;
//   var uploadCount = 0;
//   var errorList = [];
  uploadList.forEach(function(file) {
    let remoteFile = file.replace('build/', '');
    console.log(chalk.grey('transferring'), file, chalk.grey('-->'), remoteFile);
    // client.put(file, remoteFile, function(err) {
    //   if (err) {
    //     console.error(chalk.red('error'));
    //     console.error(err.message);
    //     throw err;
    //   } else {
    //     console.info(chalk.green('success'));
    //   }
    // });
//     if (uploadCount === total) {
//
//       if (errorList.length === 0) {
//         console.info(chalk.green('All files uploaded!'));
//       } else {
//         console.log(chalk.red('Failed files:'));
//         errorList.forEach(function(file) {
//           console.log(file.local + chalk.grey(' --> ') + file.target);
//         });
//         throw 'Total Failed: ' + errorList.length;
//       }
//     }
//   });
  });
  client.end();
});
// connect to localhost:21 as anonymous
client.connect({
  host: HOST,
  port: PORT,
  user: USERNAME,
  password: PASSWORD,
});
