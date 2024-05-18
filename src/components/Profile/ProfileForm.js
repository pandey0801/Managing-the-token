// import AuthContext from '../../store/Auth-context';
// import classes from './ProfileForm.module.css';
// import { useContext, useRef } from 'react';

// const ProfileForm = () => {
//   const newPasswordInputRef = useRef();
//  const authCtx =  useContext(AuthContext)

//  console.log(authCtx.token);

//   const submitHandler = event =>
//     {
//       event.preventDefault();
//       const entereNewPassword = newPasswordInputRef.current.value;

//       //add validation, send request 

//       fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA3zLM-Lv_vXtqmX-ajC7hatD_7jSHCqyg',
//         {
//           method: 'POST',
//           body:JSON.stringify({
//             idToken : authCtx.token,
//             password: entereNewPassword,
//             returnSecreToken: false
//         }),
//           headers:{
//             'Context-Type':'application/json'
//           }
//         }
//       ).then(res=>{
//         if(res.ok)
//           {
//             console.log(res.json());
//           }
//           else{
//             return res.json().then(data => {
//                           console.log(data)
              
//                           let errorMessage = 'Authentication Failed';
//                           if( data && data.error && data.error.message){
//                           errorMessage = data.error.message;
//                           }
              
//                           alert(errorMessage);
              
//                         });
//           }
       
//       })

//     }
//   return (
//     <form className={classes.form} onSubmit={submitHandler}>
//       <div className={classes.control}>
//         <label htmlFor='new-password'>New Password</label>
//         <input 
//         type='password' 
//         id='new-password'
//         ref={newPasswordInputRef} 
//         minLength="7"
//         />
//       </div>
//       <div className={classes.action}>
//         <button>Change Password</button>
//       </div>
//     </form>
//   );
// }

// export default ProfileForm;



import AuthContext from '../../store/Auth-context';
import classes from './ProfileForm.module.css';
import { useContext, useRef } from 'react';

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  console.log(authCtx.token);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;

    // Add validation, send request
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA3zLM-Lv_vXtqmX-ajC7hatD_7jSHCqyg', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false,
      }),
      headers: {
        'Content-Type': 'application/json', // Fixed typo
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data);
        });
      } else {
        res.json().then((data) => {
          console.log(data);

          let errorMessage = 'Authentication Failed';
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }

          alert(errorMessage);
        });
      }
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input 
          type='password' 
          id='new-password'
          ref={newPasswordInputRef} 
          minLength="7"
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;

