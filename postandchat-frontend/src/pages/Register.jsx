import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../redux/api/authApi';
import { setCredentials } from '../redux/slices/authSlice';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [register, { isLoading, error }] = useRegisterMutation();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend /api/register သို့ Request ပို့ခြင်း
      const res = await register(formData).unwrap();
      
      // Backend မှ ပြန်လာသော access_token ကို Redux State ထဲ ထည့်ခြင်း
      dispatch(setCredentials(res));
      
      console.log("Register Successfully Logged In");
    } catch (err) {
      console.error("Register Error:", err);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '50px' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>

        {error && (
          <p style={{ color: 'red' }}>
            {error.data?.message || 'Registration failed'}
          </p>
        )}
      </form>
    </div>
  );
}