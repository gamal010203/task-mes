/*
** API test cases link using googlesheet
** https://docs.google.com/spreadsheets/d/165-40T901f7m6j3T4GvqmFM-4KTfNriJxic1zGQCr3Q/edit?usp=sharing 
*/


import { assert, expect, should } from "chai";//assertion methods importing from chai framework 
import { it } from "mocha";//mocha impaorting
import supertest from "supertest";// super test ipmorting
/*
** tried to gain extra security by using the libphone library to sync the phone number with country code and adding country region
*/
//import parsePhoneNumber from 'libphonenumber-js'
//import { isPossiblePhoneNumber, isValidPhoneNumber, validatePhoneNumberLength } from 'libphonenumber-js'
//import parsePhoneNumber from 'libphonenumber-js'
//import { AsYouType } from 'libphonenumber-js'
//import { findPhoneNumbersInText } from 'libphonenumber-js'
//import {isPossiblePhoneNumber,isValidPhoneNumber,validatePhoneNumberLength} from 'libphonenumber-js'
const request = supertest(`https://60b638878ac0790017829a0f.mockapi.io`);// api link 

const token = 'F14aD4jD4gWfCysdgdTDm44Fffd4FFDbWDHf1gz1egLf5hftDbgfO1FHtGJidsjcs5gywdfFesthSgk4a1ab41DDjSd15khlhkg4j0t0wYg5sA1T5i5Sd5Sa5fpgfgZhhShDffba94WNCjFc2disFrGg2srGS7dvF1FA4sH4f4h4dgjk9MCSvCaF5AsBawQ0dk2O5FaG4dfdSjfkcsFf1gaad44dD4s6d0kkW2dskhRD4hkhulGGfDaXffSdb4Bd5J6sBDdhhXujdasr2k0DxFfQvdfS5DGkasffFFsfgsv5jwt001C544D';// the requseted token
//first test suit to get the token for taks 2
describe('post for getting the token', () => {
    it('Post/first/name/for/token', () => {
        const data = {
            firstname: 'gamalxs'
        }

        return request
            .post('/register')
            .send(data)
            .then((res) => {
                let val = data.firstname.length;
                console.log(val);
                expect(val).to.be.lessThan(20).and.to.be.at.least(1);
                console.log(res.body);
            });
    });

});
//second test suit for the first task registering 
describe('Register', () => {
    //the valid register task
    describe('Valid Register', () => {
        // using post to add first name
        it('Valid /FirstName', () => {
            const data = {
                firstname: 'Gamal',
            }
            return request
                .post('/register')
                // .set("Authrization", `Bearer${token}`)
                .send(data)
                .then((res) => {
                    let val = data.firstname.length;
                    console.log(val);
                    expect(val).to.be.lessThan(20).and.to.be.at.least(1);//asserting the entered data is not more than 20 degit or less than one digit
                    console.log(res.body);

                });
        });
        // using put to enter the mail in the same ID with first name 
        it('Entering email adress', () => {
            const data = {
                email: `Whateve@you.com`
            };
            return request
                .put('/register/1')
                .send(data)
                .then(() => {
                    let emailval = data.email.length;
                    console.log(emailval);
                    expect(emailval).to.be.lessThan(100).and.to.be.at.least(5, "email is not right");//asserting the entered data is not more than 100 degit or less than 5 digit
                    console.log(data);

                });
        });
        // using put to enter the country code and mobile nuumber in the same ID with first name and mail
        it('entering countryCode & mobile', () => {
            const data = {
                countryCode: '+02',
                mobile: `01439530222`,
            };
            return request
                .put('/register/1')
                .send(data)
                .then(() => {
                    let mobileval = data.mobile.length;
                    let allval = data.countryCode + data.mobile
                    // expect(data.mobile).to.be.a(`number`);
                    expect(allval).to.match(/^\+(?:[0-9] ?){8,15}[0-9]$/); //asseting mobile phone number and the country code to be valid usin regx
                    expect(mobileval).to.be.lessThan(15).and.to.be.at.least(8);//asserting the entered data is not more than 15 degit or less than 8 digit
                    console.log(data);

                });
        });
        // using put to enter the password and confirm it in the same ID with rest of the data 
        it('Password&confrimPassword', () => {
            const data = {
                password: `Gamal@0123`,
                confirmpassword: `Gamal@0123`
            }
            return request
                .put('/register/1')
                .send(data)
                .then((res) => {
                    let passval = data.password.length;
                    expect(data.password).to.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);//asserting the password validation as requirments (at least one number / one special char / one lower digit /  one upper digit and 8chars a t least )
                    expect(passval).to.be.at.least(8);//asserting the entered data is not less than 8 digits
                    expect(data.password).to.be.eq(data.confirmpassword); // asserting the password is the same as confirm password
                });
        });
        // using put to enter the in the same ID with rest of the data 
        it('valid LastName', () => {
            const data = {
                LastName: `Mohamed`
            }
            return request
                .put(`/register/1`)
                .send(data)
                .then(() => {
                    //asserting lastname to be valid as requirments less than 20 more than one
                    let Lastval = data.LastName.length;
                    expect(Lastval).be.lessThan(20).and.to.be.at.least(1);
                    console.log(data);
                });
        });



        it('Get users', (done) => {
            request.get('/register/1').end((err, res) => {
                expect(res.body).to.not.be.empty;
                console.log(err);
                console.log("register/1");
                done();
            });
        });

        describe('invalid login', () => {
            it('Invalid /register /data', () => {
                const data = {
                    //if i added all data blank it's invalid
                    firstname: '', email: ``, countryCode: ``, mobile: ``, password: ``, confirmpassword: `inv`, LastName: ``
                }
                return request
                    .post('register')
                    // .set("Authrization", `Bearer${token}`)
                    .send(data)
                    .then(() => {
                        let val = data.firstname.length;
                        console.log(val);
                        expect(val).to.be.lessThan(20).and.to.be.at.least(1);
                        let emailval = data.email.length;
                        expect(emailval).to.be.lessThan(100).and.to.be.at.least(5, "email is not right");
                        let mobileval = data.mobile.length;
                        let allval = data.countryCode + data.mobile
                        expect(allval).to.match(/^\+(?:[0-9] ?){8,15}[0-9]$/);
                        expect(mobileval).to.be.lessThan(15).and.to.be.at.least(8);
                        let passval = data.password.length;
                        expect(data.password).to.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{1,}$/);
                        expect(passval).to.be.lessThan(20).and.to.be.at.least(1);
                        expect(data.password).to.be.eq(data.confirmpassword);
                        let Lastval = data.LastName.length;
                        expect(Lastval).be.lessThan(20).and.to.be.at.least(1);

                    });
            });

        });
        describe('Task2', () => {
            it('Change Password', () => {
                const data = {
                    password: `Gamal@010203`,
                    newPassword: `New@pass123`,
                    confirmNewPassword: `New@pass123`
                }
                return request
                    .post(`/changePassword`)
                    // .set(token)
                    .send({ data })
                    .set("Authorization", `Bearer ${token}`)
                    .then((res) => {
                        let NewPassval = data.newPassword.length;
                        expect(data.newPassword).to.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{1,}$/);
                        expect(NewPassval).to.be.lessThan(20).and.to.be.at.least(1);
                        expect(data.newPassword).to.be.eq(data.confirmNewPassword);
                        console.log(res.body);
                    })
            });

        });
    });
});



