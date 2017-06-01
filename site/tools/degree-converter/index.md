---
title: Degree Converter
module: degreeConverter
js:
    - degree-converter.js
---

This degree converter will let you change your latitude and longitude values between degrees (D); degrees and minutes (DM); and degrees, minutes, seconds (DMS).  They are used for various different software packages and with a GPS.

The calculations are very simple and already exist on other web sites, but I decided to make my own so I could have it be small, fast, and feature-packed. Well, maybe not really feature-packed, but it does work surprisingly well.

<div degree-converter>
    <p>
        Enter the value here: <input ng-model="in">
    </p>
    <p ng-if="in">
        Degrees: <span ng-bind="df | number:6"></span><br>
        Degrees Minutes: <span ng-bind="d"></span>° <span ng-bind="mf | number:3"></span>'<br>
        Degrees Minutes Seconds: <span ng-bind="d"></span>° <span ng-bind="m"></span>' <span ng-bind="sf | number:2"></span>"
    </p>
</div>

Enter any format of number you wish. You can use any of the following (and more):

* N45.12345
* N 45 12.345
* N45 12 34.5
* 45° 12' 34.56"
* W 93.87654
* -093 87.654
* 93 98.654W
