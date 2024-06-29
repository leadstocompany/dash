import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SERVER_URL, cn } from "@/lib/utils";
import { setUser } from "@/store/slice/user";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LOCAL_STORAGE_USER_KEY = import.meta.env.VITE_LOCAL_STORAGE_USER_KEY;
const LOCAL_STORAGE_TOKEN_KEY = import.meta.env.VITE_LOCAL_STORAGE_TOKEN_KEY;

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${SERVER_URL}/admin-api/login`, form);
      const data = await res.data;
      const name = data.first_name + " " + data.last_name;
      const phone = data.phone;
      const avatar = data.profile_photo;
      const token = data.token;
      const isAdmin = data.is_super_user;
      const email = data.email;

      if (data.success === "true") {
        dispatch(setUser({ name, phone, avatar, token, isAdmin, email }));
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
        localStorage.setItem(
          LOCAL_STORAGE_USER_KEY,
          JSON.stringify({
            name,
            phone,
            email,
            avatar,
            token,
            isAdmin,
          })
        );
        navigate("/");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    console.log(form);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }
  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="max-w-md w-full bg-white rounded-md p-8">
        <div className={cn("grid gap-6 w-full")}>
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold text-center">Sign In</h1>
            <h3 className="text-center font-medium text-gray-500">
              to continue to your account
            </h3>
          </div>
          <form onSubmit={onSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  type="text"
                  // autoCapitalize="none"
                  // autoComplete="email"
                  // autoCorrect="off"
                  disabled={isLoading}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="password">
                  Password
                </Label>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  disabled={isLoading}
                  onChange={handleChange}
                />
              </div>
              <Button disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
