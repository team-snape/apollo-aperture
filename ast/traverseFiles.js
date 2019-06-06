const parser = require('@babel/parser'),
  traverse = require('@babel/traverse').default,
  t = require('@babel/types'),
  fs = require('fs'),
  path = require('path'),
  htmlElementsToIgnore = require('./util/htmlElements');

let apolloClientVar;

// const filePath = path.join(__dirname, '..', 'samples', 'todo', 'App.js');
// const filePath = path.join(__dirname, '..', 'samples', 'todo', 'index.js');

const getFilePromisified = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, file) => {
      if (err) reject(err);
      resolve(file);
    });
  });
};

const traverseFiles = {
  default() {
    return async function findContent(file) {
      // search for ApolloClient declaration and copy body to apolloClientVar
      // first look for REACTDOM import to find if we're in the index.js file
      // first find the file that we want so we can read it
      const data = await getFilePromisified(file);
      const ast = parser.parse(data, {
        sourceType: 'module',
        plugins: [ 'jsx' ]
      });
      if (isIndexFile(ast)) {

      } else {

      }
      // old version with promise chaining
      // getFilePromisified(filePath)
      // // getFilePromisified(file)
      //   .then(data => {
      //     const ast = parser.parse(data, {
      //       sourceType: 'module',
      //       plugins: [ 'jsx' ]
      //     });
      //     // console.log(ast);
      //     const index = isIndexFile(ast);
      //     console.log(index);
      //   });
    }
  }
};

function isIndexFile(ast) {
  traverse(ast, {
    ImportDeclaration(path) {
      if (path.node.source.value === 'react-dom') {
        console.log(path);
      }
    }
  });
}


/*const findReactDOMImport = ast => {
  traverse(ast,{
    enter(path) {
      console.log(path);
    }
  });
};*/

module.exports = traverseFiles.default();