module.exports.replaceStr = function (source, string, newString) {
  'use strict';

  if (source && string) {

    return source.replace(string, newString);

  }

  else { return ''; }

};