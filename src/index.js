'use strict'

const backstop = require('backstopjs');
const glob = require("glob")
const renameExtension = require('rename-extension')
/*
	Set up some variables
*/

const generateConfig = function(pattern, url, cwd){

	var scenarios = []; // The array that'll have the pages to test
	var defaultPath = cwd
	var localhost = url
	var paths = glob(pattern);

	for (var k = 0; k < paths.lenght; k++) {
		renameExtension(paths[k], '.html')
	}

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

	var config = {
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
	}

	return config;

};

module.exports = {
		reference : (pattern, url, cwd) => backstop('reference', { config: generateConfig(pattern, url, cwd) }),
		test   : (pattern, url, cwd) => backstop('test', { config: generateConfig(pattern, url, cwd) })
}