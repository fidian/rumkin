---
title: Pigpen
summary: Old substitution cipher, said to be used by Hebrew rabbis and the Knights Templar.
code: true
css:
    - index.css
js:
    - ../rumkin-cipher.js
    - pigpen-module.js
components:
    - className: module
      component: Pigpen
---

Pigpen places letters in  "#" and "X" diagrams, then uses the nearby lines and dots as the symbol for the encoded letter. This comes in two main varieties.

<div class="D(f) Fxw(w)">
<div class="D(f) Fxd(c) Mx(a) Jc(c) Ai(c) W(45%) W(90%)--s">
Original Version<br />
<svg viewbox="0 0 200 200" width="100%">
<style>
.l {
    stroke: black;
    stroke-width: 3px;
    stroke-linecap: round;
}
.t {
    font-size: 1em;
    fill: black;
    text-anchor: middle;
    alignment-baseline: middle;
}
</style>
<line x1="33" y1="2" x2="33" y2="96" class="l" />
<line x1="67" y1="2" x2="67" y2="96" class="l" />
<line x1="2" y1="33" x2="96" y2="33" class="l" />
<line x1="2" y1="67" x2="96" y2="67" class="l" />
<text x="14" y="14" class="t">A</text>
<text x="50" y="14" class="t">B</text>
<text x="86" y="14" class="t">C</text>
<text x="14" y="50" class="t">D</text>
<text x="50" y="50" class="t">E</text>
<text x="86" y="50" class="t">F</text>
<text x="14" y="86" class="t">G</text>
<text x="50" y="86" class="t">H</text>
<text x="86" y="86" class="t">I</text>

<line x1="133" y1="2" x2="133" y2="96" class="l" />
<line x1="167" y1="2" x2="167" y2="96" class="l" />
<line x1="104" y1="33" x2="198" y2="33" class="l" />
<line x1="104" y1="67" x2="198" y2="67" class="l" />
<circle cx="123" cy="23" r="3" />
<circle cx="150" cy="23" r="3" />
<circle cx="177" cy="23" r="3" />
<circle cx="123" cy="50" r="3" />
<circle cx="150" cy="50" r="3" />
<circle cx="177" cy="50" r="3" />
<circle cx="123" cy="77" r="3" />
<circle cx="150" cy="77" r="3" />
<circle cx="177" cy="77" r="3" />
<text x="111" y="10" class="t">J</text>
<text x="150" y="10" class="t">K</text>
<text x="190" y="10" class="t">L</text>
<text x="111" y="50" class="t">M</text>
<text x="158" y="45" class="t">N</text>
<text x="190" y="50" class="t">O</text>
<text x="111" y="90" class="t">P</text>
<text x="150" y="90" class="t">Q</text>
<text x="190" y="90" class="t">R</text>

<line x1="22" y1="122" x2="78" y2="178" class="l" />
<line x1="78" y1="122" x2="22" y2="178" class="l" />
<text x="50" y="130" class="t">S</text>
<text x="30" y="150" class="t">T</text>
<text x="70" y="150" class="t">U</text>
<text x="50" y="170" class="t">V</text>

<line x1="122" y1="122" x2="178" y2="178" class="l" />
<line x1="178" y1="122" x2="122" y2="178" class="l" />
<circle cx="150" cy="130" r="3" />
<circle cx="150" cy="170" r="3" />
<circle cx="130" cy="150" r="3" />
<circle cx="170" cy="150" r="3" />
<text x="160" y="120" class="t">W</text>
<text x="120" y="160" class="t">X</text>
<text x="180" y="140" class="t">Y</text>
<text x="140" y="180" class="t">Z</text>
</svg>
</div>
<div class="D(f) Fxd(c) Mx(a) Jc(c) Ai(c) W(45%) W(90%)--s">
Modified Version<br />
<svg viewbox="0 0 200 200" width="100%">
<style>
.l {
    stroke: black;
    stroke-width: 3px;
    stroke-linecap: round;
}
.t {
    font-size: 1em;
    fill: black;
    text-anchor: middle;
    alignment-baseline: middle;
}
</style>
<line x1="33" y1="2" x2="33" y2="96" class="l" />
<line x1="67" y1="2" x2="67" y2="96" class="l" />
<line x1="2" y1="33" x2="96" y2="33" class="l" />
<line x1="2" y1="67" x2="96" y2="67" class="l" />
<text x="14" y="14" class="t">A</text>
<text x="50" y="14" class="t">B</text>
<text x="86" y="14" class="t">C</text>
<text x="14" y="50" class="t">D</text>
<text x="50" y="50" class="t">E</text>
<text x="86" y="50" class="t">F</text>
<text x="14" y="86" class="t">G</text>
<text x="50" y="86" class="t">H</text>
<text x="86" y="86" class="t">I</text>

<line x1="133" y1="2" x2="133" y2="96" class="l" />
<line x1="167" y1="2" x2="167" y2="96" class="l" />
<line x1="104" y1="33" x2="198" y2="33" class="l" />
<line x1="104" y1="67" x2="198" y2="67" class="l" />
<circle cx="123" cy="23" r="3" />
<circle cx="150" cy="23" r="3" />
<circle cx="177" cy="23" r="3" />
<circle cx="123" cy="50" r="3" />
<circle cx="150" cy="50" r="3" />
<circle cx="177" cy="50" r="3" />
<circle cx="123" cy="77" r="3" />
<circle cx="150" cy="77" r="3" />
<circle cx="177" cy="77" r="3" />
<text x="111" y="10" class="t">N</text>
<text x="150" y="10" class="t">O</text>
<text x="190" y="10" class="t">P</text>
<text x="111" y="50" class="t">Q</text>
<text x="158" y="45" class="t">R</text>
<text x="190" y="50" class="t">S</text>
<text x="111" y="90" class="t">T</text>
<text x="150" y="90" class="t">U</text>
<text x="190" y="90" class="t">V</text>

<line x1="22" y1="122" x2="78" y2="178" class="l" />
<line x1="78" y1="122" x2="22" y2="178" class="l" />
<text x="50" y="130" class="t">J</text>
<text x="30" y="150" class="t">K</text>
<text x="70" y="150" class="t">L</text>
<text x="50" y="170" class="t">M</text>

<line x1="122" y1="122" x2="178" y2="178" class="l" />
<line x1="178" y1="122" x2="122" y2="178" class="l" />
<circle cx="150" cy="130" r="3" />
<circle cx="150" cy="170" r="3" />
<circle cx="130" cy="150" r="3" />
<circle cx="170" cy="150" r="3" />
<text x="160" y="120" class="t">W</text>
<text x="120" y="160" class="t">X</text>
<text x="180" y="140" class="t">Y</text>
<text x="140" y="180" class="t">Z</text>
</svg>
</div>
</div>

<div class="module"></div>
