var app = require('../app');
var request = require('supertest');
var UsersModel = require('../models/users');
jest.setTimeout(30000);

let token ='' 

describe('create account', () => {

    test('new user', async(done)=>{
        let res = await request(app)
            .post('/sign-up')
            .send(
        {
            'avatar':'','name':'Bibliothèque de Jest', 'email':'jest@jest.com', 'password':'jest', 
            'styles':  JSON.stringify({"BD & Jeunesse": ["BD, Comics","Livre jeunesse"]}), 
            'length': ["Je n'ai pas de préférence, tant que le livre est bon"] , 
            'period': ["Les deux"]
            })
            .expect(200)
        expect(res.body.userToken).toBeDefined();
        token = res.body.userToken
        done()
    });

    test('wrong info : existing user', async(done)=>{
        let res = await request(app)
            .post('/sign-up')
            .send(
        {
            'avatar':'','name':'Bibliothèque de Jest', 'email':'jest@jest.com', 'password':'jest', 
            'styles':  JSON.stringify({"BD & Jeunesse": ["BD, Comics","Livre jeunesse"]}), 
            'length': ["Je n'ai pas de préférence, tant que le livre est bon"] , 
            'period': ["Les deux"]
            })
            .expect(200)
        expect(res.body.result).toEqual(false);
        expect(res.body.message).toEqual("Il existe déjà un compte associé à cet email. Vous pouvez y accéder en vous connectant.");
        done()
    });

    test('wrong info : missing values', async(done)=>{
        let res = await request(app)
            .post('/sign-up')
            .send(
        {   'avatar':'','name':'', 'email':'', 'password':'', 
            'styles':  JSON.stringify({"BD & Jeunesse": ["BD, Comics","Livre jeunesse"]}), 
            'length': ["Je n'ai pas de préférence, tant que le livre est bon"] , 
            'period': ["Les deux"]
            })
            .expect(200)
        expect(res.body.result).toEqual(false);
        expect(res.body.message).toEqual("Veuillez remplir tous les champs pour créer un compte.");
        done()
    });

});

describe('log-in', () => {
    test('existing user', async(done)=>{
        let res = await request(app)
            .post('/log-in')
            .send(
        {
            'email':'jest@jest.com', 
            'password': 'jest'
            })
            .expect(200)
        expect(res.body.userToken).toEqual(token);
        done()
    });


    test('wrong info : missing values', async(done)=>{
        let res = await request(app)
            .post('/log-in')
            .send(
                {'email':'', 
                 'password': ''})
            .expect(200)
        expect(res.body.login).toEqual(false);
        expect(res.body.message).toEqual("Veuillez remplir tous les champs pour accéder à votre compte.");
        done()
    });

    test('wrong info : wrong password', async(done)=>{
        let res = await request(app)
            .post('/log-in')
            .send(
            {
                'email':'jest@jest.com', 
                'password': 'wrongpassword'
                })
            .expect(200)
        expect(res.body.login).toEqual(false);
        expect(res.body.message).toEqual("Le mot de passe est erroné, veuillez réessayer...");
        done()
    });

    test('wrong info : non existing user', async(done)=>{
        let res = await request(app)
            .post('/log-in')
            .send(
            {
                'email':'bou@loulou.com', 
                'password': 'wrongpassword'
                })
            .expect(200)
        expect(res.body.login).toEqual(false);
        expect(res.body.message).toEqual("Nous ne trouvons pas de compte associé à cet email et ce mot de passe, veuillez réessayer ou créer un compte.");
        done()
    });
});



describe('library', () => {
    test('ajout livre', async(done)=>{
        let result = await request(app)
            .post(`/library/add/${token}/qhEeEAAAQBAJ`)
            .expect(200)
        expect(result.body.result).toEqual(true);
        done()
    })

    test('livre déjà dans la bibliothèque', async(done)=>{
        let result = await request(app)
            .post(`/library/add/${token}/qhEeEAAAQBAJ`)
            .expect(200)
        expect(result.body.result).toEqual(false);
        expect(result.body.message).toEqual("Livre déjà dans votre bibliothèque");
        done()
    })

    test('recuperation bibliotheque', async(done)=>{
        let result = await request(app)
            .post(`/library`)
            .send({token: token})
            .expect(200)
        expect(result.body.result).toEqual(true);
        expect(result.body.library[0].bookid).toEqual('qhEeEAAAQBAJ');
        done()
    })

    test('suppression livre', async(done)=>{
        let result = await request(app)
            .delete(`/library/delete/${token}/qhEeEAAAQBAJ`)
            .expect(200)
        expect(result.body.result).toEqual(true);
        done()
    })

    test('livre déjà supprimé', async(done)=>{
        let result = await request(app)
            .delete(`/library/delete/${token}/qhEeEAAAQBAJ`)
            .expect(200)
        expect(result.body.result).toEqual(false);
        expect(result.body.message).toEqual("livre déjà supprimé de votre bibliothèque");
        done()
    })

    test('not connected', async(done)=>{
        let result = await request(app)
            .post(`/library`)
            .send({token: ''})
            .expect(200)
        expect(result.body.result).toEqual(false);
        expect(result.body.message).toEqual("Nous n'avons pas vu vous identifier");
        done()
    })
})

describe('wishlist', () => {
    test('ajout livre', async(done)=>{
        let result = await request(app)
            .post(`/wishlist/add/${token}/USunCgAAQBAJ`)
            .expect(200)
        expect(result.body.result).toEqual(true);
        done()
    })


    test('livre déjà dans la wishlist', async(done)=>{
        let result = await request(app)
            .post(`/wishlist/add/${token}/USunCgAAQBAJ`)
            .expect(200)
        expect(result.body.result).toEqual(false);
        expect(result.body.message).toEqual("Livre déjà dans votre wishlist");
        done()
    })

    test('recuperation wishlist', async(done)=>{
        let result = await request(app)
            .post(`/wishlist`)
            .send({token: token})
            .expect(200)
        expect(result.body.result).toEqual(true);
        expect(result.body.wishlist[0].bookid).toEqual('USunCgAAQBAJ');
        done()
    })

    test('suppression livre', async(done)=>{
        let result = await request(app)
            .delete(`/wishlist/delete/${token}/USunCgAAQBAJ`)
            .expect(200)
        expect(result.body.result).toEqual(true);
        done()
    })

    test('livre déjà supprimé', async(done)=>{
        let result = await request(app)
            .delete(`/wishlist/delete/${token}/USunCgAAQBAJ`)
            .expect(200)
        expect(result.body.result).toEqual(false);
        expect(result.body.message).toEqual("livre déjà supprimé de votre wishlist");
        done()
    })

    test('not connected', async(done)=>{
        let result = await request(app)
            .post(`/wishlist`)
            .send({token: ''})
            .expect(200)
        expect(result.body.result).toEqual(false);
        expect(result.body.message).toEqual("Nous n'avons pas vu vous identifier");
        done()
    })
})

test('recommandations', async(done)=>{
    let rawResponse = await request(app)
        .post('/recos')
        .send({"BD & Jeunesse": ["BD, Comics","Livre jeunesse"]})
        .expect(200)
    let response = await rawResponse.body;
    expect(response.result["BD & Jeunesse"]["BD, Comics"][0]).toBeDefined();
    done()
});





afterAll(async()=>{
    await UsersModel.deleteOne({token:token})
})