const fs = require('fs');
const path = require('path');
const metadataParser = require("markdown-yaml-metadata-parser");
const MarkdownIt = require("markdown-it");
const { parse } = require('path');

const postsRoot = 'posts/nested-posts/banca-nationala';
const md = new MarkdownIt();

async function parsePost(dir) {
    const directories = await fs.promises.readdir(dir);
    return await {
        kids: await directories
            .filter((file => path.extname(file) !== '.md'))
            .map(async (file) => {return await parsePost(path.join(dir,file))}),

        post: await directories
            .filter((file) => path.extname(file) === '.md')
            .map(async (file) => {
                return await fs.promises.readFile(path.join(dir, file), { encoding: 'utf8' })
                    .then((text) => {
                        console.log(text);
                        const { content, metadata } = metadataParser(text);
                        return {
                            content: md.render(content),
                            metadata: metadata,
                        }
                    })
            })
    }
}


parsePost(postsRoot).then((val) => {
    console.log(val);
});