const express = require('express');
const { spawn } = require('node:child_process');
const fs = require("node:fs")
const path = require("node:path")
const app = express();

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, '../docs/.vitepress/dist')))

app.post('/saveEditor',async (req,res)=>{
    const { title, link, content} = req.body
    const fileName = `${link}.md`
    // vitepress对应的文件夹
    const toFilePath = path.resolve(__dirname, '../docs/essay');
    // 需要保存的当前文件路径
    const filePath = path.join(toFilePath, fileName)

    // 拼接文档frontmatter
    let markdown = `
        ---
        title: ${title}
        author: Triumph-Light
        categories:
            - 文档
        tags:
            - 记录
        ---
        ${content}`

    fs.writeFile(filePath, markdown, 'utf-8',(err) => {
        if (err) {
          res.send({
            "code": 200,
            "message": err
          })
        }
      
        // 处理vitepress的sidebar，我的vitepress把sidebar抽离出了一个json文件
        const sidebarPath = path.resolve(__dirname, '../docs/.vitepress/config/sidebar.json');
        // 读取文件内容
        fs.readFile(sidebarPath, 'utf8', (err,data) => {
          if (err) {
            console.error('Error reading file:',err);
            return;
          }
      
          const sidebar = JSON.parse(data)

          const links = link.split('/').filter(item => item)
          const insertIndex = sidebar['/essay'].findIndex(item => item.text.toLowerCase() === links[0])
          const blogs = sidebar['/essay'][insertIndex].items
          
          // 把当前文件信息存储到sidebar中，并覆原文件
          blogs.push({ text: title, link:link })
          fs.writeFile(sidebarPath, JSON.stringify(sidebar), 'utf-8', (err) => {
            if (err) {
              console.error(err)
            }
          })
        });
      
        // // 最后使用nodejs的child_process，切换vitepress根目录，执行build
        new Promise((resolve,reject)=>{
            const app = spawn('npm run docs:build', [],{
                cwd: path.resolve(__dirname,'../'), // 执行命令的路径
                stdio: 'inherit', // 输出共享给父进程
                shell: true
            });
            //执行完毕关闭并resolve
            app.on('close', resolve);
        })
    })
})

app.listen(3008,()=>{
    console.log("run at http://localhost:3008");
})