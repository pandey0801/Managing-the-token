

// import { useState, useRef } from 'react';

// import classes from './AuthForm.module.css';

// const AuthForm = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [isLoading,setLoading] = useState(false);

//   const emailInputRef = useRef();
//   const passwordInputRef = useRef(); 

//   const switchAuthModeHandler = () => {
//     setIsLogin((prevState) => !prevState);
//   };

//   const submitHandler = (event) =>
//     {
//       event.preventDefault();
//       setLoading(true);

//       const enterEmail = emailInputRef.current.value;
//      const enterPassword = passwordInputRef.current.value;


//      if (isLogin)
//      {
//         fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA3zLM-Lv_vXtqmX-ajC7hatD_7jSHCqyg',
//         {
//           method : 'POST',
//           body : JSON.stringify({
//             email : enterEmail,
//             password : enterPassword,
//             returnSecureToken : true
//           }),
//           headers:{
//             'Content-Type': 'application/json'
//           }
//         }).then(res=>{
//           if(res.ok)
//             {
//               // console.log(res.json());
//               return res.json();

//             }
//             else{
//               return res.json().then(data => {
//                 // console.log(data)
//                 let errorMessage = 'Auth failed';
//                 throw new Error(errorMessage);
//               })

//             }
//         })
//         .then((data) =>{
//           console.log(data);
//         })
//         .catch((err) =>
//         {
//           alert(err.message);
//         })
//      }
//      else { 
//       // fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyA3zLM-Lv_vXtqmX-ajC7hatD_7jSHCqyg',

//       fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA3zLM-Lv_vXtqmX-ajC7hatD_7jSHCqyg',
//         {
//           method : 'POST',
//           body : JSON.stringify({
//             email : enterEmail,
//             password: enterPassword,
//             returnSecureToken : true
//           }),
//           headers:{
//             'Content-Type': 'application/json'
//           }
//         }
//       ).then(res =>{
//         // setLoading(false);
//         console.log(res)
//         if(res.ok){
//           console.log(res.json());

//         }
//         else{
//           return res.json().then(data => {
//             console.log(data)

//             let errorMessage = 'Authentication Failed';
//             if( data && data.error && data.error.message){
//             errorMessage = data.error.message;
//             }

//             alert(errorMessage);

//           });
//         }
//       }
//       )
//      }
     

//     }

//     // console.log(passwordInputRef);

//   return (
//     <section className={classes.auth}>
//       <h1>{isLogin ? 'Sing up' : 'Login'}</h1>
//       <form onSubmit={submitHandler} >
//         <div className={classes.control}>
//           <label htmlFor='email'>Your Email</label>
//           <input 
//           type='email' 
//           id='email'
//           ref = {emailInputRef}
//           required />
//         </div>
//         <div className={classes.control}>
//           <label htmlFor='password'>Your Password</label>
//           <input
//             type='password'
//             id='password'
//             ref={passwordInputRef}
//             required
//           />
//         </div>
//         <div className={classes.actions}>

//         {!isLoading && <button>{isLoading ? 'login' : 'create Account'}</button>}
//         {isLoading && <p>Sending Resquest....</p>}

//           <button
//             type='sumbit'
//             className={classes.toggle}
//             onClick={switchAuthModeHandler}
//           >
//             {isLogin ? 'Create new account' : 'Login with existing account'}
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// };

// export default AuthForm;

// 

import { useState, useRef, useContext } from 'react';
import AuthContext from '../../store/Auth-context';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext); 

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    let url;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA3zLM-Lv_vXtqmX-ajC7hatD_7jSHCqyg';
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA3zLM-Lv_vXtqmX-ajC7hatD_7jSHCqyg';
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      setIsLoading(false);
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then(data => {
          let errorMessage = 'Authentication failed!';
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        });
      }
    })
    .then(data => {
      console.log('idToken:', data.idToken);
      // You can now use the idToken for further API requests or store it as needed.
      // Example: Storing the token in local storage
      const token = data.idToken;
      // localStorage.setItem('token', token);

      authCtx.login(data.idToken);
    })
    .catch(err => {
      alert(err.message);
    });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input
            type='email'
            id='email'
            ref={emailInputRef}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending Request...</p>}


          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Login with existing account' : 'Create new account '}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
