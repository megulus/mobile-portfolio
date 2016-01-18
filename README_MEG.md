# Project 4: Portfolio Site Optimization

### Overview

Approach: I deliberately did not do a lot of customization to this portfolio. I wanted the challenge of optimizing the content that was provided (particularly the images), rather than creating entirely new content (e.g., if I were creating the portfolio from scratch, I might replace a lot of images with CSS - but I felt that my task was to optimize what I was given).

Note: The optimizations I made were ones I could make to the site’s code. Server-related suggestions (browser caching, serving compressed files) were not done.

### Running

If your machine runs python, simply navigate to the “build” directory of the project and run the command “python -m SimpleHTTPServer [port you want to use]”.

Otherwise, from within the browser, navigate to “index.html” in the main project directory (“mobile-portfolio”).

## Optimizing the Portfolio Page:


### index.html

#### 1st PageSpeed Score (baseline, before any optimizations):

* mobile: 28/100
* desktop: 29/100

suggestions from pagespped insights:
* optimize images
* eliminate render-blocking CSS/JS in above-the-fold content
* leverage browser caching (see note in "Approach" above)
* enable compression (see note in "Approach" above)
* minify HTML

#### 2nd PageSpeed Score:

* mobile: 76/100
* desktop: 84/100

optimizations done:
* made permatters.js async (also google analytics, but this didn’t change score)
* resized pizzeria.jpg

#### 3rd PageSpeed Score:

* mobile: 77/100
* desktop: 88/100

optimizations done:
* stripped image metadata
* resized images - made as small as possible without obscuring their content

#### 4th PageSpeed Score

* mobile: 77/100
* desktop: 91/100

optimizations done:
* added media query to “print.css”
* minified HTML, CSS JS

At this point, the major remaining hurdle to getting my scores over 90 for both mobile and desktop was to tackle the render-blocking CSS. Used a gulp module (“critical”) to find and inline critical CSS.

#### 5th PageSpeed Score

* mobile: 94/100
* desktop: 94/100

optimizations done:
* inlined critical CSS

### project-2048.html

Many of the optimizations done for index.html also benefited the three project pages in the portfolio (minification, image optimization, etc.). However, there were are few things that needed to be tweaked.

#### 1st PageSpeed Score:

* mobile: 87/100
* desktop: 89/100

#### 2nd PageSpeed Score:

* mobile: 94/100
* desktop: 96/100

optimizations done:
* mobile: profile picture not displayed (added id “projectprofile” and added “display: none” to media query for mobile viewport size)
* moved main image “below the fold” (i.e., below the text)

### project-webperf.html

Applied the same optimizations done to project-2048.html.

#### 1st PageSpeed Score:

* mobile: 94/100
* desktop: 96/100


### project-mobile

Applied the same optimizations done to project-2048.html.

#### 1st PageSpeed Score:

* mobile: 94/100
* desktop: 96/100


## pizza.html

Optimizations done on other pages (image optimization) also benefited pizza.html.


### updatePositions:

I also followed some of the suggestions in this forum to optimize the updatePositions funcition in main.js: https://discussions.udacity.com/t/project-4-how-do-i-optimize-the-background-pizzas-for-loop/36302

optimizations (goal: reduce average time per 10 frames - ideally ~1ms or less):
* initially: 20-30 ms
* getElementsByClassName to replace querySelectorAll
  * still 20-30ms
* store items in longer-lived scope than updatePositions function (as originally written)
  * refactored updatePositions to do this without having to declare items as a global variable
  * still 20-30 ms
* items.length - declare in a variable outside for loop
  * still 20-30 ms
* top = document.body.scrollTop
  * finally made a significant difference: ~1 ms
* **attempted to replace fixed positions + change “left” property with “translateX” - unfortunately, this completely changed the display of the pizzas on the page (instead of being distributed evenly over the whole page as before, they ended up clustered, whether I used “display: block,” “display: inline-block” or nothing at all for display)**
* changed number of moving pizzas
  * since not all can be displayed at any given time on the page, I lowered the number of moving pizzas created to 50 - the difference will not be noticeable on anything but the largest of screens, so I think it is acceptable

### resizePizzas:

* original: time to resize pizzas ~178 ms
  * forced synchronous layout

optimizations:

* pulled “determineDx” out of for loop in changePizzaSlices
  * brought time to resize pizzas down to ~142 ms - still bad
* there is also a call to offsetWidth in the for loop - tackle this next
  * time now ~5.5ms - huge improvement!
  * wonder if it could still be better - querySelectorAll is being called each time through the for loop - this array only needs to be generated once, though, no?
* generating array (querySelectorAll(“.randomPizzaContainer”)) and storing in a variable - before the for-loop
  * this wasn’t as huge an improvement, but did shave the function down to ~4 ms
* this is a bit of a “micro-optimization,” but in the sizeSwitcher function, changed the following code:
    * var dx = (newSize - oldSize) * windowWidth;
    * return dx;
  * to:
    * return (newSize - oldSize) * windowWidth;
  * didn’t expect a huge improvement, but now resizePizzas running under 3ms
* now that the resizePizzas function is running <3ms, I have decided to stop optimizing - I doubt any further optimizations will be imperceptible to the human brain

### time to generate pizzas on load

* original: 25.85 ms

optimizations:
  * pulled “document.getElementById(“randomPizzas”) out of for loop
  * time to generate pizzas on load: 19.16 ms - not a dramatic improvement

