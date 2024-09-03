import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BASE_IMG_URL,
  PROJECTSURLS,
  requestHeader,
  USERSSURLS,
} from "../../../../constants/URLS";

export default function UsersList() {
  const [usersList, setUsersList] = useState([]);
  let getAllUsers = async () => {
    try {
      let response = await axios.get(USERSSURLS.getUsersUrl, {
        headers: requestHeader,
      });

      setUsersList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  let toggleUserStatus = async (id: string) => {
    try {
      let response = await axios.put(
        USERSSURLS.toggleStatusUrl(id),
        {},
        {
          headers: requestHeader,
        }
      );

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
      <div className="title d-flex px-4 py-2 justify-content-between align-items-center">
        <h5>Users</h5>
      </div>
      <div className="p-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">User name</th>
              <th scope="col">Status</th>
              <th scope="col">Image</th>
              <th scope="col">Phone number</th>
              <th scope="col">Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usersList.length > 0 ? (
              usersList.map((user: any) => (
                <tr>
                  <th scope="row">{user.userName}</th>
                  <td>
                    {user.isActivated ? (
                      <button className="btn btn-success rounded-5">
                        Active
                      </button>
                    ) : (
                      <button className="btn btn-danger rounded-5">
                        Not Active
                      </button>
                    )}
                  </td>
                  <td>
                    {" "}
                    {user.imagePath ? (
                      <img src={`${BASE_IMG_URL}/${user.imagePath}`} />
                    ) : (
                      <span>mfe4</span>
                    )}
                  </td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.email}</td>

                  <td>
                    {user.isActivated ? (
                      <i
                        onClick={() => toggleUserStatus(user.id)}
                        className="fa fa-toggle-off text-success fa-2x"
                        aria-hidden="true"
                      ></i>
                    ) : (
                      <i
                        onClick={() => toggleUserStatus(user.id)}
                        className="fa fa-toggle-on text-danger fa-2x"
                        aria-hidden="true"
                      ></i>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <h1>no dataaa</h1>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
