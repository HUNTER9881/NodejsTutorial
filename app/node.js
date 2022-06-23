const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const child = spawn('ls', ['-la']);



exports.exec = () => {
    // @description: Mavjud bolgan fayllarni korsatib beradi
    exec('ls', function (err, out, stderr) {
        // console.log(err)
        // console.log(out)
        // console.log(stderr)
    });

}
exports.spawn = () => {

    // @description: log fayllarni o'qish uchun

    // const child = spawn('tail', ['-f', './var/system.log']);
    // child.stdout.on('data', function (data) {
    //     console.log('' + data);
    // })


    // ============================================================================================================

    // @description: fayllar qachon yatatilgani haqida malumot

    // child.stdout.on('data', function (data) {
    //     console.log('data from child: ' + data);
    // });
    // child.on('exit', function (code) {
    //     console.log('child process terminated with code ' + code);
    // });


    // ============================================================================================================

    // @description: fayllar mavjud toki mavjud emsligi haqida

    // const child = spawn('ls', ['1.txt']);
    // child.on('exit', function (code) {
    //     console.log('child process terminated with code ' + code);
    // });


    // ============================================================================================================

    // var child = spawn('sleep', ['10']);
    // setTimeout(function () {
    //     child.kill();
    // }, 1000);
    // child.on('exit', function (code, signal) {
    //     if (code) {
    //         console.log('child process terminated with code ' + code);
    //     } 
    //     else if (signal) {
    //         console.log('child process terminated because of signal ' + signal);
    //     }
    // })



}
exports.fs = () => {

    fs.readFile(path.join(__dirname, '../var/demo.txt') , (data) => {
        console.log(data)
    });
     
}










