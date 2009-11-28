var LinkHelper = {
	init: function() {
		var anchors = document.getElementsByTagName('a');

		for (var x=0; x<anchors.length; x++) {
			if (anchors[x].href.indexOf('mailto') != -1) {
				anchors[x].className += ' email';
			} else if (anchors[x].href.indexOf('.pdf') != -1) {
				anchors[x].className += ' pdf';
			} else if (anchors[x].href.indexOf('.swf') != -1) {
				anchors[x].className += ' swf';
			} else if (anchors[x].href.indexOf('.png') != -1 || anchors[x].href.indexOf('.gif') != -1 || anchors[x].href.indexOf('.jpg') != -1) {
				anchors[x].className += ' img';
			} else if (anchors[x].href.indexOf('http://') != -1) {
				anchors[x].className += ' external';
			}
		}
	}
}