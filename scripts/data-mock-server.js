// 这里就是模拟server请求的mock配置文件了，使用express来进行数据发送与请求模拟
const path = require('path');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const pfs = require('fs/promises');

// mock路径
const mockJsonFileDir = path.resolve(__dirname, './../mock');

// 服务监听接口
const port = 3911;
// 启动express实例
const app = express();

// 需要进行匹配路由带有参数的mock路径
const dynamicRouteRegexes = [/^\/example\/(\w+)$/i]

// 忽视的特定路径
const shouldNotMatchDynamicRoutes = ['/example/example']

// 跨域
app.use(cors());
// 限制大小
app.use(express.json({ limit: '150mb' }))

app.use((req, res) => {
    let { path, url, query, method } = req
    // 这个功能主要针对的是请求参数在路径上的，而不是query类型的请求，如果是query就不需要在意这里
    if (!shouldNotMatchDynamicRoutes.includes(path)) {
        for (let i = 0; i < dynamicRouteRegexes.length; i++) {
            const matchRes = path.match(dynamicRouteRegexes[i]);
            if (matchRes) {
                // replace the dynamic params to 1, use the 1.json data
                path = path.replace(matchRes[1], '1')
                console.log(path)
                break;
            }
        }
    }
    let responseFilePath = `${mockJsonFileDir}${path}.json`
    fs.access(responseFilePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(400, { 'Content-type': 'text/plain' })
            res.end('ERROR file does not exist')
        } else {
            if (responseFilePath.indexOf('.json') >= 0) {
                const mockJsonData = JSON.parse(fs.readFileSync(responseFilePath, 'utf-8'));
                if (mockJsonData.code) {
                    res.status(mockJsonData.code).json({
                        ...mockJsonData
                    })
                    return;
                }
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=UTF-8',
                })
                fs.createReadStream(responseFilePath).pipe(res);
            }
        }
    })
})

app.listen(port, () => {
    console.log(`Mock data server is listening at http://localhost:${port}`);
});
