var respecConfig = {
	// embed RDFa data in the output
	trace: true,
	doRDFa: '1.1',
	includePermalinks: true,
	permalinkEdge: true,
	permalinkHide: false,
	// specification status (e.g., WD, LC, NOTE, etc.). If in doubt use ED.
	specStatus: "ED",
	noRecTrack: true,
	//crEnd:                "2012-04-30",
	//perEnd:               "2013-07-23",
	//publishDate:          "2013-08-22",
	diffTool: "http://www.aptest.com/standards/htmldiff/htmldiff.pl",
	
	// the specifications short name, as in https://www.w3.org/TR/short-name/
	shortName: "apcarequirements",
	
	
	// if you wish the publication date to be other than today, set this
	// publishDate:  "2009-08-06",
	copyrightStart: "2020",
	license: "",
	
	// if there a publicly available Editors Draft, this is the link
	edDraftURI: "https://AccessibleReadingTechnologies/APCAguidelines/requirements/",
	
	// if this is a LCWD, uncomment and set the end of its review period
	// lcEnd: "2012-02-21",
		
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
	
	// errata: 'https://www.w3.org/2010/02/rdfa/errata.html',
	
	group: "read",
	github: "AccessibleReadingTechnologies/APCAguidelines/",

	maxTocLevel: 4,
	
	//localBiblio: biblio,
};
