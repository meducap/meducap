meducap.controller('LoginCtrl', function($scope, $http, $location,$timeout, auth){



    $scope.user = {};
    $scope.login = function(user){
        console.log(user);

        $http.get('js/data.json').then(function(resp){
            var users = resp.data[0];
            if(users[user.username] && users[user.username]== user.password){
                auth.setUser(user);
                $location.url('/dash');

            }else{
                console.log('invalid');
                $scope.errorLogin = true;
                $timeout(function(){
                    $scope.errorLogin = false;
                },2000)
            }
        })
    }
});
meducap.controller('AppCtrl', function($scope, $http, $q,$location, auth) {
    if(auth.getUser()==null){
        $location.url('/')
    }
    var healthcareUri = 'https://meducap-449a5.firebaseio.com/healthcare';
    var schoolUri = 'https://meducap-449a5.firebaseio.com/schools';
    $scope.currentUser = auth.getUser();
    $scope.logout = function(){
        auth.deleteAuth();
        $location.url('/')
    };


    $scope.firebaseURL = 'https://kidung.firebaseio.com/songs';
    $scope.firebaseData = [];
    $scope.headerData = [];
    $scope.loaded = false;
    $scope.loading = false;

    $scope.changed = function() {
        $scope.loaded = false;
    };
    $scope.getFilename = function() {
        var a = $scope.firebaseURL.split('.');
        var b = a[0].split('//');
        return b[1];
    };
    $scope.load = function(url, callback) {
        $scope.firebaseURL = url;
        var def = $q.defer();
        $scope.loading = true;
        $http.get($scope.firebaseURL + '.json').success(function(data) {
            var ctr = 0;
            var maxCount = 0;
            var maxItem = {};
            var res = _.map(data, function(item, key) {
                var count = 0;
                for (var k in item) {
                    if (item.hasOwnProperty(k)) {
                        ++count;
                    }
                }
                if (maxCount < count) {
                    maxCount = count;
                    maxItem = item;
                }
                ctr++;
                return item;
            });
            $scope.firebaseData = res;
            var temp = [];
            for (var k in maxItem) {
                temp.push(k);
            }
            $scope.headerData = temp;
            $scope.loaded = true;
            $scope.loading = false;
            callback($scope.firebaseData,$scope.headerData);
            def.resolve(res);
        });
        return def.promise;
    };

    $scope.getHeader = function() {
        return $scope.headerData;
    };

    $scope.download = function() {
        return _.map($scope.firebaseData, function(item) {
            var obj = {};
            _.each($scope.headerData, function(header) {
                obj[header] = item[header];
                if (header.indexOf("date") > -1) {
                    obj[header] = moment(item[header]).format('YYYY-MM-DD');
                }
            });
            return obj;
        });
    };

    $scope.load(healthcareUri, function(firebaseData,headerData){
        $scope.healthCareLoaded = true;
        $scope.headerH = headerData;
    });
    $scope.load(schoolUri, function(firebaseData,headerData) {
        $scope.schoolLoaded = true;
        $scope.headerS = headerData;
    });

});