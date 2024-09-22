"use client";
import { useState, FormEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../store/authSlice';
import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '../../store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error, user } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    try{
      const response =await dispatch(register({ username, email, password }));
    toast.success('Registered successfully');
    router.push('/login');
    toast.success('Please refresh & go to login page');
    }catch(err){
      toast.error('Registration failed');
    }
    
  };

  if (user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm mx-4
                  transition-all duration-300 transform hover:scale-105"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Register</h2>

        <Input
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 w-full h-10 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
          required
        />

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full h-10 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
          required
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full h-10 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
          required
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded
                     transition duration-300 transform hover:scale-105"
        >
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </div>
  );
}
