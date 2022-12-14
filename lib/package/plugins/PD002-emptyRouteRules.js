/*
  Copyright 2019 Google LLC

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

const ruleId = require("../myUtil.js").getRuleId();
      //debug = require("debug")("apigeelint:" + ruleId);

const plugin = {
        ruleId,
        name: "Unreachable Route Rules - Defaults",
        message:
        "Check RouteRules in a ProxyEndpoint to ensure that one and only one has a blank set of conditions.",
        fatal: false,
        severity: 2, //error
        nodeType: "RouteRule",
        enabled: true
      };

const onProxyEndpoint = function(ep, cb) {
    let routeRules = ep.getRouteRules(),
        hadError = false;

  if (routeRules) {
    let blankRR = routeRules.filter( rr =>
                                     !rr.getCondition() ||
                                     rr.getCondition().getExpression() === "");
    if (blankRR.length > 1) {
      blankRR.forEach( rr =>
                       ep.addMessage({
                         plugin,
                         source: rr.getSource(),
                         line: rr.getElement().lineNumber,
                         column: rr.getElement().columnNumber,
                         message: `Multiple RouteRules with no Condition. Only the first is evaluated.`
                       }));
      hadError = true;
    }
  }
  if (typeof(cb) == 'function') {
    cb(null, hadError);
  }
};

module.exports = {
  plugin,
  onProxyEndpoint
};
