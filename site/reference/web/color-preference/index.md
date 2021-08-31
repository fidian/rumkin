---
title: Color Preference
summary: Detect a light or dark theme using just CSS
css: color-preference.css
---

<div class="D(f) Ai(c) C(blue) C(#eee)--csd C(#333)--csl C(i)--p Bgc(gray) Bgc(#333)--csd Bgc(#eee)--csl Bgc(t)--p P(2em)">
<div class="D(f) Ta(c) label Fz(3em)">Color Scheme:&nbsp;</div>
</div>

This page is using only CSS in order to detect the browser's preference for a color scheme. This is accomplished using media queries.

```
@media (prefers-color-scheme: light) {
    // Add CSS here
}

@media (prefers-color-scheme: dark) {
    // Add CSS here
}
```

For example, you could look at the CSS that is used to add the "Light" or "Dark" word into the HTML: [`color-preference.css`](color-preference.css).
