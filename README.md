# Selfme - A Simple Camera inside a Browser

## Demo

It is better to see once!
[Open selfme](https://sergeykhval.github.io/selfme/)

## Description

This is an offline first camera that works inside your browser.
Take a picture, apply a filter and save it. Easy as it is.

It is built with React and Redux.
Filters are applied using WebGL, so images are processed using your device's GPU.

## Installation
 
 ```bash
$ git clone
$ cd selfme
$ npm install
```

## Running in dev mode

```bash
$ npm start
```

The app will be available at `http://localhost:8000`

## Building

```bash
$ npm dist
```

Built assets will be put into `./dist` directory.
Generation of serviceWorker is a part of compilation so there should be no need in additional configuration.

## Notes

Browsers allow to use `navigator.getUserMedia()` only on secure origins. So this app will work only over `https` or on `localhost`.

