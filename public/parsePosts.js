const fs = require('fs');
const path = require('path');
const metadataParser = require("markdown-yaml-metadata-parser");
const MarkdownIt = require("markdown-it");

const postsRoot = 'posts/nested-posts/banca-nationala';
const md = new MarkdownIt();

function parsePost(dir) {
    fs.promises.readdir(dir)
        .then((val) => {
            return val.map((file) => {
                if (path.extname(file) === '.md') {
                    return fs.promises.readFile(path.join(dir,file), {encoding : 'utf8'})
                        .then((text) => {
                            console.log(text);
                            const { content, metadata } = metadataParser(text);
                            return {
                                type: 'leaf',
                                content: md.render(content),
                                metadata: metadata,
                            }
                        })
                } else {
                    return {
                        type: 'folder',
                        content:
                    };
                }
            });
        })
        .catch((err) => {
            console.log(err);
        })
        .then((val) => {
            val[2].then((val) => {
                console.log(val);
            })
            console.log(val);
        })
}

parsePost(postsRoot);