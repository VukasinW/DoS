__dirname = __filename.replace('\\index.js', '');
const { spawn } = require('child_process');
const defaultGateway = require('default-gateway');

module.exports = (ip, port='*', buffer_size=55000, cb=console.log) => {
    return new Promise(async(resolve, reject) => {
        
        if(!ip || ip === 'router')
            ip = (await defaultGateway.v4()).gateway; //router's ip

        const s = spawn('runner.exe', ['main.py', ip, port, buffer_size], {
            cwd: `${__dirname}\\bin`
        });
        
        s.stdout.on('data', chunk => cb(chunk.toString()));
        s.on('error', reject);

        resolve(Object.assign(s, {
            stop: s.kill
        }));
    });
}