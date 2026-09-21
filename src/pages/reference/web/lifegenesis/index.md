---
title: Lifegenesis
js:
    - lifegenesis-module.js
css:
    - lifegenesis.css
components:
    -
        className: module
        component: LifegenesisBoard
summary: Conway's game of cellular automata, animated by using JavaScript to swap CSS classes.  Random splatters assist in keeping things interesting.
---

This is a display based on Conway's game of life / cellular automata.  It has very simple rules.  Start with a board.  Then check each area.  If the area has no current cell and there are three or more adjacent cells, a new cell is created.  If the area has a cell and less than two or more than three adjacent living cells, it dies (starvation / overpopulation).

This page starts with a smile in the center and random blobs everywhere else.  You can see where new cells are created, when they die, etc.  Every few seconds a blob of some sort is splattered onto the game board.  This should shake things up by knocking around living stable structures and creating more nodes for living clusters.

<div class="module Jc(c)"></div>

<table>
    <tr>
        <td width=25%>
            <div class="cell cell-fixed state0"></div> Empty
        </td>
        <td width=25%>
            <div class="cell cell-fixed state1"></div> New Cell
        </td>
        <td width=25%>
            <div class="cell cell-fixed state2"></div> Living Cell
        </td>
        <td width=25%>
            <div class="cell cell-fixed state3"></div> Dying Cell
        </td>
    </tr>
</table>
