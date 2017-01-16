---
title: Decision Tree
js:
    - ../../js/marked.js
    - ../../js/modules/angular-marked.js
    - decision-tree.js
module: decisionTree
controller: decisionTreeController
---

<div ng-if="!tree">
    <p>
        Decision trees are useful ways to categorize items, solve problems, and classify data.  With a series of questions, you can narrow down possibilities very quickly.
    </p>
    <p>
        This is a quick implementation of decision trees in JavaScript so that I could write a problem solving tree for people having issues playing <a ng-click="showTree('diablo-ii')" href="">Diablo II</a> or having problems with my <a ng-click="showTree('uploader')" href="">phone uploader</a>.
    </p>
    <p>
        Go ahead, give one of those problem solvers a try!
    </p>
</div>

<div ng-if="tree && tree.isLoading">
    Loading ...
</div>

<div ng-if="tree && tree.isError">
    Error with tree:  <span ng-bind="tree.error"></span>
</div>

<div ng-if="tree" marked="'# ' + tree.title">
</div>

<div ng-if="question">
    <div marked="question.text">
    </div>
    <div ng-repeat="(key, answer) in question.answers">
        <a ng-href="'?tree=' + tree.name + '&q=' + key" ng-click="selectAnswer(key)" marked="answer"></a>
    </div>
</div>

