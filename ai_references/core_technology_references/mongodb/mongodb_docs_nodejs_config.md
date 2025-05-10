.leafygreen-ui-15yuscm{font-size:13px;--breadcrumb-color:#5C6C75;}.dark-theme .leafygreen-ui-15yuscm{--breadcrumb-color:#C1C7C6;}.leafygreen-ui-15yuscm a,.leafygreen-ui-15yuscm span{color:var(--breadcrumb-color);}

.css-s5xdrg{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}

.leafygreen-ui-1krmy4z{overflow:hidden;white-space:nowrap;}.leafygreen-ui-1krmy4z:first-child{min-width:-webkit-max-content;min-width:-moz-max-content;min-width:max-content;}@media not all and (max-width: 480px){.leafygreen-ui-1krmy4z:last-child{min-width:-webkit-max-content;min-width:-moz-max-content;min-width:max-content;}}

.leafygreen-ui-4jme45{font-family:'Euclid Circular A','Helvetica Neue',Helvetica,Arial,sans-serif;display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-text-decoration:none;text-decoration:none;text-decoration-color:transparent;cursor:pointer;font-size:inherit;line-height:inherit;-webkit-appearance:none;-moz-appearance:none;-ms-appearance:none;appearance:none;background:none;border:none;padding:0;font-size:16px;line-height:28px;color:#016BF8;font-weight:400;display:inline;color:var(--link-color-primary);font-weight:var(--link-font-weight);font-size:13px;vertical-align:middle;line-height:unset;font-weight:400;}.leafygreen-ui-4jme45:hover,.leafygreen-ui-4jme45:focus{-webkit-text-decoration:underline;text-decoration:underline;-webkit-transition:text-decoration 150ms ease-in-out;transition:text-decoration 150ms ease-in-out;text-underline-offset:4px;text-decoration-thickness:2px;}.leafygreen-ui-4jme45:focus{outline:none;}.leafygreen-ui-4jme45:hover{text-decoration-color:#E8EDEB;}.leafygreen-ui-4jme45:focus{text-decoration-color:#016BF8;}.leafygreen-ui-4jme45:hover,.leafygreen-ui-4jme45:focus{-webkit-text-decoration:underline;text-decoration:underline;}[Docs Home](https://www.mongodb.com/docs/)

.css-yg5ozy{cursor:default;padding-left:8px;padding-right:8px;} /

[Languages](https://www.mongodb.com/docs/drivers/)

/

[Javascript](https://www.mongodb.com/docs/languages/javascript/)

/

.leafygreen-ui-yjiaca{-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;cursor:pointer;position:relative;-webkit-text-decoration:none;text-decoration:none;text-decoration-color:transparent;line-height:13px;color:var(--link-color-primary);font-weight:var(--link-font-weight);font-size:13px;vertical-align:middle;line-height:unset;font-weight:400;}.leafygreen-ui-yjiaca >code{color:var(--link-color-primary);font-weight:var(--link-font-weight);}.leafygreen-ui-yjiaca:focus,.leafygreen-ui-yjiaca:hover{text-decoration-line:underline;-webkit-transition:text-decoration 150ms ease-in-out;transition:text-decoration 150ms ease-in-out;text-underline-offset:4px;text-decoration-thickness:2px;}.leafygreen-ui-yjiaca:focus{text-decoration-color:#016BF8;outline:none;}.leafygreen-ui-yjiaca:hover{text-decoration-color:#E8EDEB;}.leafygreen-ui-yjiaca:hover,.leafygreen-ui-yjiaca:focus{-webkit-text-decoration:underline;text-decoration:underline;}[Node.js Driver](/docs/drivers/node/current/)

.leafygreen-ui-1qnjd6d{scroll-margin-top:85px;position:absolute;}

.leafygreen-ui-1nkfqbv{margin:unset;font-family:'Euclid Circular A','Helvetica Neue',Helvetica,Arial,sans-serif;color:#001E2B;font-size:32px;line-height:40px;font-weight:400;font-family:'MongoDB Value Serif','Times New Roman',serif;color:#00684A;margin-top:24px;margin-bottom:8px;color:var(--heading-color-primary);margin-top:16px;margin-bottom:24px;}

# Get Started with the Node.js Driver.leafygreen-ui-11mfcte{position:absolute;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;padding:0 10px;visibility:hidden;}[.leafygreen-ui-a30zj9{color:#889397;vertical-align:middle;margin-top:-2px;}.css-zena35{display:inline;left:0;top:0;margin-top:-85px;position:absolute;padding-bottom:2px;}@media only screen and (max-width: 767px){.css-zena35{margin-top:-85px;}}

](#get-started-with-the-node.js-driver "Permalink to this heading")

.leafygreen-ui-e8trgl{margin:unset;font-family:'Euclid Circular A','Helvetica Neue',Helvetica,Arial,sans-serif;color:#001E2B;font-size:24px;line-height:32px;font-weight:500;color:#001E2B;margin-top:24px;margin-bottom:8px;color:var(--font-color-primary);}

## Overview[

](#overview "Permalink to this heading")

.leafygreen-ui-1kp3ins{margin:unset;font-family:'Euclid Circular A','Helvetica Neue',Helvetica,Arial,sans-serif;color:#001E2B;font-size:16px;line-height:28px;color:#001E2B;font-weight:400;margin-bottom:16px;color:var(--font-color-primary);}.leafygreen-ui-1kp3ins strong,.leafygreen-ui-1kp3ins b{font-weight:700;}

This guide shows you how to create an application that uses the MongoDB Node.js driver to connect to a MongoDB cluster hosted on MongoDB Atlas. The Node.js driver is a library of functions that you can use to connect to and communicate with MongoDB.

.leafygreen-ui-13vw3ie{font-family:'Euclid Circular A','Helvetica Neue',Helvetica,Arial,sans-serif;color:#001E2B;-webkit-padding-start:12px;padding-inline-start:12px;position:relative;margin-top:24px;margin-bottom:24px;}.leafygreen-ui-13vw3ie:after{content:'';position:absolute;width:3px;top:0px;bottom:0px;left:0;border-radius:2px;background-color:#B45AF2;}.leafygreen-ui-13vw3ie p,.leafygreen-ui-13vw3ie li::marker{color:var(--font-color-primary);}.leafygreen-ui-13vw3ie p>a\[class^='leafy'\]{color:var(--link-color-primary);font-weight:var(--link-font-weight);}.leafygreen-ui-13vw3ie >li:last-of-type,.leafygreen-ui-13vw3ie >ul:last-of-type,.leafygreen-ui-13vw3ie >ol:last-of-type,.leafygreen-ui-13vw3ie >li:last-of-type>p,.leafygreen-ui-13vw3ie >p:last-of-type{margin-bottom:0px;}.leafygreen-ui-13vw3ie h2{color:#5E0C9E;}.leafygreen-ui-13vw3ie:after{background-color:#B45AF2;}.dark-theme .leafygreen-ui-13vw3ie h2{color:#F1D4FD;}

.leafygreen-ui-1fn4p2b{margin:unset;font-family:'Euclid Circular A','Helvetica Neue',Helvetica,Arial,sans-serif;color:#001E2B;font-size:12px;font-weight:700;text-transform:uppercase;line-height:20px;letter-spacing:0.4px;color:#001E2B;width:100%;margin-block-end:4px;color:#5E0C9E;}

## Tip

.leafygreen-ui-9mycqc{margin:unset;font-family:'Euclid Circular A','Helvetica Neue',Helvetica,Arial,sans-serif;color:#001E2B;font-size:16px;line-height:28px;color:#001E2B;font-weight:400;}.leafygreen-ui-9mycqc strong,.leafygreen-ui-9mycqc b{font-weight:700;}.leafygreen-ui-9mycqc a:not(.lg-ui-0001){font-family:'Euclid Circular A','Helvetica Neue',Helvetica,Arial,sans-serif;display:inline;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-text-decoration:none;text-decoration:none;text-decoration-color:transparent;cursor:pointer;font-size:inherit;line-height:inherit;-webkit-appearance:none;-moz-appearance:none;-ms-appearance:none;appearance:none;background:none;border:none;padding:0;color:#016BF8;font-weight:400;}.leafygreen-ui-9mycqc a:not(.lg-ui-0001):hover,.leafygreen-ui-9mycqc a:not(.lg-ui-0001)\[data-hover='true'\],.leafygreen-ui-9mycqc a:not(.lg-ui-0001):focus-visible,.leafygreen-ui-9mycqc a:not(.lg-ui-0001)\[data-focus='true'\]{-webkit-text-decoration:underline;text-decoration:underline;-webkit-transition:text-decoration 150ms ease-in-out;transition:text-decoration 150ms ease-in-out;text-underline-offset:4px;text-decoration-thickness:2px;}.leafygreen-ui-9mycqc a:not(.lg-ui-0001):focus{outline:none;}.leafygreen-ui-9mycqc a:not(.lg-ui-0001):hover,.leafygreen-ui-9mycqc a:not(.lg-ui-0001)\[data-hover='true'\]{text-decoration-color:#E8EDEB;}.leafygreen-ui-9mycqc a:not(.lg-ui-0001):focus-visible,.leafygreen-ui-9mycqc a:not(.lg-ui-0001)\[data-focus='true'\]{text-decoration-color:#016BF8;}

MongoDB Atlas is a fully managed cloud database service that hosts your MongoDB deployments. You can create your own free (no credit card required) MongoDB Atlas deployment by following the steps in this guide.

Follow the steps in this guide to connect a sample Node.js application to a MongoDB Atlas deployment. If you prefer to connect to MongoDB using a different driver or programming language, see our .leafygreen-ui-fgcsv5{font-family:'Euclid Circular A','Helvetica Neue',Helvetica,Arial,sans-serif;display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-text-decoration:none;text-decoration:none;text-decoration-color:transparent;cursor:pointer;font-size:inherit;line-height:inherit;-webkit-appearance:none;-moz-appearance:none;-ms-appearance:none;appearance:none;background:none;border:none;padding:0;font-size:16px;line-height:28px;color:#016BF8;font-weight:400;display:inline;color:var(--link-color-primary);font-weight:var(--link-font-weight);}.leafygreen-ui-fgcsv5:hover,.leafygreen-ui-fgcsv5:focus{-webkit-text-decoration:underline;text-decoration:underline;-webkit-transition:text-decoration 150ms ease-in-out;transition:text-decoration 150ms ease-in-out;text-underline-offset:4px;text-decoration-thickness:2px;}.leafygreen-ui-fgcsv5:focus{outline:none;}.leafygreen-ui-fgcsv5:hover{text-decoration-color:#E8EDEB;}.leafygreen-ui-fgcsv5:focus{text-decoration-color:#016BF8;}[list of official drivers.](https://www.mongodb.com/docs/drivers/)

## Download and Install[

](#download-and-install "Permalink to this heading")

{"@context":"https://schema.org","@type":"HowTo","steps":\[{"@type":"HowToStep","text":"Ensure you have the following dependencies installed in\\nyour development environment:Node.js v16.20.1 or laternpm (Node Package Manager)To learn how to install Node.js and npm, see\\nDownloading and installing Node.js and npm\\nin the npm documentation.","name":"Install dependencies"},{"@type":"HowToStep","text":"In your shell, run the following command to create a\\ndirectory called node\_quickstart for this project:Then, run the following commands to navigate into the\\ndirectory and initialize your Node.js project:When the initialization command successfully completes, you have a package.json\\nfile in your node\_quickstart directory.","name":"Create a project directory"},{"@type":"HowToStep","text":"Run the following command from your project directory to install\\nthe driver:This command performs the following actions:Downloads the mongodb package and the dependencies it requiresSaves the package in the node\_modules directoryRecords the dependency information in the package.json file","name":"Install the Node.js Driver"}\],"name":"Download and Install","image":"https://webimages.mongodb.com/\_com\_assets/cms/kuyj2focmkbxv7gh3-stacked\_default\_slate\_blue.svg?auto=format%252Ccompress"}.css-qum8nr{margin-top:16px;}.dark-theme .css-qum8nr{color:#E8EDEB;background-color:#001E2B;}@media only screen and (max-width: 1024px){.css-qum8nr{padding-bottom:32px;}}@media only screen and (max-width: 480px){.css-qum8nr{padding-bottom:24px;}}

.css-h7v3k4{position:relative;gap:33px;}.css-h7v3k4 h2,.css-h7v3k4 h3,.css-h7v3k4 h4{margin-top:4px;}.css-h7v3k4:not(:last-child):before{content:'';border-left:2px dashed #E8EDEB;bottom:0;left:16px;position:absolute;top:0;}.dark-theme .css-h7v3k4:not(:last-child):before{border-left-color:#5C6C75;}.css-vq8pj5{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:relative;gap:33px;}.css-vq8pj5 h2,.css-vq8pj5 h3,.css-vq8pj5 h4{margin-top:4px;}.css-vq8pj5:not(:last-child):before{content:'';border-left:2px dashed #E8EDEB;bottom:0;left:16px;position:absolute;top:0;}.dark-theme .css-vq8pj5:not(:last-child):before{border-left-color:#5C6C75;}

.css-18fui5z{position:relative;min-height:59px;}

.css-1r7ukzu{position:relative;font-weight:bold;background-color:#E3FCF7;color:#00684A;height:34px;width:34px;}.dark-theme .css-1r7ukzu{background-color:#00684A;color:#E8EDEB;}.css-18jxsvu{-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border-radius:50%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center;position:relative;font-weight:bold;background-color:#E3FCF7;color:#00684A;height:34px;width:34px;}.dark-theme .css-18jxsvu{background-color:#00684A;color:#E8EDEB;}

1

.css-clrhqf{padding-bottom:64px;}@media only screen and (max-width: 767px){.css-clrhqf{padding-bottom:40px;}}@media only screen and (max-width: 480px){.css-clrhqf{padding-bottom:32px;}}.css-fzf1em{-webkit-flex:1;-ms-flex:1;flex:1;min-width:0;padding-bottom:64px;}@media only screen and (max-width: 767px){.css-fzf1em{padding-bottom:40px;}}@media only screen and (max-width: 480px){.css-fzf1em{padding-bottom:32px;}}

.leafygreen-ui-3itm7{margin:unset;font-family:'Euclid Circular A','Helvetica Neue',Helvetica,Arial,sans-serif;color:#001E2B;font-size:18px;line-height:24px;font-weight:700;color:#001E2B;margin-top:24px;margin-bottom:8px;color:var(--font-color-primary);}

### Install dependencies[

](#install-dependencies "Permalink to this heading")

Ensure you have the following dependencies installed in your development environment:

.leafygreen-ui-rioki0{margin-top:0px;}

.leafygreen-ui-d7p7b6::marker{color:var(--font-color-primary);}.leafygreen-ui-d7p7b6>p{margin-bottom:8px;}*   Node.js v16.20.1 or later
    
*   npm (Node Package Manager)
    

To learn how to install Node.js and npm, see [Downloading and installing Node.js and npm.leafygreen-ui-1ie5kuq{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;position:relative;bottom:4px;left:-1px;height:12px;}](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) in the npm documentation.

2

### Create a project directory[

](#create-a-project-directory "Permalink to this heading")

In your shell, run the following command to create a directory called .leafygreen-ui-19v7id5{font-size:15px;line-height:24px;display:inline;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;border-radius:3px;font-family:'Source Code Pro',Menlo,monospace;line-height:20px;background-color:#F9FBFA;border:1px solid #E8EDEB;color:#1C2D38;white-space:nowrap;font-size:unset;display:inline;color:var(--font-color-primary);background:var(--background-color-secondary);word-wrap:break-word;white-space:unset;}.lg-ui-0000:hover>.leafygreen-ui-19v7id5{-webkit-text-decoration:none;text-decoration:none;}.lg-ui-0000:hover>.leafygreen-ui-19v7id5{box-shadow:0 0 0 3px #E8EDEB;border:1px solid #C1C7C6;}.lg-ui-0000:focus-visible>.leafygreen-ui-19v7id5{box-shadow:0 0 0 2px #FFFFFF,0 0 0 4px #0498EC;border:1px solid #016BF8;}a .leafygreen-ui-19v7id5{color:inherit;}`node_quickstart` for this project:

{"@context":"https://schema.org","@type":"SoftwareSourceCode","codeSampleType":"code snippet","text":"mkdir node\_quickstart","programmingLanguage":"Bash"}.css-16lmvu9{display:table;margin:24px 0;min-width:150px;table-layout:fixed;width:100%;}.css-16lmvu9 button>div>div{font-size:13px;}.css-16lmvu9 >div>div{display:grid;grid-template-columns:code panel;}.css-16lmvu9 >div{border-top-left-radius:12px;border-top-right-radius:12px;border-color:#E8EDEB;}.dark-theme .css-16lmvu9 >div{border-color:#3D4F58;}.css-16lmvu9 pre{background-color:#F9FBFA;color:#001E2B;}.dark-theme .css-16lmvu9 pre{background-color:#001E2B;color:#F9FBFA;}.css-16lmvu9 \[data-testid='leafygreen-code-panel'\]{background-color:#FFFFFF;border-color:#E8EDEB;}.dark-theme .css-16lmvu9 \[data-testid='leafygreen-code-panel'\]{background-color:#3D4F58;border-color:#3D4F58;}.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-keyword,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-keyword.lg-highlight-function,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-keyword.lg-highlight-class,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-selector-tag,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-selector-attr,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-selector-pseudo,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-selector-id,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-selector-class{color:#CC3887;}.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-keyword,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-keyword.lg-highlight-function,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-keyword.lg-highlight-class,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-selector-tag,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-selector-attr,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-selector-pseudo,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-selector-id,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-selector-class{color:#FF7DC3;}.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-regexp,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-number,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-literal,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-function.lg-highlight-title{color:#016ee9;}.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-regexp,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-number,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-literal,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-function.lg-highlight-title{color:#2dc4ff;}.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-quote,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-section,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-name{color:#007ab8;}.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-quote,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-section,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-name{color:#a5e3ff;}.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-string,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-addition{color:#12824D;}.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-string,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-addition{color:#35DE7B;}.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-meta,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-meta-string{color:#956d00;}.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-meta,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-meta-string{color:#EDB210;}.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-variable,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-deletion,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-symbol,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-bullet,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-meta,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-link,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-attr,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-attribute,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-language,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-template-variable,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-built\_in,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-type,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-params{color:#D83713;}.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-variable,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-deletion,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-symbol,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-bullet,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-meta,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-link,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-attr,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-attribute,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-language,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-template-variable,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-built\_in,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-type,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-params{color:#FF6F44;}.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-title,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-class.lg-highlight-title{color:#001E2B;}.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-title,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-class.lg-highlight-title{color:#F9FBFA;}.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-doctag,.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-formula{color:#001E2B;}.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-doctag,.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-formula{color:#F9FBFA;}.css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-comment{color:#3D4F58;}.dark-theme .css-16lmvu9 \[class\*="lg-highlight-hljs-"\] .lg-highlight-comment{color:#C1C7C6;}

.leafygreen-ui-196mwvg{border:1px solid #E8EDEB;border-radius:12px;overflow:hidden;}

.leafygreen-ui-yzcs8i{position:relative;display:grid;grid-template-areas:'code panel';grid-template-columns:auto 38px;border-radius:inherit;z-index:0;}.leafygreen-ui-yzcs8i:before,.leafygreen-ui-yzcs8i:after{content:'';display:block;position:absolute;z-index:1;top:0;height:100%;width:40px;border-radius:40%;box-shadow:unset;-webkit-transition:box-shadow 100ms ease-in-out;transition:box-shadow 100ms ease-in-out;}.leafygreen-ui-yzcs8i:before{grid-column:1;left:-40px;}.leafygreen-ui-yzcs8i:after{grid-column:2;}

.leafygreen-ui-1q4bxgx{grid-area:code;overflow-x:auto;border-radius:inherit;border-top-right-radius:0;border-bottom-right-radius:0;border:0;padding-top:8px;padding-bottom:8px;margin:0;position:relative;-webkit-transition:box-shadow 100ms ease-in-out;transition:box-shadow 100ms ease-in-out;white-space:pre;background-color:#F9FBFA;color:#001E2B;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding-top:6px;padding-bottom:6px;}@media only screen and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 2){.leafygreen-ui-1q4bxgx{white-space:pre-wrap;}}@media only screen and (min-device-width: 813px) and (-webkit-min-device-pixel-ratio: 2){.leafygreen-ui-1q4bxgx{white-space:pre;}}.leafygreen-ui-1q4bxgx:focus-visible{outline:none;box-shadow:0 0 0 2px #0498EC inset;}

```lg-highlight-hljs-light bash leafygreen-ui-9ybzas
.leafygreen-ui-9ybzas{color:inherit;font-family:'Source Code Pro',Menlo,monospace;font-size:15px;line-height:24px;}`.leafygreen-ui-1tr4g10{border-spacing:0;}  .leafygreen-ui-7razhx{border-spacing:0;vertical-align:top;padding:0 16px;}  mkdir node_quickstart        `
```

.leafygreen-ui-1bqcprk{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;gap:4px;background-color:#FFFFFF;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;padding:6px;border-left:solid 1px;border-color:#E8EDEB;z-index:2;grid-area:panel;}.leafygreen-ui-1bqcprk svg{width:16px;height:16px;}

Then, run the following commands to navigate into the directory and initialize your Node.js project:

{"@context":"https://schema.org","@type":"SoftwareSourceCode","codeSampleType":"code snippet","text":"cd node\_quickstart\\nnpm init -y","programmingLanguage":"Bash"}

.leafygreen-ui-11itue3{grid-area:code;overflow-x:auto;border-radius:inherit;border-top-right-radius:0;border-bottom-right-radius:0;border:0;padding-top:8px;padding-bottom:8px;margin:0;position:relative;-webkit-transition:box-shadow 100ms ease-in-out;transition:box-shadow 100ms ease-in-out;white-space:pre;background-color:#F9FBFA;color:#001E2B;}@media only screen and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 2){.leafygreen-ui-11itue3{white-space:pre-wrap;}}@media only screen and (min-device-width: 813px) and (-webkit-min-device-pixel-ratio: 2){.leafygreen-ui-11itue3{white-space:pre;}}.leafygreen-ui-11itue3:focus-visible{outline:none;box-shadow:0 0 0 2px #0498EC inset;}

```lg-highlight-hljs-light bash leafygreen-ui-9ybzas
cd node_quickstart

npm init -y
```

When the initialization command successfully completes, you have a `package.json` file in your `node_quickstart` directory.

3

### Install the Node.js Driver[

](#install-the-node.js-driver "Permalink to this heading")

Run the following command from your project directory to install the driver:

{"@context":"https://schema.org","@type":"SoftwareSourceCode","codeSampleType":"code snippet","text":"npm install mongodb@6.16","programmingLanguage":"Bash"}

```lg-highlight-hljs-light bash leafygreen-ui-9ybzas
npm install mongodb@6.16
```

This command performs the following actions:

*   Downloads the `mongodb` package and the dependencies it requires
    
*   Saves the package in the `node_modules` directory
    
*   Records the dependency information in the `package.json` file
    

After you complete these steps, you have a new project directory with the driver dependencies installed.

## Create a MongoDB Deployment[

](#create-a-mongodb-deployment "Permalink to this heading")

You can create a free tier MongoDB deployment on MongoDB Atlas to store and manage your data. MongoDB Atlas hosts and manages your MongoDB database in the cloud.

{"@context":"https://schema.org","@type":"HowTo","steps":\[{"@type":"HowToStep","text":"Complete the Get Started with Atlas\\nguide to set up a new Atlas account and load sample data into a new free\\ntier MongoDB deployment.","name":"Create a free MongoDB deployment on Atlas"},{"@type":"HowToStep","text":"After you create your database user, save that user's\\nusername and password to a safe location for use in an upcoming step.","name":"Save your credentials"}\],"name":"Create a MongoDB Deployment","image":"https://webimages.mongodb.com/\_com\_assets/cms/kuyj2focmkbxv7gh3-stacked\_default\_slate\_blue.svg?auto=format%252Ccompress"}

1

### Create a free MongoDB deployment on Atlas[

](#create-a-free-mongodb-deployment-on-atlas "Permalink to this heading")

Complete the [Get Started with Atlas](https://www.mongodb.com/docs/atlas/getting-started/?tck=docs_driver_nodejs) guide to set up a new Atlas account and load sample data into a new free tier MongoDB deployment.

2

### Save your credentials[

](#save-your-credentials "Permalink to this heading")

After you create your database user, save that user's username and password to a safe location for use in an upcoming step.

After you complete these steps, you have a new free tier MongoDB deployment on Atlas, database user credentials, and sample data loaded in your database.

## Create a Connection String[

](#create-a-connection-string "Permalink to this heading")

You can connect to your MongoDB deployment by providing a **connection URI**, also called a _connection string_, which instructs the driver on how to connect to a MongoDB deployment and how to behave while connected.

The connection string includes the hostname or IP address and port of your deployment, the authentication mechanism, user credentials when applicable, and connection options.

{"@context":"https://schema.org","@type":"HowTo","steps":\[{"@type":"HowToStep","text":"To retrieve your connection string for the deployment that\\nyou created in the previous section,\\nlog into your Atlas account and navigate to the\\nClusters section and click the Connect button\\nfor your new deployment.","name":"Find your MongoDB Atlas connection string"},{"@type":"HowToStep","text":"Click the button on the right of the connection string to copy it to\\nyour clipboard, as shown in the following screenshot:","name":"Copy your connection string"},{"@type":"HowToStep","text":"Paste your connection string into a file in your preferred text editor\\nand replace the username and  placeholders with your\\ndatabase user's username and password.Save this file to a safe location for use in the next section.","name":"Update the placeholders"}\],"name":"Create a Connection String","image":"https://webimages.mongodb.com/\_com\_assets/cms/kuyj2focmkbxv7gh3-stacked\_default\_slate\_blue.svg?auto=format%252Ccompress"}

1

### Find your MongoDB Atlas connection string[

](#find-your-mongodb-atlas-connection-string "Permalink to this heading")

To retrieve your connection string for the deployment that you created in the [previous section](#std-label-node-get-started-create-deployment), log into your Atlas account and navigate to the .css-h15tq0{font-style:normal;font-weight:700;}Clusters section and click the Connect button for your new deployment.

.css-5vkxs0{max-width:100%;margin-top:24px;margin-bottom:24px;}

.leafygreen-ui-12xaq6r{height:-webkit-max-content;height:-moz-max-content;height:max-content;overflow:hidden;}.leafygreen-ui-12xaq6r >img{max-width:100%;height:auto;}

![](data:image/svg+xml;charset=utf-8,%3Csvg%20height='832'%20width='1280'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3E%3C/svg%3E)

![The connect button in the clusters section of the Atlas UI](/docs/drivers/node/current/static/a0b29902799e22c5666730271ea535ce/6846a/atlas_connection_connect_cluster.webp)

const t="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;if(t){const t=document.querySelectorAll("img\[data-main-image\]");for(let e of t){e.dataset.src&&(e.setAttribute("src",e.dataset.src),e.removeAttribute("data-src")),e.dataset.srcset&&(e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset"));const t=e.parentNode.querySelectorAll("source\[data-srcset\]");for(let e of t)e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset");e.complete&&(e.style.opacity=1,e.parentNode.parentNode.querySelector("\[data-placeholder-image\]").style.opacity=0)}}

2

### Copy your connection string[

](#copy-your-connection-string "Permalink to this heading")

Click the button on the right of the connection string to copy it to your clipboard, as shown in the following screenshot:

![](data:image/svg+xml;charset=utf-8,%3Csvg%20height='847'%20width='1144'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3E%3C/svg%3E)

![The connection string copy button in the Atlas UI](/docs/drivers/node/current/static/09ff2a41c5392154beca427bcbfb21eb/1313c/atlas_connection_copy_uri_node.webp)

const t="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;if(t){const t=document.querySelectorAll("img\[data-main-image\]");for(let e of t){e.dataset.src&&(e.setAttribute("src",e.dataset.src),e.removeAttribute("data-src")),e.dataset.srcset&&(e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset"));const t=e.parentNode.querySelectorAll("source\[data-srcset\]");for(let e of t)e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset");e.complete&&(e.style.opacity=1,e.parentNode.parentNode.querySelector("\[data-placeholder-image\]").style.opacity=0)}}

3

### Update the placeholders[

](#update-the-placeholders "Permalink to this heading")

Paste your connection string into a file in your preferred text editor and replace the `username` and `` placeholders with your database user's username and password.

Save this file to a safe location for use in the next section.

After completing these steps, you have a connection string that contains your database username and password.

## Connect to MongoDB[

](#connect-to-mongodb "Permalink to this heading")

{"@context":"https://schema.org","@type":"HowTo","steps":\[{"@type":"HowToStep","text":"In your node\_quickstart directory, create a file called\\nindex.js for your application.Copy and paste the following code into the index.js file:","name":"Create your Node.js application"},{"@type":"HowToStep","text":"Replace the  placeholder with the\\nconnection string that you copied from the Create a Connection String\\nstep of this guide.","name":"Assign the connection string"},{"@type":"HowToStep","text":"From your project directory, run the following command to start\\nthe application:The output includes details about the retrieved movie document:If you encounter an error or see no output, verify that you specified the\\nproper connection string in the index.js file and that you loaded the\\nsample data.","name":"Run your Node.js application"}\],"name":"Connect to MongoDB","image":"https://webimages.mongodb.com/\_com\_assets/cms/kuyj2focmkbxv7gh3-stacked\_default\_slate\_blue.svg?auto=format%252Ccompress"}

1

### Create your Node.js application[

](#create-your-node.js-application "Permalink to this heading")

In your `node_quickstart` directory, create a file called `index.js` for your application.

Copy and paste the following code into the `index.js` file:

{"@context":"https://schema.org","@type":"SoftwareSourceCode","codeSampleType":"code snippet","text":"const { MongoClient } = require(\\"mongodb\\");\\n\\n// Replace the uri string with your connection string\\nconst uri = \\"&lt;connection&gt;\\";\\n\\nconst client = new MongoClient(uri);\\n\\nasync function run() {\\n try {\\n const database = client.db('sample\_mflix');\\n const movies = database.collection('movies');\\n\\n // Queries for a movie that has a title value of 'Back to the Future'\\n const query = { title: 'Back to the Future' };\\n const movie = await movies.findOne(query);\\n\\n console.log(movie);\\n } finally {\\n await client.close();\\n }\\n}\\nrun().catch(console.dir);","programmingLanguage":"JavaScript"}

```lg-highlight-hljs-light js leafygreen-ui-9ybzas
const { MongoClient } = require("mongodb");

.leafygreen-ui-ihxujy{display:inline-block;}

// Replace the uri string with your connection string

const uri = "";

const client = new MongoClient(uri);

async function run() {

  try {

    const database = client.db('sample_mflix');

    const movies = database.collection('movies');

    // Queries for a movie that has a title value of 'Back to the Future'

    const query = { title: 'Back to the Future' };

    const movie = await movies.findOne(query);

    console.log(movie);

  } finally {

    await client.close();

  }

}

run().catch(console.dir);
```

2

### Assign the connection string[

](#assign-the-connection-string "Permalink to this heading")

Replace the `` placeholder with the connection string that you copied from the [Create a Connection String](#std-label-node-quick-start-connection-string) step of this guide.

3

### Run your Node.js application[

](#run-your-node.js-application "Permalink to this heading")

From your project directory, run the following command to start the application:

{"@context":"https://schema.org","@type":"SoftwareSourceCode","codeSampleType":"code snippet","text":"node index.js"}

```lg-highlight-hljs-light none leafygreen-ui-9ybzas
node index.js
```

The output includes details about the retrieved movie document:

{"@context":"https://schema.org","@type":"SoftwareSourceCode","codeSampleType":"code snippet","text":"{\\n \_id: ...,\\n plot: 'A young man is accidentally sent 30 years into the past...',\\n genres: \[ 'Adventure', 'Comedy', 'Sci-Fi' \],\\n ...\\n title: 'Back to the Future',\\n ...\\n}"}

```lg-highlight-hljs-light none leafygreen-ui-9ybzas
{

  _id: ...,

  plot: 'A young man is accidentally sent 30 years into the past...',

  genres: [ 'Adventure', 'Comedy', 'Sci-Fi' ],

  ...

  title: 'Back to the Future',

  ...

}
```

If you encounter an error or see no output, verify that you specified the proper connection string in the `index.js` file and that you loaded the sample data.

After you complete these steps, you have a working application that uses the driver to connect to your MongoDB deployment, query the sample data, and print out the result.

## Next Steps[

](#next-steps "Permalink to this heading")

Congratulations on completing the quick start tutorial!

.leafygreen-ui-15mdk4{font-family:'Euclid Circular A','Helvetica Neue',Helvetica,Arial,sans-serif;color:#001E2B;-webkit-padding-start:12px;padding-inline-start:12px;position:relative;margin-top:24px;margin-bottom:24px;}.leafygreen-ui-15mdk4:after{content:'';position:absolute;width:3px;top:0px;bottom:0px;left:0;border-radius:2px;background-color:#016BF8;}.leafygreen-ui-15mdk4 p,.leafygreen-ui-15mdk4 li::marker{color:var(--font-color-primary);}.leafygreen-ui-15mdk4 p>a\[class^='leafy'\]{color:var(--link-color-primary);font-weight:var(--link-font-weight);}.leafygreen-ui-15mdk4 >li:last-of-type,.leafygreen-ui-15mdk4 >ul:last-of-type,.leafygreen-ui-15mdk4 >ol:last-of-type,.leafygreen-ui-15mdk4 >li:last-of-type>p,.leafygreen-ui-15mdk4 >p:last-of-type{margin-bottom:0px;}.leafygreen-ui-15mdk4 h2{color:#1254B7;}.leafygreen-ui-15mdk4:after{background-color:#016BF8;}.dark-theme .leafygreen-ui-15mdk4 h2{color:#C3E7FE;}

.leafygreen-ui-6n7b7d{margin:unset;font-family:'Euclid Circular A','Helvetica Neue',Helvetica,Arial,sans-serif;color:#001E2B;font-size:12px;font-weight:700;text-transform:uppercase;line-height:20px;letter-spacing:0.4px;color:#001E2B;width:100%;margin-block-end:4px;color:#1254B7;}

## Note

If you run into issues on this step, ask for help in the [MongoDB Community Forums](https://www.mongodb.com/community/forums/tag/node-js/) or submit feedback by using the Rate this page tab on the right or bottom right side of this page.

In this tutorial, you created a Node.js application that connects to a MongoDB deployment hosted on MongoDB Atlas and retrieves a document that matches a query.

Learn more about the Node.js driver from the following resources:

*   Discover how to configure your MongoDB connection in the .leafygreen-ui-tqgtui{-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;cursor:pointer;position:relative;-webkit-text-decoration:none;text-decoration:none;text-decoration-color:transparent;line-height:13px;color:var(--link-color-primary);font-weight:var(--link-font-weight);}.leafygreen-ui-tqgtui >code{color:var(--link-color-primary);font-weight:var(--link-font-weight);}.leafygreen-ui-tqgtui:focus,.leafygreen-ui-tqgtui:hover{text-decoration-line:underline;-webkit-transition:text-decoration 150ms ease-in-out;transition:text-decoration 150ms ease-in-out;text-underline-offset:4px;text-decoration-thickness:2px;}.leafygreen-ui-tqgtui:focus{text-decoration-color:#016BF8;outline:none;}.leafygreen-ui-tqgtui:hover{text-decoration-color:#E8EDEB;}[Connect to MongoDB](/docs/drivers/node/current/connect/#std-label-node-connect) section.
    
*   Discover how to perform read and write operations in the [CRUD Operations](/docs/drivers/node/current/crud/#std-label-node-crud-landing) section.
    

.leafygreen-ui-19l63do{padding-bottom:2.5em;width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-column-gap:16px;column-gap:16px;margin-top:88px;}@media only screen and (max-width: 480px){.leafygreen-ui-19l63do{-webkit-flex-direction:column-reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse;row-gap:64px;margin-top:66px;}}@media print{.leafygreen-ui-19l63do{display:none;}}

.leafygreen-ui-11gqdff{margin-right:auto;}

[.leafygreen-ui-y8t853{-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-column-gap:14px;column-gap:14px;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;}

.leafygreen-ui-bf3bb{-webkit-appearance:none;-moz-appearance:none;-ms-appearance:none;appearance:none;padding:0;margin:0;background-color:transparent;border:1px solid transparent;display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-align-items:stretch;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out;position:relative;-webkit-text-decoration:none;text-decoration:none;cursor:pointer;z-index:0;font-family:'Euclid Circular A','Helvetica Neue',Helvetica,Arial,sans-serif;border-radius:6px;background-color:#F9FBFA;border-color:#889397;color:#001E2B;font-size:13px;line-height:20px;font-weight:500;height:36px;width:52px;height:48px;background-color:#F9FBFA;color:#001E2B;}.leafygreen-ui-bf3bb:focus-visible,.leafygreen-ui-bf3bb\[data-focus="true"\]{outline:none;}.leafygreen-ui-bf3bb:active,.leafygreen-ui-bf3bb\[data-active="true"\],.leafygreen-ui-bf3bb:focus,.leafygreen-ui-bf3bb:hover{-webkit-text-decoration:none;text-decoration:none;}.leafygreen-ui-bf3bb:focus-visible,.leafygreen-ui-bf3bb\[data-focus="true"\]{color:#001E2B;}.leafygreen-ui-bf3bb:hover,.leafygreen-ui-bf3bb\[data-hover="true"\],.leafygreen-ui-bf3bb:active,.leafygreen-ui-bf3bb\[data-active="true"\]{color:#001E2B;background-color:#FFFFFF;box-shadow:0 0 0 3px #E8EDEB;}.leafygreen-ui-bf3bb:focus-visible,.leafygreen-ui-bf3bb\[data-focus="true"\]{background-color:#FFFFFF;box-shadow:0 0 0 2px #FFFFFF,0 0 0 4px #0498EC;}@media not all and (max-width: 767px){.leafygreen-ui-bf3bb{width:40px;height:36px;}}.dark-theme .leafygreen-ui-bf3bb{background-color:#3D4F58;color:#FFFFFF;}.leafygreen-ui-1jhwqsf{text-align:start;}

.leafygreen-ui-1r3nsao{margin:unset;font-family:'Euclid Circular A','Helvetica Neue',Helvetica,Arial,sans-serif;color:#001E2B;font-size:16px;line-height:28px;color:#001E2B;font-weight:400;font-size:13px;line-height:20px;font-weight:500;color:var(--font-color-primary);}.leafygreen-ui-1r3nsao strong,.leafygreen-ui-1r3nsao b{font-weight:700;}

Back

.leafygreen-ui-euxezt{margin:unset;font-family:'Euclid Circular A','Helvetica Neue',Helvetica,Arial,sans-serif;color:#001E2B;font-size:16px;line-height:28px;color:#001E2B;font-weight:400;font-size:13px;line-height:20px;color:#889397;}.leafygreen-ui-euxezt strong,.leafygreen-ui-euxezt b{font-weight:700;}.dark-theme .leafygreen-ui-euxezt{color:#C1C7C6;}

MongoDB Node Driver





](/docs/drivers/node/current/ "Previous Section")

.leafygreen-ui-n7fkea{margin-left:auto;}

[.leafygreen-ui-ixh526{-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-column-gap:14px;column-gap:14px;-webkit-flex-direction:row-reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse;}

.leafygreen-ui-1vnwpg6{text-align:end;}

Next

Connect





](/docs/drivers/node/current/connect/ "Next Section")