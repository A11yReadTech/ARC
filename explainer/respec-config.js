var respecConfig = {
	// embed RDFa data in the output
	trace: true,
	doRDFa: '1.1',
	includePermalinks: true,
	permalinkEdge: true,
	permalinkHide: false,
	// specification status (e.g., WD, LC, NOTE, etc.). If in doubt use ED.
	specStatus: "ED",
	//crEnd:                "2023-06-01",
	//perEnd:               "2023-06-01",
	//publishDate:          "2023-06-01",
	
	// the short name, as in https://www.readtech.org/apcaexplainer/
	shortName: "apcaexplainer",
	
	
	// if you wish the publication date to be other than today, set this
	// publishDate:  "2009-08-06",
	copyrightStart: "2020",
	license: "",
	
	// link if there a publicly available draft
	edDraftURI: "https://AccessibleReadingTechnologies.github.io/APCAguidelines/explainer/",
	
	// editors, add as many as you like
	// only "name" is required
	editors:[ {
		name: "Andrew Somers",
		mailto: "perceptex@myndex.com",
		company: "ART",
		companyURI: "https://www.readtech.org/",
	}],

	// authors, add as many as you like.
	// This is optional, uncomment if you have authors as well as editors.
	// only "name" is required. Same format as editors.

	authors:[ {
		name: "Andrew Somers",
		mailto: "perceptex@myndex.com",
		company: "ART",
		companyURI: "https://www.readtech.org/",
	}],

/*
	alternateFormats: [
	{ uri: 'aria-diff.html', label: "Diff from Previous Recommendation" } ,
	{ uri: 'aria.ps', label: "PostScript version" },
	{ uri: 'aria.pdf', label: "PDF version" }
	],
*/

	group: "read",
	github: "AccessibleReadingTechnologies/APCAguidelines",

	maxTocLevel: 4,
	
	//preProcess: [preRespec],
	
	localBiblio: {
		"508-criteria": {
			"title": "Section 508 Functional Performance Criteria",
			"publisher": "United States Access Board",
			"date": "8 December 2011",
			"href": "https://www.access-board.gov/ict/#chapter-3-functional-performance-criteria"
		},
		"en-301-549": {
			"title": "Accessibility requirements suitable for public procurement of ICT products and services in Europe",
			"publisher": "European Telecommunications Standards Institute",
			"date": "February 2014",
			"href": "https://www.etsi.org/deliver/etsi_tr/101500_101599/101550/01.01.01_60/tr_101550v010101p.pdf"
		}
	}
};
