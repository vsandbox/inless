// react always needs requestAnimationFrame
global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};

// polyfill for react
require('core-js/es6/map');
require('core-js/es6/set');

// enzyme can't work without adapter
const EnzymeReactAdapter = require('enzyme-adapter-react-16');
const configure = require('enzyme').configure;
configure({adapter: new EnzymeReactAdapter()});
