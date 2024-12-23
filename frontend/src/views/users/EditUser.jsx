import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../components/base/PageTitle";
import axiosClient from "../../AxiosClient";
import AlertMessage from "../../components/base/AlertMessage";

export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [roleId, setRoleId] = useState(null);
  const [errors, setErrors] = useState(null);
  const [message, setMessage] = useState(null);

  const getData = async () => {
    setLoading(true);

    const res = await axiosClient.get(`/users/${id}`);
    console.log("Edit Record Data: ", res);

    if (res.status === 200) {
      setRoles(res.data.roles);
      setFirstName(res.data.record.firstName);
      setLastName(res.data.record.lastName);
      setEmail(res.data.record.email);
      setPassword(res.data.record.password);
      setConfirmPassword(res.data.record.password);
      setPhone(res.data.record.phone);
      setRoleId(res.data.record.roleId);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
      roleId: roleId,
    };

    if (password === confirmPassword) {
      axiosClient
        .patch(`/users/${id}`, data)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setPhone("");
            setRoleId(null);
            setErrors(null);
            setMessage("Record updated successfully.");
            navigate("/users");
          }
        })
        .catch((error) => {
          const res = error.response;
          if (res && res.status === 422) {
            setErrors(res.data.errors);
            setMessage(null);
          }
        });
    } else {
      setErrors({
        errors: ["Passwords do not match."],
      });
    }
  };

  return (
    <div className="mt-5">
      <PageTitle
        classes={"mb-5"}
        title={"Edit User" + ` - ${firstName} ${lastName}`}
      />

      <div className="bg-white px-4 py-10 rounded-lg">
        {loading && (
          <AlertMessage
            classes={"bg-blue-200 font-bold text-gray-700 text-sm text-center"}
            message={"Cargando..."}
          />
        )}

        {message && (
          <AlertMessage
            classes={"bg-green-500 text-white mb-5"}
            message={message}
          />
        )}

        {errors && (
          <AlertMessage
            classes={"bg-red-500 text-white mb-5"}
            message={Object.keys(errors).map((key) => (
              <p key={key}>{errors[key]}</p>
            ))}
          />
        )}

        {!loading && (
          <form onSubmit={onSubmit}>
            <div className="flex flex-wrap items-center mb-4">
              <div className="basis-full sm:basis-1/2 xl:basis-1/3 px-2 mb-4">
                <label htmlFor="firstName" className="font-medium w-full mb-3">
                  First Name:
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-white border rounded-lg p-2 w-full"
                  required
                />
              </div>
              <div className="basis-full sm:basis-1/2 xl:basis-1/3 px-2 mb-4">
                <label htmlFor="lastName" className="font-medium w-full mb-3">
                  Last Name:
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-white border rounded-lg p-2 w-full"
                  required
                />
              </div>
              <div className="basis-full sm:basis-1/2 xl:basis-1/3 px-2 mb-4">
                <label htmlFor="email" className="font-medium w-full mb-3">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border rounded-lg p-2 w-full"
                  required
                />
              </div>
              <div className="basis-full sm:basis-1/2 xl:basis-1/3 px-2 mb-4">
                <label htmlFor="phone" className="font-medium w-full mb-3">
                  Phone Number:
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-white border rounded-lg p-2 w-full"
                  required
                />
              </div>
              <div className="basis-full sm:basis-1/2 xl:basis-1/3 px-2 mb-4">
                <label htmlFor="password" className="font-medium w-full mb-3">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white border rounded-lg p-2 w-full"
                />
              </div>
              <div className="basis-full sm:basis-1/2 xl:basis-1/3 px-2 mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="font-medium w-full mb-3"
                >
                  Confirm Password:
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-white border rounded-lg p-2 w-full"
                />
              </div>
              <div className="basis-full sm:basis-1/2 xl:basis-1/3 px-2 mb-4">
                <label htmlFor="email" className="font-medium w-full mb-3">
                  Roles:
                </label>
                <select
                  id="roles"
                  name="roles"
                  value={roleId}
                  onChange={(e) => setRoleId(e.target.value)}
                  className="bg-white border rounded-lg p-2 w-full"
                >
                  <option value={0} disabled>
                    Choose an option
                  </option>
                  {roles && roles.length > 0
                    ? roles.map((role, index) => (
                        <option key={index} value={role.id}>
                          {role.name}
                        </option>
                      ))
                    : ""}
                </select>
              </div>
            </div>

            <div className="flex flex-row justify-between xl:justify-evenly items-center px-2 xl:px-10 mt-10">
              <Link
                to={"/users"}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-500 focus:bg-gray-700 hover:text-white focus:text-white rounded-lg"
              >
                Go Back
              </Link>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-500 focus:bg-green-900 focus:text-white px-5 py-3 rounded-lg text-white"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
