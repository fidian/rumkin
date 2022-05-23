---
title: Atomic CSS
summary: A CSS technique to make maintainable, uncomplicated CSS. Blends together many other ideas in a controversial way, but ends up with much simpler rules in the end. Works on a wide variety of site sizes from a landing page to an enterprise's online shopping site, from a giant single page application to static pages.
---

Every web developer's dream is to have CSS that is all of the following.

* __Maintainable__ - I should be able to change colors and padding easily
* __Readable__ - Simpler classes, uncomplicated rules
* __Immediately understandable__ - Easy concepts to understand and learning curves cause problems
* __Consistent across browsers__ - Including different versions of the same browsers
* __Responsive__ - Changing to screen size, media, and more
* __Able to be themed__ - Especially when the design team says to change all disclaimer text
* __Sturdy__ - Do not couple to the HTML structure to avoid brittleness
* __Reusable__ - When is the last time you reused any CSS?

It might surprise you, but ...


You Can Achieve This!
---------------------

It sounds too good to be true, right?

By combining a set of techniques for managing CSS, you can completely transform how you approach this problem of styling web pages.  Instead of wanting to run away you will think that keeping this site up to date is easy.

You can also incrementally add this to your existing site.

You also are __not__ required to use a preprocessor such as [Sass] and [Less].  They are fantastic and I encourage their use, but no tools are not necessary to use this technique. It is extremely helpful to use something like [atomizer] to build the Atomic CSS for you, but it isn't strictly needed.


Getting Started
--------------

Be forewarned - this approach is controversial.  A good deal of it was introduced in a Smashing Magazine article about [Challenging CSS Best Practices] where Thierry discussed an atomic approach to CSS.  Initially you may shun this idea as well, but please continue to read through the examples, arguments, and ideas for improvement that are detailed here.

Ok, so how do you start? Well, first you get over the idea that CSS needs to be divorced from HTML. Purists believe that CSS is for presentation and HTML is for content, though it's obvious that with the number of `<div>` elements used everywhere for layout that this principle hasn't really been implemented successfully anywhere. If you want to really divorce things, I would use HTML and CSS (well, Atomic CSS) as presentation and use Markdown for the content. A build system would convert the content and wrap it in templates. Life would be good - and it is for the projects I manage this way.

The second thing you need to get over is specifying lots of little classes on an element is okay. To illustrate this, here's a sample.

```
<div class="Pos(a) T(0) Start(0) End(0) D(f) Jc(c) Ai(c) H(3em)">
    This is a banner at the top of the screen.
</div>
```

Notice that the `class` property on the one `<div>` element has a bunch of classes. This type of notation is picked up by the Atomizer tool so I don't need to generate CSS. You don't need to follow the same convention, but a similar one would be useful. The generated CSS for this would look like the following:

```
.Ai\(c\) {
    align-items: center;
}

.D\(f\) {
    display: flex;
}

.End\(0\) {
    right: 0;
}

.H\(3em\) {
    height: 3em;
}

.Jc\(c\) {
    justify-content: center;
}

.Pos\(a\) {
    position: absolute;
}

.Start\(0\) {
    left: 0;
}

.T\(0\) {
    top: 0;
}
```

I bet once you looked at the first few rules that were listed, the rest seemed obvious. One can even specify pseudo-selectors and parent/child relationships, as well as specifying the ever-repulsive `!important` flag. Let's go through a couple of these that are special - `Start(0)` and `End(0)`. This is done on purpose with Atomizer in order to be able to flip the site from a left-to-right reading order into the reverse.


Downsides
---------

You'll feel weird adding *lots* of CSS classes to HTML elements. The good news is that it's easy to see what's duplicated and you won't ever have issues where the HTML structure changing causes CSS to not apply correctly.

The CSS file looks bad because it appears that it's highly redundant. In reality, it will likely be smaller than your normal CSS file because any property that is repeated will be listed once.

The HTML looks bloated. Yeah, not much I can do here, but the good news is with a build tool (Atomizer for the win!), you are able to only edit HTML and can completely skip CSS.

Specificity. Normally this is a good thing to have the selectors have a specificity of 0,0,1,0 but sometimes you need to override CSS from other libraries and this won't easily do that, but you can always turn `D(f)` into `D(f)!` to have the CSS rule append `!important` to it.

Coding tables and grids by hand will cause some Atomic CSS to be repeated.

The name is confusing - "Atomic CSS" is also the name of a different technique where CSS classes are broken down in to "atoms" and that technique isn't the same as this one.


Benefits
--------

When maintaining the HTML, you can more freely add/remove elements and understand that the CSS won't be impacted because none of your selectors look like `.grid .grid-line > .grid-cell` or other nonsense.

Compression. The CSS is extremely compressible and the extra classes added to the HTML are also repetitive. Both will be easy to compress and add almost no extra bandwidth.

Total number of CSS rules will go down for larger sites. This won't be visible on a single page, but really starts to shine for single page apps and complex sites.


Summary
-------

Nearly all of the sites that I write now won't include hand-written CSS. Everything uses this approach. I'm significantly happier, the amount of code transferred across the wire is smaller, the browser is responsive, and it provides everything that I want to use when styling web pages.

Give it a try.


[atomizer]: https://acss.io/guides/atomizer.html
[Challenging CSS Best Practices]: http://www.smashingmagazine.com/2013/10/21/challenging-css-best-practices-atomic-approach/
[Less]: http://lesscss.org/
[Sass]: http://sass-lang.com/
