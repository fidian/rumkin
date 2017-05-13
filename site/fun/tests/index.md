---
title: Personality Tests
js:
    - ../../js/marked.min.js
    - ../../js/angular-marked.min.js
    - personality-tests.js
module: personalityTests
controller: personalityTestsController
---

<div ng-if="!test">
    <p>
        These personality tests are designed only to amuse and potentially provide insight into your mind.  The results may not be 100% accurate, but if they bring a smile to your face, then they did their job.  If you know of more tests like this that you would like to see here, email them to me!
    </p>
    <ul>
        <li><a ng-click="showTest('candybar')" href="#">What candy bar are you?</a></li>
        <li><a ng-click="showTest('iq-test')" href="#">How smart are you?</a></li>
        <li><a ng-click="showTest('love')" href="#">Your opinions about marriage and your significant other.</a></li>
        <li><a ng-click="showTest('priorities')" href="#">How do you rank different priorities?</a></li>
        <li><a ng-click="showTest('world-leader')" href="#">Pick the next world leader.</a></li>
    </ul>
    <p>
        Don't worry. You aren't graded and I don't collect any information from you.
    </p>
</div>

<div ng-if="test">
    <a href="#" ng-click="showTest()">Back to the list of tests.</a>
</div>

<div ng-if="test && test.isLoading">
    Loading the test ...
</div>

<div ng-if="test && test.isError">
    Error with test:  <span ng-bind="test.error"></span>
</div>

<div ng-if="test" marked="'# ' + test.title">
</div>

<div ng-repeat="question in test.questions">
    <div marked="question.text"></div>
    <div ng-if="!question.answer">
        <ul ng-repeat="(key, answer) in question.answers">
            <li>
                <a href="#" ng-click="question.answer = key" marked="key" href="#"></a>
            </li>
        </ul>
    </div>
    <div ng-if="question.answer">
        <div ng-if="question.answerText">
            <em marked="question.answerText"></em>
        </div>
        <div>
            <strong marked="question.answer + ': ' + question.answers[question.answer]"></strong>
        </div>
        <div>
            <a href="#" ng-click="question.answer = null">Reset?</a>
        </div>
    </div>
</div>
