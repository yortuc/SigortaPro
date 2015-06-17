(function(){

    'use strict';

    function insertAfter(newElement,targetElement) {
        //target is what you want it to go after. Look for this elements parent.
        var parent = targetElement.parentNode;
        
        //if the parents lastchild is the targetElement...
        if(parent.lastchild == targetElement) {
            //add the newElement after the target element.
            parent.appendChild(newElement);
            } else {
            // else the target has siblings, insert the new element between the target and it's next sibling.
            parent.insertBefore(newElement, targetElement.nextSibling);
            }
    }

    var validators = {
        required: {
            test: function(t){
                return (t!==undefined) && (t!==null) && (t.length > 0);
            },
            invalidMsg: "Bu alanı doldurunuz"
        },
        email: { 
            test: function (t) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(t);
            },
            invalidMsg: "Lütfen geçerli bir e-posta adresi giriniz."
        },
        phone: {
            test: function (t) {
                return (t.length === 11) &&
                       (new RegExp(/[0][5+][0-9]{9}/g)).test(t);
            },
            invalidMsg: "Lütfen geçerli bir cep telefonu numarası giriniz."
        },
        phone2:{
            test: function (t) {
                return (t.length === 11) &&
                       (new RegExp(/[0][0-9]{10}/g)).test(t);
            },
            invalidMsg: "Lütfen geçerli bir telefon numarası giriniz."
        },
        url: {
            test: function (t) {
                var re = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
                return re.test(t);
            },
            invalidMsg: "Lütfen geçerli bir url giriniz."
        }
    };

    angular.module("sgpApp").directive("validatr", function() {
        return {
            restrict: 'A', // restrict to an attribute type.
            
            require: 'ngModel', // element must have ng-model attribute.
            
            // scope = the parent scope
            // elem = the element the directive is on
            // attr = a dictionary of attributes on the element
            // ctrl = the controller for ngModel.
            link: function(scope, elem, attr, ctrl) {

                var tip = attr.validatr;
                var elmMsg = angular.element('<label class="item assertive"></label>');

                elem[0].parentNode.insertBefore(elmMsg[0], elem[0].nextSibling);

                console.log(elem[0].parentNode);

                var validateChain = function(value){
                    var ret = true;

                    // parse validators
                    var arr_validators = tip.split(',');

                    // validate each validator
                    for(var i=0; i<arr_validators.length; i++){

                        var v = arr_validators[i];
                        var local_valid = validators[v].test(value);
                        
                        if(!local_valid){
                            elmMsg.text( validators[v].invalidMsg );
                            elem.parent().addClass("assertive-bg");
                            return false;  
                        }

                        ret = (ret && local_valid);
                    }

                    if(ret){
                        elmMsg.text("");
                        elem.parent().removeClass("assertive-bg");
                    }

                    return ret;
                };

                ctrl.$parsers.unshift(function(value) {
                    // test and set the validity after update.
                    var valid =  validateChain(value);
                    ctrl.$setValidity('validatrValidate', valid);

                    console.log( "parser", valid );

                    // if it's valid, return the value to the model, 
                    // otherwise return undefined.
                    return valid ? value : undefined;
                });
                
                ctrl.$formatters.unshift(function(value) {
                    // validate.
                    var valid = (value === undefined) || validateChain(value);
                    ctrl.$setValidity('validatrValidate', valid );
                    
                    console.log( "formatter", valid );

                    // return the value or nothing will be written to the DOM.
                    return value;
                });
            }
        };
    });

})();