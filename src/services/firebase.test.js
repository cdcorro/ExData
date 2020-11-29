import {
    signin,
    signout,
    resetPassword,
    isEmailVerified
}from '../store/actions/auth';
import firebase from './firebase';
describe('Firebase Test Suite', ()=>{
    beforeAll(async()=>{
        await signout();
    })
})

// signing in with the wrong password
test('signInWithEmailAndPassword should throw error',async()=>{
    let error='';
    try{
        signin('test@test.com','123',() => this.history.push("/"));
    }catch(err){
        error=err.toString();
        expect(error).toEqual(
            'Error: Incorrect Password'
        );
    }
   
})
// signing in with the correct password
test('signInWithEmailAndPassword ',async()=>{
    let error='';
    try{
        signin('rameshnitin99@gmail.com','Password123Z@',() => this.history.push("/"));
    }catch(err){
        error=err.toString();
        expect(error).toEqual(
            'Error: Incorrect Password'
        );
    }
   
})
//  test the reset password function
test('Reset Password',async()=>{
    const user = await resetPassword(
        'rameshnitin99@gmail.com',
    );
    expect(user).toBeTruthy();
});
//  test the firebase sign out function
test('Sign out',async()=>{
    
    firebase
        .auth()
        .signOut()
        .then(() => {
            expect(isEmailVerified()).toBe(false);
        })
    
    
});