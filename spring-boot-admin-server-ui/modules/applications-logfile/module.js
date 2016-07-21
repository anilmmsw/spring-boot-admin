/*
 * Copyright 2014 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var angular = require('angular');

var module = angular.module('sba-applications-logfile', ['sba-applications']);
global.sbaModules.push(module.name);

module.run(function ($sce, $http, ApplicationViews) {

  ApplicationViews.register({
    order: 1,
    title: $sce.trustAsHtml('<i class="fa fa-file-text-o fa-fw"></i>Log'),
    href: '/api/applications/{id}/logfile',
    target: '_blank',
    show: function (application) {
      if (!application.managementUrl || !application.statusInfo.status || application.statusInfo.status === 'OFFLINE') {
        return false;
      }
      return $http.head('api/applications/' + application.id + '/logfile').then(function () {
        return true;
      }).catch(function () {
        return false;
      });
    }
  });

});
