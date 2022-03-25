const path = require('path');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const pfs = require('fs/promises');

const mockJsonFileDir = path.resolve(__dirname, './../mock');

const port = 3911;
const app = express();

// 需要进行匹配路由带有参数的mock路径
const dynamicRouteRegexes = [/^\/brand\/(\w+)$/i]

// 忽视的特定路径
const shouldNotMatchDynamicRoutes = ['/brand/add']

app.use(cors());
app.use(express.json({ limit: '150mb' }))

app.use((req, res) => {
    let { path, url, query, method } = req
    if (!shouldNotMatchDynamicRoutes.includes(path)) {
        for (let i = 0; i < dynamicRouteRegexes.length; i++) {
            const matchRes = path.match(dynamicRouteRegexes[i]);
            if (matchRes) {
                // replace the dynamic params to 1, use the 1.json data
                path = path.replace(matchRes[1], '1')
                break;
            }
        }
    }
    let responseFilePath = `${mockJsonFileDir}${path}.json`
    // console.log('mockJsonFileDir:' + mockJsonFileDir)
    // console.log('path:' + path)
    // console.log(responseFilePath)

    fs.access(responseFilePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(400, { 'Content-type': 'text/plain' })
            res.end('ERROR file does not exist')
        } else {
            if (responseFilePath.indexOf('.json') >= 0) {
                const mockJsonData = JSON.parse(fs.readFileSync(responseFilePath, 'utf-8'));
                if (mockJsonData.error) {
                    res.status(mockJsonData.status).json({
                        ...mockJsonData
                    })
                    return;
                }
                // console.log(mockJsonData)
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
