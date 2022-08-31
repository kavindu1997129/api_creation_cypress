/// <reference types = "cypress"/>

describe('Getting access token',()=>{

    var clientID = ''
    var clientSecret = ''
    var base64Key = ''
    var curlValue = ''
    var access_token1 = ''
    var testingasd = ''

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
            expect(res.status).to.equal(200)

            clientID = res.body.clientId;
            clientSecret = res.body.clientSecret;
            base64Key = btoa(clientID+":"+clientSecret);
            
            curlValue = "curl https://localhost:8243/token -k \
            -H 'Authorization: Basic "+base64Key+"' \
            -d 'grant_type=password&username=admin&password=admin&scope=apim:api_view apim:api_create'";
            
            cy.exec(curlValue).then("getting data",(resAccess) => {

                cy.log(JSON.parse(resAccess.stdout))
                testingasd = resAccess.stdout;
                access_token1 = "b92dd224-0f23-3df8-9644-d5cc6a72e60d";
                module.exports = {access_token1}
            })

        })

    })

    it("SearchAPI",()=>{
        
        // cy.request({
        //     method: 'GET',
        //     url: "https://localhost:9443/api/am/publisher/v1/apis",
        //     headers:{
        //         "Authorization": "Bearer "+ access_token1
        //     }
        // }).then((res)=>{
        //     cy.log(res)
        // })
        cy.exec("curl -k -H 'Authorization: Bearer "+access_token1+"' 'https://127.0.0.1:9443/api/am/publisher/v1/apis'").then((res)=>{
            cy.log(JSON.stringify(res))
        })

    })

})