"use strict";

module.exports = {
    title: "None",
    description: "Just removes the message.  Nothing fancy.",
    method: function(text, writer, whenDone) {
        if (writer("")) {
            return;
        }

        whenDone();
    }
};
