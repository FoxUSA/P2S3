p2s3.controller("UploadController", function ($scope, $location, $timeout, Upload) {
    $scope.uploadInfo={};

    /**
     * Actually upload the file to s3
     * @param  file
     */
    $scope.upload = function(file){
        if(!file)
            return;

        if($scope.uploadInfo.contentType &&$scope.uploadInfo.contentType!=file.type)
            return toastr.error("File must be a "+$scope.uploadInfo.contentType, "Error");

        Upload.http({
            url:$scope.uploadInfo.url,
            data:file,
            method:"PUT",
            headers:{"Content-Type": file.type}
        }).then(function(){//Success
            toastr.success("Upload complete", "Success");
            $timeout(function(){
                $scope.progress=0;
            },1000);
        },function(error){//error
            toastr.error("Upload failed "+error.statusText, "Error");
        },function(evt){//progress
            $scope.progress=Math.min(100,parseInt(100.0 * evt.loaded /evt.total));
        });
    };

    /**
     * Extract get parameters from a given url
     * @param url - url to extract from
     * @param parameter - you want to extract
     * @return - value of the parameter
     */
    var getQueryVariable= function(url, parameter) {
        parameter = parameter.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + parameter + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return "";
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    /**
     * Update all form values
     */
    $scope.updateForm=function(url){
        $scope.uploadInfo.url=url;
        $scope.uploadInfo.contentType=getQueryVariable(url, "Content-Type");
        var expires = new Date(getQueryVariable(url,"Expires")*1000);
        if(url&&expires<(new Date()).getTime())
            toastr.error("Link has expired. Ask sender to generate another.", "Error");
        $scope.uploadInfo.expiresString =expires.toString();
    };

    //See if any data was passed in
        var url = $location.search().url;
        if(url){
            try{
                $scope.updateForm(url);
            }
            catch(error){
                toastr.error("Invalid data passed in", "Error");
            }
        }
});
