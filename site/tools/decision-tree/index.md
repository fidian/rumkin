---
title: Decision Tree
summary: Demonstration of a decision tree that can help navigate through a problem to find a solution.
js:
    - decision-tree-module.js
routes:
    - path: /
      component: DecisionTree
    - path: /:treeName
      component: DecisionTree
    - path: /:treeName/:id
      component: DecisionTree
---

<div ng-if="!tree">
    <p>
        Decision trees are useful ways to categorize items, solve problems, and classify data.  With a series of questions, you can narrow down possibilities very quickly.
    </p>
    <p>
        This is a quick implementation of decision trees in JavaScript so that I could write a problem solving tree for people having issues playing Diablo II or having problems with my phone uploader.
</div>

<div class="module"></div>
