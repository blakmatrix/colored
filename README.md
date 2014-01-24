[![build status](https://secure.travis-ci.org/blakmatrix/colored.png)](http://travis-ci.org/blakmatrix/colored)
# Colored

A CLI tool to colorize logs in the terminal and a library to colorize streams(TODO)

Colored is a faster alternative to CCZE if you use node.js

Install with:

```shell
npm install colored -g
```

## Example

To run with tail: `tail -f /path/to/log | colored`

To run with tail and a highlighted keyword : `tail -f /path/to/log | colored -t keyword`


## Customization

### words
Edit `./config/words.json` to add or remove certain words you would like to colorize.

### configuration

//TODO

## License

MIT 2012 Farrin Reid
