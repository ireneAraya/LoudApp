angular.module ('loudApp')

.filter('validate', [function () {
    return function (ccnumber) {

      if (!ccnumber) {
        return '';
      }

      ccnumber = ccnumber.toString().replace(/\s+/g, '');

      var len = ccnumber.length;

      mul = 0,
      prodArr = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]],
      sum = 0;

      while (len--) {
          sum += prodArr[mul][parseInt(ccnumber.charAt(len), 10)];
          mul ^= 1;
      }

      if(/^(34)|^(37)/.test(ccnumber)) {
        cardType = "American Express";
        document.getElementById("card_replace").className = "fa fa-cc-amex";
      } if (/^5[1-5]/.test(ccnumber)) {
        cardType = "MasterCard";
        document.getElementById("card_replace").className = "fa fa-cc-mastercard";
      } if (/^4/.test(ccnumber)) {
        cardType = "Visa"
        document.getElementById("card_replace").className = "fa fa-cc-visa";
      }
    };
}]);