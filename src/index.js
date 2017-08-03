'use strict'

const backstop = require('backstopjs');
const glob = require("glob")
const renameExtension = require('rename-extension')

const generateConfig = function(pattern, url, cwd){

	/*
		Set up some variables
	*/

	var paths = glob.sync(pattern, {cwd} );

	const scenarios = paths.map((filePath) => {

		const newPath = renameExtension(filePath, '.html')

		return {
			"label": filePath,
			"url": url + newPath,
			"hideSelectors": [],
			"removeSelectors": [],
			"selectors": ['document'],
			"readyEvent": null,
			"delay": 3000,
			"misMatchThreshold" : 0.1
		}

	})

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
		test   : (pattern, url, cwd) => backstop('test', { config: generateConfig(pattern, url, cwd) }),
		approve   : (pattern, url, cwd) => backstop('approve', { config: generateConfig(pattern, url, cwd) }),
}