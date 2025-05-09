.leafygreen-ui-15yuscm{font-size:13px;--breadcrumb-color:#5C6C75;}.dark-theme .leafygreen-ui-15yuscm{--breadcrumb-color:#C1C7C6;}.leafygreen-ui-15yuscm a,.leafygreen-ui-15yuscm span{color:var(--breadcrumb-color);}

.css-s5xdrg{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}

.leafygreen-ui-1krmy4z{overflow:hidden;white-space:nowrap;}.leafygreen-ui-1krmy4z:first-child{min-width:-webkit-max-content;min-width:-moz-max-content;min-width:max-content;}@media not all and (max-width: 480px){.leafygreen-ui-1krmy4z:last-child{min-width:-webkit-max-content;min-width:-moz-max-content;min-width:max-content;}}

.leafygreen-ui-4jme45{font-family:'Euclid Circular A','Helvetica Neue',Helvetica,Arial,sans-serif;display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-text-decoration:none;text-decoration:none;text-decoration-color:transparent;cursor:pointer;font-size:inherit;line-height:inherit;-webkit-appearance:none;-moz-appearance:none;-ms-appearance:none;appearance:none;background:none;border:none;padding:0;font-size:16px;line-height:28px;color:#016BF8;font-weight:400;display:inline;color:var(--link-color-primary);font-weight:var(--link-font-weight);font-size:13px;vertical-align:middle;line-height:unset;font-weight:400;}.leafygreen-ui-4jme45:hover,.leafygreen-ui-4jme45:focus{-webkit-text-decoration:underline;text-decoration:underline;-webkit-transition:text-decoration 150ms ease-in-out;transition:text-decoration 150ms ease-in-out;text-underline-offset:4px;text-decoration-thickness:2px;}.leafygreen-ui-4jme45:focus{outline:none;}.leafygreen-ui-4jme45:hover{text-decoration-color:#E8EDEB;}.leafygreen-ui-4jme45:focus{text-decoration-color:#016BF8;}.leafygreen-ui-4jme45:hover,.leafygreen-ui-4jme45:focus{-webkit-text-decoration:underline;text-decoration:underline;}[Docs Home](https://www.mongodb.com/docs/)

.css-yg5ozy{cursor:default;padding-left:8px;padding-right:8px;} /

.leafygreen-ui-yjiaca{-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;cursor:pointer;position:relative;-webkit-text-decoration:none;text-decoration:none;text-decoration-color:transparent;line-height:13px;color:var(--link-color-primary);font-weight:var(--link-font-weight);font-size:13px;vertical-align:middle;line-height:unset;font-weight:400;}.leafygreen-ui-yjiaca >code{color:var(--link-color-primary);font-weight:var(--link-font-weight);}.leafygreen-ui-yjiaca:focus,.leafygreen-ui-yjiaca:hover{text-decoration-line:underline;-webkit-transition:text-decoration 150ms ease-in-out;transition:text-decoration 150ms ease-in-out;text-underline-offset:4px;text-decoration-thickness:2px;}.leafygreen-ui-yjiaca:focus{text-decoration-color:#016BF8;outline:none;}.leafygreen-ui-yjiaca:hover{text-decoration-color:#E8EDEB;}.leafygreen-ui-yjiaca:hover,.leafygreen-ui-yjiaca:focus{-webkit-text-decoration:underline;text-decoration:underline;}[Database Manual](/docs/manual/)

/

[Data Modeling](/docs/manual/data-modeling/)

.leafygreen-ui-1qnjd6d{scroll-margin-top:85px;position:absolute;}

.leafygreen-ui-1nkfqbv{margin:unset;font-family:'Euclid Circular A','Helvetica Neue',Helvetica,Arial,sans-serif;color:#001E2B;font-size:32px;line-height:40px;font-weight:400;font-family:'MongoDB Value Serif','Times New Roman',serif;color:#00684A;margin-top:24px;margin-bottom:8px;color:var(--heading-color-primary);margin-top:16px;margin-bottom:24px;}

# Schema Validation.leafygreen-ui-11mfcte{position:absolute;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;padding:0 10px;visibility:hidden;}[.leafygreen-ui-a30zj9{color:#889397;vertical-align:middle;margin-top:-2px;}.css-zena35{display:inline;left:0;top:0;margin-top:-85px;position:absolute;padding-bottom:2px;}@media only screen and (max-width: 767px){.css-zena35{margin-top:-85px;}}

](#schema-validation "Permalink to this heading")

.leafygreen-ui-1kp3ins{margin:unset;font-family:'Euclid Circular A','Helvetica Neue',Helvetica,Arial,sans-serif;color:#001E2B;font-size:16px;line-height:28px;color:#001E2B;font-weight:400;margin-bottom:16px;color:var(--font-color-primary);}.leafygreen-ui-1kp3ins strong,.leafygreen-ui-1kp3ins b{font-weight:700;}

Schema validation lets you create validation rules for your fields, such as allowed data types and value ranges.

MongoDB uses a flexible schema model, which means that documents in a collection do not need to have the same fields or data types by default. Once you've established an application schema, you can use schema validation to ensure there are no unintended schema changes or improper data types.

.leafygreen-ui-edukoa{margin:16px 0;font-size:13px;background-color:#E1F7FF;border:1px solid #C3E7FE;color:#083C90;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border-radius:6px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;font-size:14px;margin:24px 0px;min-height:44px;padding:9px 12px 9px 20px;position:relative;cursor:pointer;}.leafygreen-ui-edukoa>div>div>\*{margin:0 0 12px;}.leafygreen-ui-edukoa>div>div>\*:last-child{margin:0;}.leafygreen-ui-edukoa p{margin:0;}.leafygreen-ui-edukoa p,.leafygreen-ui-edukoa a{font-size:13px;}.leafygreen-ui-edukoa a:hover{text-underline-offset:3px;}.dark-theme .leafygreen-ui-edukoa{background-color:#0C2657;border:1px solid #083C90;color:#C3E7FE;}.leafygreen-ui-edukoa >p{margin-left:15px;}

.leafygreen-ui-1wtlnm1{width:26px;min-width:26px;height:26px;background-color:#C3E7FE;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center;border:1px solid #016BF8;border-radius:20px;margin-left:-5px;}

.leafygreen-ui-1t2jgtk{color:#016BF8;}

You can .leafygreen-ui-fgcsv5{font-family:'Euclid Circular A','Helvetica Neue',Helvetica,Arial,sans-serif;display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-text-decoration:none;text-decoration:none;text-decoration-color:transparent;cursor:pointer;font-size:inherit;line-height:inherit;-webkit-appearance:none;-moz-appearance:none;-ms-appearance:none;appearance:none;background:none;border:none;padding:0;font-size:16px;line-height:28px;color:#016BF8;font-weight:400;display:inline;color:var(--link-color-primary);font-weight:var(--link-font-weight);}.leafygreen-ui-fgcsv5:hover,.leafygreen-ui-fgcsv5:focus{-webkit-text-decoration:underline;text-decoration:underline;-webkit-transition:text-decoration 150ms ease-in-out;transition:text-decoration 150ms ease-in-out;text-underline-offset:4px;text-decoration-thickness:2px;}.leafygreen-ui-fgcsv5:focus{outline:none;}.leafygreen-ui-fgcsv5:hover{text-decoration-color:#E8EDEB;}.leafygreen-ui-fgcsv5:focus{text-decoration-color:#016BF8;}[implement schema validation in the UI](https://www.mongodb.com/docs/atlas/performance-advisor/schema-suggestions/) for deployments hosted in [MongoDB Atlas.](https://www.mongodb.com/docs/atlas?tck=docs_server)

.leafygreen-ui-e8trgl{margin:unset;font-family:'Euclid Circular A','Helvetica Neue',Helvetica,Arial,sans-serif;color:#001E2B;font-size:24px;line-height:32px;font-weight:500;color:#001E2B;margin-top:24px;margin-bottom:8px;color:var(--font-color-primary);}

## When to Use Schema Validation[

](#when-to-use-schema-validation "Permalink to this heading")

Your schema validation needs depend on how users use your application. When your application is in the early stages of development, schema validation may impose unhelpful restrictions because you don't know how you want to organize your data. Specifically, the fields in your collections may change over time.

Schema validation is most useful for an established application where you have a good sense of how to organize your data. You can use schema validation in the following scenarios:

.leafygreen-ui-rioki0{margin-top:0px;}

.leafygreen-ui-d7p7b6::marker{color:var(--font-color-primary);}.leafygreen-ui-d7p7b6>p{margin-bottom:8px;}*   For a users collection, ensure that the .leafygreen-ui-19v7id5{font-size:15px;line-height:24px;display:inline;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;border-radius:3px;font-family:'Source Code Pro',Menlo,monospace;line-height:20px;background-color:#F9FBFA;border:1px solid #E8EDEB;color:#1C2D38;white-space:nowrap;font-size:unset;display:inline;color:var(--font-color-primary);background:var(--background-color-secondary);word-wrap:break-word;white-space:unset;}.lg-ui-0000:hover>.leafygreen-ui-19v7id5{-webkit-text-decoration:none;text-decoration:none;}.lg-ui-0000:hover>.leafygreen-ui-19v7id5{box-shadow:0 0 0 3px #E8EDEB;border:1px solid #C1C7C6;}.lg-ui-0000:focus-visible>.leafygreen-ui-19v7id5{box-shadow:0 0 0 2px #FFFFFF,0 0 0 4px #0498EC;border:1px solid #016BF8;}a .leafygreen-ui-19v7id5{color:inherit;}`password` field is only stored as a string. This validation prevents users from saving their password as an unexpected data type, like an image.
    
*   For a sales collection, ensure that the `item` field belongs to a list of items that your store sells. This validation prevents a user from accidentally misspelling an item name when entering sales data.
    
*   For a students collection, ensure that the `gpa` field is always a positive number. This validation prevents errors during data entry.
    

## When MongoDB Checks Validation[

](#when-mongodb-checks-validation "Permalink to this heading")

After you add schema validation rules to a collection:

*   All document inserts must match the rules.
    
*   The schema validation level defines how the rules are applied to existing documents and document updates. To learn more, see .leafygreen-ui-tqgtui{-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;cursor:pointer;position:relative;-webkit-text-decoration:none;text-decoration:none;text-decoration-color:transparent;line-height:13px;color:var(--link-color-primary);font-weight:var(--link-font-weight);}.leafygreen-ui-tqgtui >code{color:var(--link-color-primary);font-weight:var(--link-font-weight);}.leafygreen-ui-tqgtui:focus,.leafygreen-ui-tqgtui:hover{text-decoration-line:underline;-webkit-transition:text-decoration 150ms ease-in-out;transition:text-decoration 150ms ease-in-out;text-underline-offset:4px;text-decoration-thickness:2px;}.leafygreen-ui-tqgtui:focus{text-decoration-color:#016BF8;outline:none;}.leafygreen-ui-tqgtui:hover{text-decoration-color:#E8EDEB;}[Specify Validation Level for Existing Documents.](/docs/manual/core/schema-validation/specify-validation-level/#std-label-schema-specify-validation-level)
    

To find documents in a collection that don't match the schema validation rules, see [Find Documents that Don't Match the Schema.](/docs/manual/core/schema-validation/use-json-schema-query-conditions/#std-label-use-json-schema-query-conditions-find-documents)

## What Happens When a Document Fails Validation[

](#what-happens-when-a-document-fails-validation "Permalink to this heading")

By default, when an insert or update operation would result in an invalid document, MongoDB rejects the operation and does not write the document to the collection.

Alternatively, you can configure MongoDB to allow invalid documents and log warnings when schema violations occur.

To learn more, see [Choose How to Handle Invalid Documents.](/docs/manual/core/schema-validation/handle-invalid-documents/#std-label-schema-validation-handle-invalid-docs)

## Get Started[

](#get-started "Permalink to this heading")

For common tasks involving schema validation, see the following pages:

*   [Specify JSON Schema Validation](/docs/manual/core/schema-validation/specify-json-schema/#std-label-schema-validation-json)
    
*   [Specify Validation With Query Operators](/docs/manual/core/schema-validation/specify-query-expression-rules/#std-label-schema-validation-query-expression)
    
*   [Specify Allowed Field Values](/docs/manual/core/schema-validation/specify-json-schema/specify-allowed-field-values/#std-label-schema-allowed-field-values)
    
*   [View Existing Validation Rules](/docs/manual/core/schema-validation/view-existing-validation-rules/#std-label-schema-view-validation-rules)
    
*   [Modify Schema Validation](/docs/manual/core/schema-validation/update-schema-validation/#std-label-schema-update-validation)
    
*   [Query for and Modify Valid or Invalid Documents](/docs/manual/core/schema-validation/use-json-schema-query-conditions/#std-label-use-json-schema-query-conditions)
    
*   [Bypass Schema Validation](/docs/manual/core/schema-validation/bypass-document-validation/#std-label-schema-bypass-document-validation)
    

## Learn More[

](#learn-more "Permalink to this heading")

To learn about MongoDB's flexible schema model, see [Data Modeling.](/docs/manual/data-modeling/#std-label-manual-data-modeling-intro)

.leafygreen-ui-19l63do{padding-bottom:2.5em;width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-column-gap:16px;column-gap:16px;margin-top:88px;}@media only screen and (max-width: 480px){.leafygreen-ui-19l63do{-webkit-flex-direction:column-reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse;row-gap:64px;margin-top:66px;}}@media print{.leafygreen-ui-19l63do{display:none;}}

.leafygreen-ui-11gqdff{margin-right:auto;}

[.leafygreen-ui-y8t853{-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-column-gap:14px;column-gap:14px;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;}

.leafygreen-ui-bf3bb{-webkit-appearance:none;-moz-appearance:none;-ms-appearance:none;appearance:none;padding:0;margin:0;background-color:transparent;border:1px solid transparent;display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-align-items:stretch;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out;position:relative;-webkit-text-decoration:none;text-decoration:none;cursor:pointer;z-index:0;font-family:'Euclid Circular A','Helvetica Neue',Helvetica,Arial,sans-serif;border-radius:6px;background-color:#F9FBFA;border-color:#889397;color:#001E2B;font-size:13px;line-height:20px;font-weight:500;height:36px;width:52px;height:48px;background-color:#F9FBFA;color:#001E2B;}.leafygreen-ui-bf3bb:focus-visible,.leafygreen-ui-bf3bb\[data-focus="true"\]{outline:none;}.leafygreen-ui-bf3bb:active,.leafygreen-ui-bf3bb\[data-active="true"\],.leafygreen-ui-bf3bb:focus,.leafygreen-ui-bf3bb:hover{-webkit-text-decoration:none;text-decoration:none;}.leafygreen-ui-bf3bb:focus-visible,.leafygreen-ui-bf3bb\[data-focus="true"\]{color:#001E2B;}.leafygreen-ui-bf3bb:hover,.leafygreen-ui-bf3bb\[data-hover="true"\],.leafygreen-ui-bf3bb:active,.leafygreen-ui-bf3bb\[data-active="true"\]{color:#001E2B;background-color:#FFFFFF;box-shadow:0 0 0 3px #E8EDEB;}.leafygreen-ui-bf3bb:focus-visible,.leafygreen-ui-bf3bb\[data-focus="true"\]{background-color:#FFFFFF;box-shadow:0 0 0 2px #FFFFFF,0 0 0 4px #0498EC;}@media not all and (max-width: 767px){.leafygreen-ui-bf3bb{width:40px;height:36px;}}.dark-theme .leafygreen-ui-bf3bb{background-color:#3D4F58;color:#FFFFFF;}.leafygreen-ui-1jhwqsf{text-align:start;}

.leafygreen-ui-1r3nsao{margin:unset;font-family:'Euclid Circular A','Helvetica Neue',Helvetica,Arial,sans-serif;color:#001E2B;font-size:16px;line-height:28px;color:#001E2B;font-weight:400;font-size:13px;line-height:20px;font-weight:500;color:var(--font-color-primary);}.leafygreen-ui-1r3nsao strong,.leafygreen-ui-1r3nsao b{font-weight:700;}

Back

.leafygreen-ui-euxezt{margin:unset;font-family:'Euclid Circular A','Helvetica Neue',Helvetica,Arial,sans-serif;color:#001E2B;font-size:16px;line-height:28px;color:#001E2B;font-weight:400;font-size:13px;line-height:20px;color:#889397;}.leafygreen-ui-euxezt strong,.leafygreen-ui-euxezt b{font-weight:700;}.dark-theme .leafygreen-ui-euxezt{color:#C1C7C6;}

Use Embedding





](/docs/manual/data-modeling/enforce-consistency/embed-data/ "Previous Section")

.leafygreen-ui-n7fkea{margin-left:auto;}

[.leafygreen-ui-ixh526{-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-column-gap:14px;column-gap:14px;-webkit-flex-direction:row-reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse;}

.leafygreen-ui-1vnwpg6{text-align:end;}

Next

Specify JSON Validation





](/docs/manual/core/schema-validation/specify-json-schema/ "Next Section")