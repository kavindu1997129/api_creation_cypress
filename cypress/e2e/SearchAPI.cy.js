/// <reference types = "cypress"/>

import {access_token1} from "./Oauth2.cy.js"

describe('Searching API',()=>{

    it('searching api',()=>{
        cy.log(access_token1)
    })
})