import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../../../constants/api";
import { USERSSURLS } from "../../../../constants/api/URLS";

export default function UsersList() {
  const [usersList, setUsersList] = useState([]);

  const getAllUsers = async () => {
    try {
      let response = await axiosInstance.get(USERSSURLS.getUsersUrl);
      console.log(response.data.data);

      setUsersList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const changeUserStatus = async (id: number) => {
    try {
      let response = await axiosInstance.put(USERSSURLS.toggleStatusUrl(id));
      getAllUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <div className="p-5">
        {usersList.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">User name</th>
                <th scope="col">Status</th>
                <th scope="col">Phone number</th>
                <th scope="col">Email</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user: any) => (
                <tr key={user.id}>
                  <td>{user.userName}</td>
                  <td>
                    {user.isActivated ? (
                      <span className="bg-success rounded rounded-5 px-3 py-2">
                        active
                      </span>
                    ) : (
                      <span className="bg-danger rounded rounded-5 px-3 py-2">
                        not active
                      </span>
                    )}
                  </td>
                  <td>{user.phoneNumber}</td>

                  <td>{user.email}</td>
                  <td>
                    {user.isActivated ? (
                      <i
                        className="fa fa-toggle-off fa-2x"
                        aria-hidden="true"
                        onClick={() => changeUserStatus(user.id)}
                      ></i>
                    ) : (
                      <i
                        className="fa fa-toggle-on fa-2x"
                        aria-hidden="true"
                        onClick={() => changeUserStatus(user.id)}
                      ></i>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2>no dataaaa</h2>
        )}
      </div>
    </>
  );
}
