import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  age: number;
  standard: number;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, age: number, standard: number, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('brainboost_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const register = async (name: string, age: number, standard: number, email: string, password: string): Promise<boolean> => {
    try {
      // Get existing users
      const users = JSON.parse(localStorage.getItem('brainboost_users') || '[]');
      
      // Check if email already exists
      if (users.find((u: any) => u.email === email)) {
        return false;
      }

      // Create new user
      const newUser: User & { password: string } = {
        id: Date.now().toString(),
        name,
        age,
        standard,
        email,
        password,
      };

      users.push(newUser);
      localStorage.setItem('brainboost_users', JSON.stringify(users));

      // Auto login
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('brainboost_user', JSON.stringify(userWithoutPassword));

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('brainboost_users') || '[]');
      const foundUser = users.find((u: any) => u.email === email && u.password === password);

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('brainboost_user', JSON.stringify(userWithoutPassword));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('brainboost_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
