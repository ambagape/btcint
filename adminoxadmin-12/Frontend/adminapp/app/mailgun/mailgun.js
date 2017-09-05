/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('tempoApp.mailgun',[])
      .service('mailer', function (config,$http) {
    return {
        send: function (person) {          
            return $http.post(config.mailServer, {                            
                            "name": person.name,
                            "email": person.email,
                            "activationCode": person.activationCode
                        });
            
        }

    };
});

