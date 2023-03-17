////////////////////////////////////////////////////////////////////////////////
/////                        THE TURBO ENTABULATOR
/////                by Andrew Somers and unknown other people
/////                           APGL v3 License
/////           copyright © 2023 Inclusive Reading Technologies
/////                      https://www.readtech.org/
////////////////////////////////////////////////////////////////////////////////
/////    Notes: tab name is appended to the URL as a parameter,
/////           this allows the use of hash locators in addition.
/////    URL   www.example.com/index.html?tn=tab1#id-locator
/////    HTML  <a id="t-one" aria-controls="tab1" role="tab">One</a>
/////    <div id="pan-one" aria-labelledby="t-one" role="tabpanel">Content</div>
/////    This needs tabs.css to work properly.
////////////////////////////////////////////////////////////////////////////////


(function () {
  let tablist = document.querySelectorAll('[role="tablist"]')[0];
  let tabs, panels;
  let urlParams = new URLSearchParams(window.location.search);
  let ahash = window.location.hash;
  let tabName = null;
  let tabNameArray = [];
  let tabSelect = defaultTab = 0; // default tab if no parameters sent


//////////          INITIALIZE          ////////////////////////////////////////

  generateArrays();

  function generateArrays () {
    tabs = document.querySelectorAll('[role="tab"]');
    panels = document.querySelectorAll('[role="tabpanel"]');
  }

  const tabLen = tabs.length;

    // Bind listeners
  for (let i = 0; i < tabLen; ++i) { addListeners(i); }

  function addListeners (index) {
    tabs[index].addEventListener('click', clickEventListener);
    tabs[index].addEventListener('keydown', keydownEventListener);
    tabs[index].addEventListener('keyup', keyupEventListener);

      // Build an array with all tabs (<button>s) in it
    tabs[index].index = index;
      // Build an array with all tabs names in it
    tabNameArray[index] = tabs[index].getAttribute('aria-controls');
  }

      // tn is tab name,   ts is tab select number
	if (urlParams.has('tn')) {
               // strip junk and make a clean string (replace unmatched)
              // This retains only alphanumeric and hyphen
    tabName = urlParams.get('tn').replace(/[^a-zA-Z0-9-]/g,'');
    tabName = tabName.toLowerCase();   // enforce lowercase
    tabSelect = tabNameArray.indexOf(tabName);
    
    if (tabSelect < 0) {
      tabSelect = defaultTab; //default tab
      tabName = tabNameArray[tabSelect];
      urlParams.delete('tn');
      ahash = '';
    }
	} else if (urlParams.has('ts')) { // Numbered tabs start at 0
			tabSelect = Math.max(0, Math.min(tabLen - 1, parseInt(urlParams.get('ts'),10)));
	} 


//////////            PAGE LOAD AND MOUSE CONTROL          /////////////////////

  activateTab(tabs[tabSelect], false, false); // page load tab activate
  
    // When a tab is clicked, activateTab() is fired to activate it
  function clickEventListener (event) {
    let tab = event.target;
    activateTab(tab, false);
  }


//////////          KEYS          //////////////////////////////////////////////

    // Objects for reference
  let keys = {
    end:35,home:36,left:37,up:38,right:39,down:40,delete:46,enter:13,space:32 };
    // Add or subtract depending on key pressed
  let direction = { 37: -1,38: -1,39: 1,40: 1 };


    // Handle keydown on tabs
  function keydownEventListener (event) {
    let key = event.keyCode;

    switch (key) {
      case keys.end:
        event.preventDefault();
          // Activate last tab
        focusLastTab();
        break;
      case keys.home:
        event.preventDefault();
          // Activate first tab
        focusFirstTab();
        break;
         // Up and down are in keydown
        // because we need to prevent page scroll
      case keys.up:
      case keys.down:
        determineOrientation(event);
        break;
    }
  }

    // Handle keyup on tabs
  function keyupEventListener (event) {
    let key = event.keyCode;

    switch (key) {
      case keys.left:
      case keys.right:
        determineOrientation(event);
        break;
      case keys.delete:
        determineDeletable(event);
        break;
      case keys.enter:
      case keys.space:
        activateTab(event.target);
        break;
    }
  }

      // When a tablist’s aria-orientation is set to vertical,
     // only up and down arrow should function.
    // In all other cases only left and right arrow function.
  function determineOrientation (event) {
    let key = event.keyCode;
    let vertical = tablist.getAttribute('aria-orientation') == 'vertical';
    let proceed = false;

    if (vertical) {
      if (key === keys.up || key === keys.down) {
        event.preventDefault();
        proceed = true;
      }
    } else {
      if (key === keys.left || key === keys.right) { proceed = true; }
    }
    if (proceed) { switchTabOnArrowPress(event); }
  }

     // Either focus the next, previous, first, or last tab
    // depending on key pressed
  function switchTabOnArrowPress (event) {
    let pressed = event.keyCode;

    if (direction[pressed]) {
      let target = event.target;
      if (target.index !== undefined) {
        if (tabs[target.index + direction[pressed]]) {
          tabs[target.index + direction[pressed]].focus();
        }
        else if (pressed === keys.left||pressed === keys.up){focusLastTab();}
        else if (pressed === keys.right||pressed == keys.down){focusFirstTab();}
      }
    }
  }

////////////////////////////////////////////////////////////////////////////////
//////////          TAB ACTIVATION             \////////////////////////////////
/////////                                       \///////////////////////////////

    // Activates any given tab panel
  function activateTab (tab,setFocus=true,clearHash=true) {

      // Deactivate all other tabs
    deactivateTabs();
      // Remove tabindex attribute
    tab.removeAttribute('tabindex');
      // Set the tab as selected
    tab.setAttribute('aria-selected', 'true');
      // Get the value of aria-controls (which is an ID)
    tabName = tab.getAttribute('aria-controls');
      // Remove is-hidden class from tab panel to make it visible
    document.getElementById(tabName).classList.remove('is-hidden');

      // Set focus when required
    if (setFocus) { tab.focus(); }
      // clear #ID locator when tab is changed
    if (clearHash) { ahash = ''; }
    
    tabSelect = tab.index;

      // Update URI seek
    urlParams.delete('ts');         // clean numeric indicator out of the params
    urlParams.set('tn', tabName);  // set the current tab name and the param
//  urlParams.set('ts', tabSelect);// set the current tab number option
    window.history.replaceState({},'',`${location.pathname}?${urlParams}${ahash}`);
  }

////////\                                    ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


//////////          DELETE OR FOCUS          ///////////////////////////////////

    // Deactivate all tabs and tab panels
  function deactivateTabs () {
    for (let t = 0; t < tabLen; t++) {
      tabs[t].setAttribute('tabindex', '-1');
      tabs[t].setAttribute('aria-selected', 'false');
    }
    for (let p = 0; p < panels.length; p++) {
      panels[p].classList.add('is-hidden');
    }
  }


    // Make a guess
  function focusFirstTab () { tabs[0].focus(); }

    // Make a guess
  function focusLastTab () { tabs[tabLen - 1].focus(); }

    // Detect if a tab is deletable
  function determineDeletable (event) {
    target = event.target;
    if (target.getAttribute('data-deletable') !== null) {
        // Delete target tab
      deleteTab(event, target);
        // Update arrays related to tabs widget
      generateArrays();
        // Activate the closest tab to the one that was just deleted
      if (target.index - 1 < 0) { activateTab(tabs[0]); }
      else { activateTab(tabs[target.index - 1]); }
    }
  }

    // Deletes a tab and its panel
  function deleteTab (event) {
    let target = event.target;
    let panel = document.getElementById(target.getAttribute('aria-controls'));

    target.parentElement.removeChild(target);
    panel.parentElement.removeChild(panel);
  }

     // Determine whether there should be a delay
    // when user navigates with the arrow keys
  function determineDelay () {
    let hasDelay = tablist.hasAttribute('data-delay');
    let delay = 0;
    if (hasDelay) {
      let delayValue = tablist.getAttribute('data-delay');
      if (delayValue) { delay = delayValue; }
      else { delay = 300; } // If no value is specified, default to 300ms
    }
    return delay;
  }




////////////////////////////////////////////////////////////////////////////////
//////////             experiments             \////////////////////////////////
/////////                                       \///////////////////////////////

// console.log(ahash +" x "+ tabLen +" "+ tabSelect +" "+ urlParams); 

//console.log(111 +" "+ tabNameArray.indexOf(tabName) +" "+ tabSelect +" "+ urlParams);
//console.log(ahash);

//  window.addEventListener('load', bodyLoad);
//  function bodyLoad () {
//    activateTab(tabs[tabSelect], false, false);
//  }


//if (tabSelect != urlParams.get('ts')) {
//	  deactivateTabs();
//	  activateTab(tabs[tabSelect], true); // default to first tab if no hash exists
   // window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
//}

	/*
	if (state != tabSelect) {
	  $this=>deactivateTabs();
	  $this=>activateTab(tabs[tabSelect], true);
	} 
	else {
	  deactivateTabs();
	  activateTab(tabs[0], true); // default to first tab if no hash exists
	}
*/

/*
	if (window.location.hash) {
	  $this=>deactivateTabs();
	  $this=>activateTab(window.location.hash, true);
	} else {
	  deactivateTabs();
	  activateTab(tabs[0], true); // default to first tab if no hash exists
	}
*/

}());


