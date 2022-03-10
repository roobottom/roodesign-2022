---
title: Fluid type scales with Less
date: 2021-05-03
introduction: Using Less CSS to manage fluid type scales.
tags:
  - web development
---
If you haven’t already, have a look at [Utopia: Fluid responsive design](https://utopia.fyi/). It’s a fantastic resource about fluid typography for the web. Utopia should be your first port of call, as I don’t intend this article to say much (if anything) about the theory of fluid typography—rather, discuss how to implement it in Less.

Utopia provides [a type scale calculator](https://utopia.fyi/type/calculator), which generates all the styles required to implement a type scale system. I wanted to create styles locally, so I turned to my favourite CSS preprocessor. 

First, I needed to define some basic settings. I tried to keep as many as possible as native CSS variables. Some, however, need to be bound into Less for the generation to work.

Ideally, I would have liked a straightforward mixin to generate all possible type scales. However, I couldn’t figure out how to do this with [recursive mixins](https://lesscss.org/features/#mixins-feature-loops-feature). So I now have two: Positive and negative.

Here’s the code:

```less
@width-min: 320;
@width-max: 1200;
@base: 16;

@type-min-scale: 1.2;
@type-min-size: 17;
@type-max-scale: 1.2;
@type-max-size: 21;
@typescale-up-steps: 10;
@typescale-down-steps: 2;

:root {
  --fluid-min-width: @width-min;
  --fluid-max-width: @width-max;

  --fluid-screen: 100vw;
  --fluid-bp: calc(
    (var(--fluid-screen) - var(--fluid-min-width) / @base * 1rem) /
      (var(--fluid-max-width) - var(--fluid-min-width))
  );
}

#type {
    .positive-typescale(@counter: 0) when (@counter <= @typescale-up-steps) {
        @min: round(pow(@type-min-scale, @counter) * @type-min-size, 2);
        @max: round(pow(@type-max-scale, @counter) * @type-max-size, 2);
        :root {
            --step-@{counter}: calc((unit((@min/@base), rem)) + (@max - @min) * var(--fluid-bp));
        }
        #type > .positive-typescale(@counter + 1); 
    }
    .negative-typescale(@counter: 1) when (@counter <= @typescale-down-steps) {
        @min: round((@type-min-size / pow(@type-min-scale, @counter)), 2);
        @max: round((@type-max-size / pow(@type-max-scale, @counter)), 2);
        :root {
            --step--@{counter}: calc((unit((@min/@base), rem)) + (@max - @min) * var(--fluid-bp));
        }
        #type > .negative-typescale(@counter + 1);  
    }
}
```

The output from the above code similar to that of Utopia’s calculator. It’s probably worth discussing the `@min` and `@max` calculations, as this is hidden under the bonnet in Utopia. These can be written:

`(scale ^ scale step) * base text size`

For example, with a scale of 1.2 and a base text size of 16, the 3rd type size in this scale would be:

`(1.2 ^ 3) * 16 = 27.65`

## Custom steps
In practice, I found I wanted to bridge more than one step on the scale. For example, a mega style that grows from step 6 on smaller screens to 12 at the maximum width. This is like [Utopia’s custom space steps](https://utopia.fyi/space/calculator#custom). 

Here’s the code:

```less
#type {
  /* translate between any steps within the system: */
  .steps(@minstep, @maxstep) {
	  @min: round(pow(@type-min-scale, @minstep) * @type-min-size, 2);
	  @max: round(pow(@type-max-scale, @maxstep) * @type-max-size, 2);
	  font-size: calc((unit((@min/@base), rem)) + (@max - @min) * var(--fluid-bp));
  }
}

#type.steps(6,12);
```