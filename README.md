# Jooniper

A visual regression testing utility with backstopjs.

## Install

```
npm install jooniper
```

## Usage

```js
jooniper.reference(pattern, url, cwd, delay)
jooniper.test(pattern, url, cwd, delay)
```
NEW: you have to specify the delay after which backstop takes the screenshot. ex.: 2000 -> 2 Seconds


### Parameters

- `pattern` glob pattern.
- `url` `{String}` localhost url.
- `cwd` `{String}` current working directory.
