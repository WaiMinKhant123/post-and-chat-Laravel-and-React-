import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../redux/api/authApi';
import { setCredentials } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom'; // 💡 Login အောင်မြင်ရင် Dashboard သို့ သွားရန်

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Navigation အတွက် သတ်မှတ်ခြင်း

  // 💡 RTK Query Mutation Hook ကို ခေါ်ယူခြင်း
  const [login, { isLoading, error }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 💡 API နှင့် တိုက်ရိုက်ချိတ်ဆက်မည့် အပိုင်း
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 1. Laravel Backend ဆီသို့ Form Data ပို့လိုက်ခြင်း (.unwrap() သုံးပါက error ကို catch ထဲ တန်းပို့ပေးသည်)
      const userData = await login(formData).unwrap();
      
      // 2. Response ထဲကရလာမည့် (access_token နှင့် user) တို့ကို Redux State ထဲသို့ သိမ်းဆည်းခြင်း
      dispatch(setCredentials(userData));
      
      console.log('Login Success:', userData);
      
      // 3. အောင်မြင်ပါက Home သို့မဟုတ် Dashboard စာမျက်နှာသို့ အော်တို ပို့ပေးမည်
      navigate('/'); 
      
    } catch (err) {
      console.error('Login Failed:', err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h3 className="card-title text-center mb-4 fw-bold text-primary">
                PostAndChat - Login
              </h3>

              {/* 💡 Backend မှ Error တက်လာပါက UI တွင် ပြသရန် */}
              {error && (
                <div className="alert alert-danger p-2 text-center" style={{ fontSize: '14px' }}>
                  {error.data?.error || 'Email သို့မဟုတ် Password မှားယွင်းနေပါသည်။'}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-secondary">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-secondary">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="d-grid mt-4">
                  {/* 💡 Loading ဖြစ်နေစဉ် ခလုပ်ကို နှိပ်မရအောင် ပိတ်ထားမည် */}
                  <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
