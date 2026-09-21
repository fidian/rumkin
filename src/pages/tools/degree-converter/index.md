---
title: Degree Converter
summary: Change degrees (like bearings or azimuths) between several formats.
js:
    - converter-module.js
components:
    - className: module
      component: Converter
---

This degree converter will let you change your latitude and longitude values between degrees (D); degrees and minutes (DM); and degrees, minutes, seconds (DMS). They are used for various different software packages and with a GPS.

The calculations are very simple and already exist on other web sites, but I decided to make my own so I could have it be small, fast, and feature-packed. Well, maybe not really feature-packed, but it does work surprisingly well.

<div class="module"></div>

Enter any format of number you wish. You can use any of the following (and more):

-   N45.12345
-   N 45 7.407
-   N45 7 24.42
-   45° 7' 24.42"
-   W 93.87654
-   -093 52.592
-   93 52.592W
