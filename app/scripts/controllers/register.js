'use strict';

function paperInput($templateCache) {
  function linkFn(scope, element, attrs) {
    scope.isRequired = angular.isDefined(attrs.required);
    scope.isDatepicker = angular.isDefined(attrs.date);
    scope.state = {
      opened : false
    };

    if (scope.isDatepicker) {
    
      scope.openDatePicker = function($event) {
        event.preventDefault(event);
        event.stopPropagation();
        scope.state.opened = true;
      };

    }
  }
  return {
    link: linkFn,
    template: $templateCache.get('paperInput'),
    scope: {
      label: '@',
      type: '@',
      modelRef: '='
    }
  };
}

function paperInputDate($templateCache) {
  function linkFn(scope, element, attrs) {
    scope.isRequired = angular.isDefined(attrs.required);
    scope.state = {
      opened : false
    };

      scope.openDatePicker = function($event) {
        event.preventDefault(event);
        event.stopPropagation();
        scope.state.opened = true;
      };


  }
  return {
    compile: function(tElement,tAttrs){
      var groupEl = tElement[0].querySelector('.paper-input');
      var input = tElement[0].querySelector('input');
      // if(tAttrs.date){
        groupEl.setAttribute('ng-click','openDatePicker($event)');
        input.setAttribute('is-open','state.opened');
        input.setAttribute('datepicker-popup','dd.MM.yyyy');
      // }
      return linkFn;
    },
    template:$templateCache.get('paperInput'),
    scope: {
      label: '@',
      type: '@',
      modelRef: '='
    }
  };
}

// function paperRadio($templateCache) {
//   function linkFn(scope, element, attrs) {
//     var label = element.find('label');
//     var input = element.find('input');

//     scope.cssClass = '';
//     scope.animationDir = '';

//     scope.invokeAnimation = function() {
//       scope.cssClass = scope.cssClass === '' ? 'circle' : '';
//       scope.animationDir = scope.animationDir === '' ? true : !scope.animationDir;
//     };

//     label.on('click', function(evt) {

//       // find the first span which is our circle/bubble
//       var el = angular.element(this).children().eq(0),
//         newone = null,
//         circleSpanElements = null;

//       // add the bubble class (we do this so it doesnt show on page load)
//       el.addClass('circle');

//       // clone it
//       newone = el.clone(true);

//       // add the cloned version before our original
//       el.after(newone);
//       // el[0].insertAdjacentHTML('beforebegin', newone[0]);

//       // remove the original so that it is ready to run on next click
//       circleSpanElements = label[0].querySelectorAll('.circle');
//       angular.element(circleSpanElements).eq(0).remove();
//       // scope.$apply(function(){});
//     });


//   }
//   return {
//     link: linkFn,
//     transclude: true,
//     template: $templateCache.get('paperRadio'),
//     scope: {
//       label: '@',
//       model: '=',
//       idx: '@'
//     }
//   };
// }

  app
  .directive('paperInput', paperInput)
  .directive('paperInputDate', paperInputDate);
  // .directive('paperRadio', paperRadio);




