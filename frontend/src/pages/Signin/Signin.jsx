import { useNavigate,Link } from 'react-router-dom';
import "./Signin.css"
import { useForm } from 'react-hook-form';
import {Toaster} from "react-hot-toast";
import { useDispatch  } from 'react-redux';
import { userLogin } from '../../store/slices/authSlice';

function Signin() {

  const {register,handleSubmit,formState:{errors}} = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signin = async (data) => {
    try {
      const response = await dispatch(userLogin(data)).unwrap();
      console.log(response)
      navigate("/dashboard")
    } catch (error) {
      console.error(error)
    }
  }

  
  return (
    <div style={{maxHeight:'100vh',overflowY:"hidden"}}>
      <Toaster
      position="top-center"
      reverseOrder={false}
      />
      <form
      className='signin' 
      onSubmit={handleSubmit(signin)} >
        <h3>Signin</h3>
        <div className='cont1'>
          <div className='incont'>
            <input name="email" placeholder='' type="text" required {...register("email",{
              required:"Please enter your email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email"
              }
            })}/>
            <label>Email</label>
            {errors.email && (
              <span>{errors.email.message}</span>
            )}
          </div>
          <div className='incont'>
            <input name="password" 
            type="password" placeholder='' required {...register("password",{
              required:"Please enter your password"
            })}/>
            <label>Password</label>
            {errors.password && (
              <span>{errors.password.message}</span>
            )}
          </div>
        </div>
        <button type='submit'>Login</button>
        <span>Don&apos;t have an account?&nbsp;<Link to={"/signup"}>Signup</Link></span>
      </form>
    </div>
  )
}

export default Signin
