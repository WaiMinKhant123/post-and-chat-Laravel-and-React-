import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '@/redux/api/authApi';
import { setCredentials } from '@/redux/slices/authSlice';
import { Link,useNavigate } from 'react-router-dom'; 


import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const LoginForm = ({ className, ...props }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const [login, { isLoading, error }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {

      const userData = await login(formData).unwrap();
      
      dispatch(setCredentials(userData));
      
      console.log('Login Success:', userData);
      
      navigate('/'); 
      
    } catch (err) {
      console.error('Login Failed:', err);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="m@example.com"
                  required
                />
              </Field>
              {error && (
                <div className="alert alert-danger p-2 text-center" style={{ fontSize: '14px' }}>
                  {error.data?.error || 'Email သို့မဟုတ် Password မှားယွင်းနေပါသည်။'}
                </div>
              )}
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange} required />
              </Field>
              <Field>
                <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</Button>
                <Button variant="outline" type="button" className="w-full mt-2">
                  Login with Google
                </Button>
                <FieldDescription className="text-center mt-4">
                  Don&apos;t have an account? <Link to="/register" className="underline underline-offset-4 font-medium text-primary">Sign up</Link>          
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
export default LoginForm;