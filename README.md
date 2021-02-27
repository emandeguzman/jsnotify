# jsnotify
Pure javascript notification based on [Notify.js](https://notifyjs.jpillora.com/)

>Note: this uses web components

[Demo](https://emandeguzman.github.io/jsnotify/demo.html)

## Usage
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JsNotify Demo</title>
    <link rel="stylesheet" href="jsnotify.css">
</head>
<body>
    <input type="text" class="target-element">

    <script src="jsnotify.js"></script>
    <script>
        jsnotify("Hi There!", document.querySelector(".target-element"), {className: 'success', autoHide: true});
    <script>
</body>
</html>
```

1. Add jsnotify css file
```
<link rel="stylesheet" href="jsnotify.css">
```
2. Add jsnotify script
```
<script src="jsnotify.js"></script>
```
3. Activate jsnotify
```
<script>
    jsnotify("Hi There!", document.querySelector(".target-element"));
<script>
```


## Syntax
```
jsnotify(<message>, <target>, [options]);
```
where:

|Parameter | Description
|---       |---
|message   | Notification message to display
|target    | HTML element to where the notification will be attached
|options   | Additional options to configure the notification



## Options

|Option Name    | Description                                                                               | Default
|---            |---                                                                                        |---
|clickToHide    |Hides notification on click                                                                |true
|autoHide       |Hides notification after autoHideDelay elapsed                                             |true
|autoHideDelay  |If autoHide is true, delay in milliseconds before notification is hidden                   |5000
|arrowShow      |If true, show the arrow pointing at the target element                                     |true
|arrowSize      |If arrowShow is true, sets the arrow size in pixels                                        |5
|position       |Position of notification around target element. (see [position](#Position))                |"bottom left"
|className      |Class name set for notification element. (see [Pre-defined classes](#Pre-defined-classes)) |"error"
|gap            |Padding between target element and notification in pixels                                  |2


### Position
Possible values are
- top left
- top center
- top right
- right top
- right middle
- right bottom
- bottom left
- bottom center
- bottom right
- left top
- left middle
- left bottom

### Pre-defined classes
- error
- success
- warn
- info



## TODO
- Adjust position when inside a scrollable element