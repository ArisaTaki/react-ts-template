const path = require('path');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const pfs = require('fs/promises');

const mockJsonFileDir = path.resolve(__dirname, './../mock');

const port = 3911;
const app = express();

// 需要进行匹配路由带有参数的mock路径
const dynamicRouteRegexes = [
    /^\/brand\/(\w+)$/i,
    /^\/camera-list\/(\w+)$/i,
    /^\/camera\/(\w+)$/i,
    /^\/camera\/details\/(\w+)$/i
]

// 忽视的特定路径
const shouldNotMatchDynamicRoutes = ['/brand/add', '/camera-list/del', '/camera/search']

// 排序模拟
const sortMock = (arr, sort) => {
    console.log(sort)
    if (!sort) {
        return arr
    } else if (sort === 'ascend') {
        return arr.sort((a, b) => Number(a.id) - Number(b.id))
    } else if (sort === 'descend') {
        return arr.sort((a, b) => Number(b.id) - Number(a.id))
    }
}

app.use(cors());
app.use(express.json({ limit: '150mb' }))

app.use((req, res) => {
    let { path, url, query, method } = req
    if (!shouldNotMatchDynamicRoutes.includes(path)) {
        for (let i = 0; i < dynamicRouteRegexes.length; i++) {
            const matchRes = path.match(dynamicRouteRegexes[i]);
            if (matchRes) {
                // replace the dynamic params to 1, use the search.json data
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
                if (path === '/camera/search') {
                    console.log(mockJsonData)
                    console.log(req.body.query)
                    if (mockJsonData.code) {
                        const index = req.body.query.index;
                        const size = req.body.query.size;
                        const sort = req.body.query.sort
                        res.status(mockJsonData.code).json({
                            ...mockJsonData,
                            data: {
                                ...mockJsonData.data,
                                index,
                                size,
                                records: sortMock(mockJsonData.data.records.
                                slice((index - 1) * size, index * size), sort)
                            }
                        })
                        return;
                    }
                } else {
                    if (mockJsonData.code) {
                        res.status(mockJsonData.code).json({
                            ...mockJsonData
                        })
                        return;
                    }
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
