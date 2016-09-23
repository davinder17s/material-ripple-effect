# Easy material ripple effect

The main key feature of this library is that you dont need to rely on any framework, this is coded in vanilla js, and is very fast, also provides exact result.

Shortest possible effective line:
```javascript
new RippleEffect(element);
```


## Steps:

- Include js file
- Include css
- Add attribute and initialize

## Quick html

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <!-- include js -->
    <script src="ripple.js"></script>
    <!-- add animation -->
    <style>
        .ripple-container {
        }
        .ripple-container .ripple{
            background-color: rgba(255,255,255,0.4);
            animation: ripple 2s forwards cubic-bezier(0, 0, 0.2, 1);
        }
        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            80% {
                transform: scale(1);
            }
            100% {
                opacity: 0;
            }
        }
    </style>
    <!-- demo page css -->
    <style>
        .button {
            background-color: dodgerblue;
            color: white;
            padding: 10px 20px;
            border:0;
            font-size: 14px;
            cursor: pointer
        }
    </style>
</head>
<body>

<!-- we just added data-ripple attribute -->
<button data-ripple>
    Demo button
</button>

<script>
    // just add effect to elements
    Array.prototype.forEach.call(document.querySelectorAll('[data-ripple]'), function(element){
        // find all elements and attach effect
        new RippleEffect(element); // element is instance of javascript element node
    });

    // Or jQuery way
    /*

    $('[data-ripple]').each(function(){
        new RippleEffect(this);
    });

    */
</script>
</body>
</html>
```