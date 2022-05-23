"use strict";

module.exports = {
    title: "None",
    description: "Just shows the message.  Nothing fancy.",
    method: function(text, writer, whenDone) {
        if (writer(text)) {
            return;
        }

        whenDone();
    }
};
