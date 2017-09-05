'use strict';

angular.module('tempoApp.version', [
  'tempoApp.version.interpolate-filter',
  'tempoApp.version.version-directive'
])

.value('version', '0.1');
