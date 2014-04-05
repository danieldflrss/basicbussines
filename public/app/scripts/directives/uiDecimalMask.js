'use strict';
angular.module('basicbussines')
      .directive('uiDecimalmask',function(){
          return function(scope,element,attr){

              var mask = attr.uiDecimalmask;

              if(!mask || !mask.match){
                  throw 'Provide some mask to decimalMask plugin please.';
              }

              var
                    v,
                    is = (function(){
                        v = mask.match(/[0-9]{1,}/);
                        return v !== null ? v[0].length : 0;
                    })(),
                    ds = (function(){
                        v = mask.match(/[0-9]{1,}$/);
                        return v !== null ? v[0].length : 0;
                    })(),
                    sep = (function(){
                        v = mask.match(/,|\./);
                        return v !== null ? v[0] : null;
                    })(),
                    matcher = null,
                    tester = null,
                    events = /.*MSIE 8.*|.*MSIE 7.*|.*MSIE 6.*|.*MSIE 5.*/.test(navigator.userAgent) ? 'keyup propertychange paste' : 'input paste';

              if(sep === null){
                  tester = new RegExp('^[0-9]{0,' + is + '}$');
                  matcher = new RegExp('[0-9]{0,' + is + '}','g');
              }else{
                  tester = new RegExp('^[0-9]{0,' + is + '}' + (sep === '.' ? '\\.' : ',') + '[0-9]{0,' + ds + '}$|^[0-9]{0,' + is + '}' + (sep === '.' ? '\\.' : ',') + '$|^[0-9]{0,' + is + '}$');
                  matcher = new RegExp('[0-9]{0,' + is + '}' + (sep === '.' ? '\\.' : ',') + '[0-9]{0,' + ds + '}|[0-9]{0,' + is + '}' + (sep === '.' ? '\\.' : ',') + '|[0-9]{0,' + is + '}','g');
              }

              function handler(e){
                  var self = element;
                  if(self.val() !== e.data.ov){
                      if(!tester.test(self.val())){
                          var r = self.val().match(matcher);
                          self.val(r === null ? '' : r[0]);
                      }
                      //var ov = e.data.ov = self.val();
                  }
              }

              element
                    .attr('maxlength',(is + ds + (sep === null ? 0 : 1)))
                    .val(element.val().replace('.',sep))
                    .bind(events,{ov : element.val()},handler);

          };
      });