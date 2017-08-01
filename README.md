# Jooniper

A visual regression testing utility with backstopjs.

## Install

```
npm install jooniper
```

## Usage

```js
jooniper.reference(pattern, url, cwd)
jooniper.test(pattern, url, cwd)
```

### Parameters

- `pattern` glob pattern.
- `url` `{String}` localhost url.
- `cwd` `{String}` current working directory.
