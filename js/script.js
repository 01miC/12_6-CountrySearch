$(function () {
    var url = 'https://restcountries.eu/rest/v1/name/';
    var countriesList = $('#countries');
    
    $('#search').click(searchCountries);
    $('#country-name').keypress(function(e) {
        if(e.which == 13) {
            searchCountries();
        }
    });
    
function searchCountries() {
    var countryName = $('#country-name').val();
if(!countryName.length) 
        countryName = 'Poland';

    $.ajax({
        url: url + countryName,
        method: 'GET',
        success: showCountriesList,
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            notFound();
        }       
    });

        function showCountriesList(resp) {
            var error = $('#error');
                error.removeClass('error').text('List of countries: ');

            countriesList.empty();
            resp.forEach(function(item) {
                var divCountryCont = $('<div>').addClass('country-cont');
                var newLine = $('<li>').appendTo(countriesList);
                var countryLeft = $('<div>').addClass('country-left');
                var countryRight = $('<div>').addClass('country-right');
                var flag = item.alpha2Code;
                var sq = '\xB2';
            
                    divCountryCont.appendTo(newLine);   
                    $('<img>').attr('src', "http://www.geonames.org/flags/x/" + flag.toLowerCase() + ".gif").appendTo(divCountryCont);
                    $('<h1>').text(item.name + ", " + item.alpha3Code).appendTo(divCountryCont);
                        $('<div>').addClass('country-span').text('More information:').appendTo(divCountryCont);
                            countryLeft.appendTo(divCountryCont);  
                                    $('<div>').text('Population').appendTo(countryLeft);
                                    $('<div>').text('Capital').appendTo(countryLeft);
                                    $('<div>').text('Area').appendTo(countryLeft);
                                    $('<div>').text('Native Name').appendTo(countryLeft);
                                    $('<div>').text('Region').appendTo(countryLeft);
                                    $('<div>').text('Time Zone').appendTo(countryLeft);
                                    $('<div>').text('Domains').appendTo(countryLeft);
                            countryRight.appendTo(divCountryCont);
                                    $('<div>').text(" : " + item.population + " osób").appendTo(countryRight);
                                    $('<div>').text(" : " + item.capital).appendTo(countryRight);
                                    $('<div>').text(" : " + item.area + " km" + sq).appendTo(countryRight);
                                    $('<div>').text(" : " + item.nativeName).appendTo(countryRight);
                                    $('<div>').text(" : " + item.region + " ," + item.subregion).appendTo(countryRight);
                                    $('<div>').text(" : " + item.timezones[0]).appendTo(countryRight);
                                    $('<div>').text(" : " + item.topLevelDomain[0]).appendTo(countryRight);
                        $('<div>').addClass('country-span').appendTo(divCountryCont);
            });
            
            error.text('List of countries: found ' + $('ul#countries li').length);
        }

        function notFound() {
            countriesList.empty();
            $('#error').addClass('error').text('Not found, try again');
            
        }
}


    
});

