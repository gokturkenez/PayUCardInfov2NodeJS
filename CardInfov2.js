/*
Author: Gokturk Enez
Mail: hi@gokturkenez.com.tr
Description: PayU Turkey Card Info v2 Node JS Sample Code
*/

var EndPointUrl = 'https://secure.payu.com.tr/api/card-info/v2/';
Merchant = 'OPU_TEST';
SecretKey = 'SECRET_KEY';
LoyaltyPoints = 'true';
cardCVV = '000';
cardHolder = 'Dummy Dummy';
ExpYear = '2018';
ExpMonth = '12';
CardNumber = '4355084355084358';

var moment = require('moment');
date = moment.utc().format('YYYY-MM-DDTHH:mm:ss+00:00').toString();

var array =  {
    'merchant': Merchant,
    'extraInfo': LoyaltyPoints,
    'dateTime': date,
    'cc_cvv': cardCVV,
    'cc_owner': cardHolder,
    'exp_year': ExpYear,
    'exp_month': ExpMonth,
    'cc_number': CardNumber
};

hashstring = '';
var sortKeys = require('sort-keys');
sorted = sortKeys(array)
for (var k in sorted) {
    hashstring += array[k].length + array[k] ;
}

var hash = require('crypto')
    , data = hashstring
    , secretkey = SecretKey;

signature = hash.createHmac('sha256', secretkey).update(data).digest('hex');
array['signature'] = signature

var request = require("request");
request.post(EndPointUrl, {form:array}, function(error, response, body) {
    console.log(error);
    //console.log(response);
    console.log(body);

});
