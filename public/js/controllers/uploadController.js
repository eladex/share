'use strict';


angular


    .module('app', ['ui.bootstrap','ngTagsInput'])

    
    
    .controller('uploadController', ['$scope', 'tagsService','classificationService', function($scope, 
  tagsService, classificationService) {
        Dropzone.options.autoDiscover = false;
        var that = this;
        this.myDropZone = new Dropzone("div#myDropZone",{ 
            url: "http://localhost:3000/api/file/upload",
            autoProcessQueue: false,
            clickable: true,
             previewTemplate: '<div style="display:none"></div>',
            parallelUploads: 1,
            uploadMultiple: true,
            paramName: 'files',
            maxFiles: 6000,
            
        });
        
        
        
//        var myDropZone = $scope.myDropZone = new Dropzone("div#myDropZone",{ 
//            url: "http://localhost:3000/api/file/upload",
//            autoProcessQueue: false,
//            clickable: true,
//             previewTemplate: '<div style="display:none"></div>',
//            parallelUploads: 1,
//            uploadMultiple: true,
//            paramName: 'files',
//            maxFiles: 6000,
//            
//        });
        
        this.myDropZone.on("addedfile", function(file) { 
            file.moreData = {
                tags: [],
                classification:{
					source:"",
					publishProcedure:"",
                    sp:"",
				},
                lastModified: file.lastModifiedDate,
            }
            file.invalid = false;
            that.totalSize += file.size;
            that.updateTotalProgress();
            $scope.$apply();

        });
        
        this.myDropZone.on("complete", function(file){
            $scope.$apply();
//            myDropZone.processQueue();
        });
        
                      
        this.myDropZone.on("sending", function(file, xhr, formData){
            formData.append("moreData", JSON.stringify(file.moreData));
            console.log(formData);
        });
        
        
        this.myDropZone.on('removedfile', function(file){
            if(that.totalSize > 0){
                that.totalSize -= file.size;
                that.updateTotalProgress();    
            }

        });
        
        
        
        this.myDropZone.on('error',function(file, error){
            console.log(error);
        });
        this.myDropZone.on('totaluploadprogress', function(progress, totalBytes, totalBytesSent){
            that.updateTotalProgress();
        });
//        this.on('uploadprogress', function(file, progress, bytesSent){
//                    totalSent+= bytesSent;
//                    $scope.totalProgress = Math.ceil(100*(totalSent/ totalSize));
//        });
        
        
        this.totalSize = 0;
        this.totalProgress = 0;
        
        this.updateTotalProgress = function(){
            var totalProg =0;
            this.myDropZone.files.forEach(function(file){
                totalProg += file.upload.progress *(file.size/ that.totalSize);
            });
            this.totalProgress = totalProg;    
        }
        
        
        this.removeAllFiles = function(){
            this.myDropZone.removeAllFiles();
            this.totalSize =0;
            this.totalProgress = 0;
        }
        this.loadSources = function(query) {
            return classificationService.searchSources(query)
                .then(function(res){
                return res.data;
            });
        };

        this.loadPublishPrecedure = function(query){
            return classificationService.searchPublishPrecedure(query)
                .then(function(res){
                return res.data;
            });
        };

        this.loadShoss = function(query){
            return classificationService.searchShoss(query)
                .then(function(res){
                return res.data;
            });
        };

        this.loadTags = function(query) {
            return tagsService.searchTags(query);
        };
        this.uploadFile = function (file) {
            if(file.moreData.classification.source){
                file.invalid= false;
                this.myDropZone.processFile(file);
            }
            else{
                file.invalid= true;
            }
        };
        this.uploadMultiple = function(){
            this.myDropZone.files.forEach(this.uploadFile, this);
        };
        this.inputValSelected= function(val) {
            return (val.Name === undefined || val.Name==="") ? false : true;
        };        

    }]);
