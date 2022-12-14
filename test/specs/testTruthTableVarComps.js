/*
  Copyright 2019-2021 Google LLC

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

/* global describe, it */

const assert = require("assert"),
      TruthTable = require("../../lib/package/TruthTable.js"),
      test = function(exp, assertion) {
        it(`${exp} should be ${assertion}`, function() {
          var tt = new TruthTable(exp);

          assert.equal(
            tt.getEvaluation(),
            assertion,
            JSON.stringify({
              truthTable: tt,
              evaluation: tt.evaluation
            })
          );
        });
      };

describe("TruthTable VarComps", function() {

  test("b=c", "valid");
  test("b!=c", "valid");
  test("b!=b", "absurdity");
  test("true and b!=c", "valid");
  test("b=c and d=e", "valid");
  test("(b=c) and (d=e)", "valid");
  test("(a = b OR c=d) AND a!=b AND c!=d", "absurdity");
  test("b and b", "valid");
  test("(b and b)", "valid");
  test("((b and b))", "valid");
  test("((b) and (b))", "valid");
  test("(b and !b)", "absurdity");
  test("((b and !b))", "absurdity");
  test("((b) and (!b))", "absurdity");
  test("((b) and !(b))", "absurdity");
  test("b and !b", "absurdity");
  test('request.verb="POST" and request.verb!="POST"', "absurdity");

});
