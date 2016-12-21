app.factory('reportsService', function($resource){
   return $resource('js/reportlist.json/:reportId')
});
