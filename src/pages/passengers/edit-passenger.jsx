import Container from "@/components/container";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { SERVER_URL } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const EditPassenger = () => {
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY")

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    try {
      setIsLoading(true);
      const res = await axios.put(
        `${SERVER_URL}/admin-api/passenger/${data.id}/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
      toast({
        title: "Passenger Updated",
        description: "Passenger Updated successfully",
      });
      navigate("/passengers/all");
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: "Failed to update passenger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    for (const [key, value] of searchParams) {
      if (value === "" || value === "null" || value === null) continue;
      setData((prev) => ({ ...prev, [key]: value }));
    }
  }, []);

  return (
    <Container>
      <Heading>Edit Passenger</Heading>
      <form className="grid grid-cols-2 gap-2.5" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label>Name</Label>
          <Input
            type="text"
            name="first_name"
            value={data?.first_name}
            placeholder="Passenger Name"
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-2">
          <Label>Email</Label>
          <Input
            type="text"
            name="email"
            value={data?.email}
            placeholder="Passenger Name"
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-2">
          <Label>Phone</Label>
          <Input
            type="text"
            name="phone"
            value={data?.phone}
            placeholder="Passenger Name"
            onChange={handleChange}
          />
        </div>
        <div className="col-span-2 flex justify-end">
          <Button isLoading={isLoading} type="submit">
            Update
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default EditPassenger;
