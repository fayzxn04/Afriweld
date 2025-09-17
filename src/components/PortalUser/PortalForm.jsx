import {
  Stack,
  SimpleGrid,
  TextInput,
  Select,
  PasswordInput,
} from "@mantine/core";
import FormFooter from "../common/FormFooter";
import { useLocation, useNavigate } from "react-router-dom";
import FormHeader from "../common/FormHeader";
import { useEffect, useState } from "react";

// import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { timestamp } from "../../config/firebase";
import { adminRole, nonAdminRole } from "../../utils/utilConst";
import { processPathSegments } from "../../utils/utilFunction";
import { toast } from "react-toastify";
import {
  addPortalUser,
  deletePortalUser,
  getPortalUserByEmail,
  updatePortalUser,
} from "../../services/portalUser";
import { signUpNewUser } from "../../services/auth";

const PortalForm = ({ data }) => {
  const { user } = useSelector((state) => state.app);
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
  });
  const [password, setPassword] = useState("");
  const [adminType, setAdminType] = useState(null);
  const [loading, setLoading] = useState({
    add: false,
    edit: false,
    delete: false,
  });
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const headerFromPath = processPathSegments(pathSegments);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setInputValue({
        name: data.name,
        email: data.email,
      });
      setAdminType(data.role);
    }
  }, [data]);

  const inputValueHandler = (e) => {
    const { name, value } = e.target;
    setInputValue((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const resetHandler = () => {
    setInputValue({
      name: "",
      email: "",
    });
    setPassword("");
    setAdminType(null);
  };

  const addUserHandler = async () => {
    setLoading((prevValue) => ({ ...prevValue, add: true }));

    if (Object.values(inputValue).some((value) => value === "") || !adminType) {
      toast.error("Please fill all the fields");
      return;
    }
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (!inputValue.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error("Please enter a valid email");
      return;
    }
    try {
      const userExist = await getPortalUserByEmail(inputValue.email);
      if (userExist) {
        alert("User already exist with this email");
        return;
      }
      const res1 = await signUpNewUser(inputValue.email, password);
      const formData = {
        id: res1.uid,
        name: inputValue.name,
        email: inputValue.email,
        role: adminType,
        createdAt: timestamp,
      };
      await addPortalUser(formData);
      setInputValue({
        name: "",
        email: "",
      });
      setPassword("");
      setAdminType(null);
      navigate("/portalUsers", { replace: true });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading((prevValue) => ({ ...prevValue, add: false }));
    }
  };

  const editUserHandler = async () => {
    setLoading((prevValue) => ({ ...prevValue, edit: true }));
    setLoading((prevValue) => ({ ...prevValue, edit: true }));
    if (Object.values(inputValue).some((value) => value === "") || !adminType) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      await updatePortalUser(data.id, {
        name: inputValue.name,
        role: adminType,
      });
      navigate("/portalUsers", { replace: true });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading((prevValue) => ({ ...prevValue, edit: false }));
    }
  };

  const deleteUserHandler = async () => {
    setLoading((prevValue) => ({ ...prevValue, delete: true }));
    try {
      await deletePortalUser(data.id);
      navigate("/portalUsers", { replace: true });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading((prevValue) => ({ ...prevValue, delete: false }));
    }
  };

  return (
    <>
      <Stack>
        <FormHeader data={headerFromPath} />
        <Stack p={24}>
          <SimpleGrid cols={3}>
            <TextInput
              name="name"
              label="Name"
              placeholder="Enter here"
              value={inputValue.name}
              onChange={(e) => inputValueHandler(e)}
            />
            <Select
              label="User Type"
              placeholder="Tap to select"
              data={user?.role !== "superadmin" ? nonAdminRole : adminRole}
              value={adminType}
              onChange={setAdminType}
            />
          </SimpleGrid>
          <SimpleGrid cols={3}>
            <TextInput
              name="email"
              type="email"
              label="Email"
              placeholder="Enter here"
              value={inputValue.email}
              onChange={(e) => inputValueHandler(e)}
              disabled={data}
            />
            {!data && (
              <PasswordInput
                name="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            )}
          </SimpleGrid>
        </Stack>
      </Stack>

      <FormFooter
        data={headerFromPath}
        resetHandler={resetHandler}
        addHandler={addUserHandler}
        loading={loading}
        updateHandler={editUserHandler}
        deleteHandler={deleteUserHandler}
        page="Portal User"
      />
    </>
  );
};

// PortalUserForm.propTypes = {
//   data: PropTypes.object,
// };

export default PortalForm;
