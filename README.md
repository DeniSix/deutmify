# deUTMify

Simple library for cleaning up URL's from analytics shit on client side.
It just removes `utm_*` markers with HTML5 History API.

## Usage

```html
<script src="deutmify.js"></script>
<script>
  deUTMify.cleanup();
</script>
```

or use with module loaders.

## API

* `.cleanup()` - just do it

* `.url()` - Get clean URL

## License

MIT


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/DeniSix/deutmify/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

