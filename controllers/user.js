module.exports = {
    signUp : async (req, res , next) => {
        console.log('content of req.val.body', req.value.body);
        console.log('User Controller SignUp called !');
    },
    signIn : async (req, res , next) => {
        console.log('User Controller SignIn called !!');
    },
    secret : async (req, res , next) => {
        console.log('User Controller Secret called !!');
    }
}