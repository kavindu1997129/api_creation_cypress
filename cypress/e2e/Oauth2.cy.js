/// <reference types = "cypress"/>

describe('Getting access token',()=>{

    var clientID = ''
    var clientSecret = ''
    var base64Key = ''
    const sslCertificate = require('get-ssl-certificate')

    it('access token',()=>{

        cy.request({

            method: "POST",
            url: "https://localhost:9443/client-registration/v0.17/register",
            headers: {
                "Authorization": "Basic YWRtaW46YWRtaW4=",
                "Content-Type" : "application/json"
            },
            body:{
                "callbackUrl":"www.google.lk",
                "clientName":"rest_api_publisher",
                "owner":"admin",
                "grantType":"client_credentials password refresh_token",
                "saasApp":true
            }
        }).then((res)=>{
            cy.log(JSON.stringify(res))
            expect(res.status).to.equal(200)

            clientID = res.body.clientId;
            clientSecret = res.body.clientSecret;
            base64Key = btoa(clientID+clientSecret);
            cy.log(btoa(clientID+clientSecret))
            
            var curlValue1 = "curl https://localhost:8243/token -k \
            -H 'Authorization: Basic "+base64Key+"' \
            -d 'grant_type=password&username=admin&password=admin&scope=apim:api_view apim:api_create'";

            cy.exec(curlValue1).then((resAccess) => {

                cy.log(JSON.stringify(resAccess))

            })

            // cy.request({
            //     method: "POST",
            //     url: "https://localhost:8243/token",
            //     sslCertificate:false,
            //     form: true,
            //     headers: {
            //         "Authorization": "Basic "+ base64Key,
            //     },
            //     body: "grant_type=password&username=admin&password=admin&scope=openid apim:api_create",
            //     //"grant_type=password&username=admin&password=admin&scope=apim:api_view apim:api_create"
                    
            //     //{
            //         // "grant_type":"password",
            //         // "username":"admin",
            //         // "password":"admin",
            //         // "scope":"apim:api_view", 
            //         // "apim":"api_create"
            //         //"grant_type=password&username=admin&password=admin&scope=apim":"api_view",
            //         //"apim":"api_create"
            //     //}


            // })

        })
        
        

    })

})