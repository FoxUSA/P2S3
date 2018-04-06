p2s3.controller("SignController", function ($scope) {
    $scope.actions = {
        putObject: "putObject",
        getObject: "getObject"
    };
    $scope.mimeType="";
    $scope.defaultURL=true;
    $scope.mimeType="application/zip";
    $scope.action=$scope.actions.putObject;

    //expiration defaults
        $scope.expiration=900;
        $scope.secondsTable = {
            "Second(s)": 1,
            "Minute(s)": 60,
            "Hour(s)": 3600,
            "Day(s)": 86400
        };
        $scope.expMult=$scope.secondsTable["Second(s)"];//Default value

    //Simple toastr wrappers for success and failure
        $scope.success=function(){
            toastr.success("Link copied to clipboard", "Success");
        };

        $scope.fail=function(){
            toastr.error("Unable to copy to clipboard", "Error");
        };

    /**
     * Main function that geneates and returns a signed url
     * @return {[type]} [description]
     */
    $scope.sign = function() {

        var s3Params = {
            accessKeyId:$scope.accessKeyId,
            secretAccessKey:$scope.secretAccessKey,
            s3ForcePathStyle: true,
            signatureVersion: "v2"//required for really long tokens
        };

        if(!$scope.defaultURL)//Override the endpoint url if your using a custom s3 api like minio
            s3Params.endpoint=$scope.url;

        var s3= new AWS.S3(s3Params);

        var urlParams = {
            Bucket:$scope.bucket,
            Key:$scope.path,
            Expires: Math.floor($scope.expiration * $scope.expMult)
        };

        if($scope.action==$scope.actions.putObject){
            urlParams.ContentType=$scope.mimeType;
            if($scope.encryption)
                urlParams.ServerSideEncryption = "AES256";
        }


        s3.getSignedUrl($scope.action,urlParams,function(err,data){
            if(err)
                throw err;

            $scope.output={
                signedURL: data,
                p3s3URL: location.origin+location.pathname+"#/upload/?url="+encodeURIComponent(data)
            };

            toastr.success("Signed URL generated", "URL");
        });
    };


});
