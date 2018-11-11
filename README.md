# TAG-O-RAMA

Adcash developer task

I did the task using NPM & Webpack, Knockout, jQuery, SASS and Bootstrap. It is responsive for mobile. 

I set it up with development and production environments coded to the terminal so it switches automatically when you are running and building, the development environment has all the necessary dependencies to prepare for building, loaders, optimisers and code cleaning, SASS for SCSS, image/file loaders. So you can get a bit of an idea that I know what I'm doing with Webpack. 

Tags can be added, numbers only, except for , ; line-break. If you add any other characters they will be stripped from the string before being split into an observable array. Numbers with a negative value can be added as well as positive numbers. The tags are also split into arrays of teams, positive numbers on the red team and negative numbers on the blue team. At any point in the usage of the app numbers can be added and removed, which will be reflected throughout. There is also a clear all button that will remove all the tags. 

There is a bit of validation taking place when adding tags, there must be text in the textbox, it will remove unauthorised characters, it will stop duplicates from being added to the array as well as blank entries e.g ; , ; Same goes when editing the tags, which also has its own validation and compare checks for tags being added and removed.

I'm using a knockout persist script and local storage to keep the tags in the array for use after page refresh, everything else feeds from that. 

The game aspect of the project I added for a bit of fun and to show you a little more than just copy & pasting the code from the tutorials on the knockout website :) I added a few more arrays for splitting the results into teams and used data-binding so all arrays are connected to the initial observable array and filtered out accordingly along the way. Tags can be edited and removed from all team arrays that will then feed back to the main observable array. 

Tried to show a bit of UI/UX with things being hidden and shown, some small animation as well. Animations, buttons, gradients are all CSS and there is no JS functionality aside from the Bootstrap stuff with a little bit of jQuery, everything else is achieved using knockout. 

I took the time to actually get to know knockout and it wasn't so bad :) It's a little light on documentation for anything other than basic or specific tasks and is a little outdated overall when searching for solutions but I managed well with it and got the hang of it quickly. I would have no problem using it to perform tasks on a regular basis.  

I just didn't included here the node_modules folder for the packages because it has a lot in it, if you want to run this locally then it can be added. 

For your convenience the dist version can be found here for viewing http://dams.ee/adcash/dist

