<p>The most likely reason that the size of the file downloaded doesn't match
what you uploaded is because the uploader will <?PHP echo FAQLink('resize',
'resize images') ?> automatically.  If that's not the issue, the next most
probable answer is that the uploaded file was sent incorrectly or that the
file is corrupt.</p>

<p>As of October, 2005, Sprint and Nextel merged.  Some of the gateways are
now recompressing images to make them transmit faster to phones.  If you are
getting a size mismatched error on an image that you are trying to download
as a wallpaper, you must add the HTTP Cache-control header "no-transform".
This is a server-based fix, and search your web server documentation for how
to add custom headers for files that are sent to mobile phones.</p>
