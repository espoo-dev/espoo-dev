let faker = require('faker');
export default {

    registerData: function (){

        let data = {
            email: faker.internet.email(),
            password: "123456",
            roles: "teacher",
            alert_msg : "Successfully registered, now you can log in"
        }
        return data
    }
}
