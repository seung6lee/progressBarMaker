const express = require("express")
const path = require('path')
const app = express()

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extends: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.listen(6250, () => {
    console.log(`Server running at http://127.0.0.1:6250`)
})

/*
// 구현 Method

1. Backend에서 Cleint로 setting values와 함께 post요청 넣음
2. Frontend에서 요청받은데로 이미지 생성 -> Png형태로 리턴

*/