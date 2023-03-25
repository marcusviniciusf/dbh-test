# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

First of all I decided to move the createHash function to its own function and there I made the typeOf check to avoid stringify an string input and to let the function have a single responsability.
The main function, there were a lot of redundant `if` conditions and createHash invokes, so I created the candidate variable with a two potential initial values, the event.partitionKey or the TRIVIAL_PARTITION_KEY. About the `if` condition, it will be triggered when:
- The event.partitionKey is more than 256 length, it would be caught in the `if` condition, otherwise it would be the function's response
- There is no event.partitionKey was found and an event was provider, the `if` would be activated and the hash created.
- If no arguments were provided, the function will return '0' (TRIVIAL_PARTITION_KEY)