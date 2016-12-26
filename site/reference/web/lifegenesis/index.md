---
title: Lifegenesis
js: /js/es5-shim.js /js/jquery-1.9.1.min.js lifegenesis.js
css: lifegenesis.css
summary: Conway's game of cellular automata, animated by using JavaScript to swap CSS classes.  Random splatters assist in keeping things interesting.
---

This is a display based on Conway's game of life / cellular automata.  It has very simple rules.  Start with a board.  Then check each area.  If the area has no current cell and there are three or more adjacent cells, a new cell is created.  If the area has a cell and less than two or more than three adjacent living cells, it dies (starvation / overpopulation).

This page starts with a smiley face and starts the process.  You can see where new cells are created, when they die, etc.  Every few seconds a blob of some sort is splattered onto the game board.  This should shake things up by knocking around living stable structures and creating more nodes for living clusters.

It also demonstrates how to use JavaScript to swap out images and create animation of some sort.

<table width=100%>
    <tr>
        <td width=25%>
            <div class="cell state0"></div> &larr; Empty
        </td>
        <td width=25%>
            <div class="cell state1"></div> &larr; New Cell
        </td>
        <td width=25%>
            <div class="cell state2"></div> &larr; Living Cell
        </td>
        <td width=25%>
            <div class="cell state3"></div> &larr; Dying Cell
        </td>
    </tr>
</table>

<div class="lifegenesis"></div>
