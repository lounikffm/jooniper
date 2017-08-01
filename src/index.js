'use strict'

const backstop = require('backstopjs');
const walkSync = require('walk-sync');

/*
	Set up some variables
*/

var scenarios = []; // The array that'll have the pages to test
var defaultPath = 'dist/components/'
var localhost = "http://localhost:3000/components/"
var paths = walkSync(defaultPath, { globs: ['**/[^_]*.html'] });

for (var k = 0; k < paths.length; k++) {
	scenarios.push({
		"label": paths[k],
		"url": localhost + paths[k],
		"hideSelectors": [],
		"removeSelectors": [],
		"selectors": ['document'],
		"readyEvent": null,
		"delay": 1000,
		"misMatchThreshold" : 0.1
	});
}

const config = {

	"id": "prod_test",
	"asyncCompareLimit": 5000,
	"asyncCaptureLimit": 10,
	"viewports": [
		{
			"name": "large",
			"width": 1920,
			"height": 1080
		},
		{
			"name": "large",
			"width": 375,
			"height": 667
		}
	],
	"scenarios":
	scenarios
	,
	"paths": {
		"bitmaps_reference": "backstop_data/bitmaps_reference",
		"bitmaps_test":      "backstop_data/bitmaps_test",
		"casper_scripts":    "backstop_data/engine_scripts",
		"html_report":       "backstop_data/html_report",
		"ci_report":         "backstop_data/ci_report"
	},
	"casperFlags": [],
	"engine": "chrome",
	"report": ["browser"],
	"debug": false

};

backstop('test', { config });