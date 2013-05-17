var symbols = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-".split("");

exports.toBase = function (num, base) {
    var decimal = num;
    var temp;
    var conversion = "";

    if (base > symbols.length || base <= 1) {
        throw new RangeError("Radix must be less than "+symbols.length+" and greater than 1");
    }

    while (decimal > 0) {
        temp = Math.floor(decimal / base);
        conversion = symbols[(decimal - (base * temp))] + conversion;
        decimal = temp;
    }

    return conversion;
};

exports.fromBase = function(str, base) {
    var decimal = 0;
    var temp;
    var conversion = reverse(str);

    if (base > symbols.length || base < 2) {
        throw new RangeError("Radix must be less than "+symbols.length+" and greater than 1");
    }

    var i = 0;

    while(conversion.length > 0) {
      temp = symbols.indexOf(conversion[0]);
      decimal += temp * Math.pow(base, i);
      conversion = conversion.slice(1);

      i++;
    }

    return decimal;
};

exports.reverse = function(str) {
  return str.split("").reverse().join("");
}