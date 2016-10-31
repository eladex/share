angular.module("app").directive('typeaheadInput', function(){
    return {
        restrict: 'E',
        scope:{
            model: '=',           //required
            label: '@',
            typeaheadOptions: '&',//required
			optionsParamName: '@',//required
            onSelect: '&',
			onSelectParamName: '@',
            placeholder: '@',
            hasError: '=?',
			textField: '@',
            errorMsg: '@',
        },
        template: function(tElem, tAttrs){
			var tOnSelect = "", paramName = tAttrs['optionsParamName'];
			var textField;
			if(tAttrs.hasOwnProperty('onSelect')){
				tOnSelect = 'typeahead-on-select="realOnSelect(model)"';
			}
			if(tAttrs.hasOwnProperty('textField')){
				textField = '.'+tAttrs['textField'];
			}
			var template = 
				'<div ng-class="{\'has-error\':hasError}">'+
        			'<div class="control-label" style="margin-bottom:3px">{{::label}}:</div>' +
                    '<div style="color:red" ng-show="hasError">{{::errorMsg}}</div>'+
                	'<input type="text" ng-model="model" placeholder="{{::placeholder}}" '+
                    	'uib-typeahead="val as val' + textField +' for val in typeaheadOptions({'+paramName+':$viewValue})"'+
                    	'typeahead-loading="loading" typeahead-no-results="noResults"'+
                    	'typeahead-editable="false" class="form-control"'+
                    	tOnSelect+
                    	'typeahead-min-length ="3" typeahead-wait-ms="200">' +
                    '<i ng-show="loading" class="glyphicon glyphicon-refresh"></i>' +
				'</div>';
			return template;
		},
        link: function(scope, elem, attrs) {
			if(scope.onSelect){
                scope.realOnSelect = function(val){
					var param ={};
					param[scope.onSelectParamName] = val;
                	scope.hasError = !scope.onSelect(param);
            	}
            }
            if(!scope.hasError){
                scope.hasError= false;
            } 
            if(!scope.placeholder){
                scope.placeholder = scope.label;
            }
            if(!scope.getOptions){
                scope.getOptions = function(){};
            }
            
            
        }
    };
});