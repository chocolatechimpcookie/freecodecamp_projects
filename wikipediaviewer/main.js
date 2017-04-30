//$(function()
//{
//
//    
//    $("#random_article").on("click", function()
//    {
//    
//    
//    });
//
//
//
//
//
//
//
//});

//angular 1.6.1
//jsonp
//cors

angular.module('wikiviewer', []).config(function($sceProvider)
{
  $sceProvider.enabled(false);
});

angular.module('wikiviewer')
    .controller("maincontroller",['$http',  function($http)
{
    console.log("controller works");
    var vm = this;
    vm.search_input = "";
    vm.search_results = [];
    var page_url = "https://en.wikipedia.org/?curid=";
    
    vm.search = function ()
    {
        vm.search_results = [];
        console.log(vm.search_input);
        var the_call=
        'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='+
        vm.search_input;
        
//No longer required for 1.6.1
//        '&callback=JSON_CALLBACK';
        
        $http.jsonp
        (the_call)
        
//        $http
//        ({
//            method: 'POST',
//            url:the_call,
//            responseType: 'json'
//         })
        
        
        .then(function success(response)
        {            
            var search_results = response.data.query.pages;
            angular.forEach (search_results, function (value, key)
            {
                vm.search_results.push
                ({
                    title:value.title,
                    page: page_url + value.pageid,
                    body: value.extract,
//                    thumbnail: value.thumbnail.source
                })
            });
//            
        },
        function err(status)
        {
            console.log("fail");
            //console.log(data);
            console.log(status);
        
        });
    };
    
    vm.clear = function ()
    {
    
        vm.search_input = "";
        vm.search_results = [];
    };


}]);







