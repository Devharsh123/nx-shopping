
export class Stub{
    createuserStub = ()=>{
        return {
            email: 'test@gmail.com',
            password:'test123'
        }
    }
    getUser = ()=>{
        return {
            _id: '63bba06369d4c78db7160cf7',
            email: 'test@gmail.com',
            password:'test123',
            __v:0
        }
    }
    exceptionalUser = ()=>{
        return {
            email: 'make@gmail.com',
            password:'make123'
        }
    }

}
