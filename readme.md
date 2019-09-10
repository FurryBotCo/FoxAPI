## <center>Fox API</center>

This module is a little compilation of a fex fox image apis I know of, namely <a href="https://randomfox.ca">randomfox.ca</a>, <a href="https://foxrudor.de">foxrudor.de</a>, and <a href="https://api.furry.bot/animals/fox">api.furry.bot</a>.

Every function returns the same structure, so the implementations can be the same. Each of them also has one optional parameter, `fetchImage`, this will return the json body, as well as a buffer that contains the image, there is an example for that [down here](#fetchimage-example)


The way to reach each of them is as follows:

randomfox.ca: `ca`
```js
const FoxAPI = require("foxapi");
const f = new FoxAPI("FoxAPI/1.0.1 (https://github.com/FurryBotCo/FoxAPI"));

f.ca().then(res => console.log(res));
// in the console:
/*
{
	success: true,
	response: {
		image: "https://randomfox.ca/images/83.jpg",
		filetype: "jpg",
		name: "83.jpg"
	}
}
*/
```

foxrudor.de: `de`
```js
const FoxAPI = require("foxapi");
const f = new FoxAPI("FoxAPI/1.0.1 (https://github.com/FurryBotCo/FoxAPI"));

// this api does not return any json, or any links to images, it just directly returns an image, so we improvise

f.de().then(res => console.log(res));
// in the console:
/*
{
	success: true,
	response: {
		image: "https://foxrudor.de",
		filetype: "jpg",
		name: "foxrudor.de.jpg"
	}
}
*/
```

api.furry.bot: `fb`
```js
const FoxAPI = require("foxapi");
const f = new FoxAPI("FoxAPI/1.0.1 (https://github.com/FurryBotCo/FoxAPI"));

f.fb().then(res => console.log(res));
// in the console:
/*
{
	success: true,
	response: {
		image: "https://i.furcdn.net/animals/fox/a6f5338446968dbe0586735cc4002ab4.jpg",
		filetype: "jpg",
		name: "a6f5338446968dbe0586735cc4002ab4.jpg"
	}
}
*/
```

##### `fetchImage` example
```js
const FoxAPI = require("foxapi");
const f = new FoxAPI("FoxAPI/1.0.1 (https://github.com/FurryBotCo/FoxAPI"));

f.fb(true).then(res => console.log(res));
// in the console:
/*
{
	image: (ImageBuffer),
	success: true,
	response: {
		image: "https://i.furcdn.net/animals/fox/a6f5338446968dbe0586735cc4002ab4.jpg",
		filetype: "jpg",
		name: "a6f5338446968dbe0586735cc4002ab4.jpg"
	}
}
*/
```