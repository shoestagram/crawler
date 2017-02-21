function unique(arr1, arr2) {
    var uniqueArr = [];
    var uniqueIds = [];

    var ids1 = arr1.map(item => item.id);
    var ids2 = arr2.map(item => item.id);
    
    
    ids1.forEach(function(item){
        if(ids2.indexOf(item) === -1){
            uniqueIds.push(item);
        }
    });
    
    
    arr1.forEach(function(eachObject){
        uniqueIds.forEach(function(eachID){
            if(eachObject.id === eachID){
                uniqueArr.push(eachObject)
            }
        });
    });
    
    return uniqueArr;
}

var arr1 = [{
        id: 123,
        url: 'http://google.ca'
    }, {
        id: 45,
        url: 'http://yahoo.ca'
    },
    {
        id: 002,
        url: 'http://bing.com'
    },
    {
        id: 33,
        url: 'http://netscape.net'
    }
];

var arr2 = [
    {
        id: 002,
        url: 'http://bing.com'
    },
    {
        id: 33,
        url: 'http://netscape.net'
    }
];

console.log(unique(arr1, arr2));
