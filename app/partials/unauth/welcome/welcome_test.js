/**
 * Created by mf57 on 04.09.2016.
 */
'use strict';

describe('myApp.welcome module', function() {

    beforeEach(module('myApp.welcome'));

    describe('welcome controller', function(){

        it('should ....', inject(function($controller) {
            //spec body
            var welcomeCtrl = $controller('WelcomeController');
            expect(welcomeCtrl).toBeDefined();
        }));

    });
});