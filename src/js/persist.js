/*! Knockout Persist - v0.1.0 - 2013-06-05
* https://github.com/spoike/knockout.persist
* Copyright (c) 2013 Mikael Brassman; Licensed MIT */
(function(e){"undefined"!=typeof localStorage&&(e.extenders.persist=function(t,o){var r=t();if(o&&null!==localStorage.getItem(o))try{r=JSON.parse(localStorage.getItem(o))}catch(a){}return t(r),t.subscribe(function(t){localStorage.setItem(o,e.toJSON(t))}),t})})(ko);
