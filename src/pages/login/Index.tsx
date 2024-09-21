import { FC, FormEvent, SyntheticEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "@hooks/useAuth";
import { useSendData } from "@hooks/useSendData";
import Icon from "@components/Icon";
import Header from "@components/gui/Header";

const Index: FC = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { isPending, mutate } = useSendData("auth/login", {
    method: "post",
    customFn: (res: { data: { token: { token: string } } }) => {
      console.log(res, "ola");
      setToken(res.data.token.token);
      localStorage.setItem("credentials", JSON.stringify(res.data));
      navigate("/app", { replace: true });
    },
    refetchFn: () => {},
    onSuccessMsg: "Autenticado correctamente",
  });
  const [body, setBody] = useState<{ user?: string; password?: string }>({});

  const handle = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setBody((prev) => ({ ...prev, [name]: value }));
  };
  const login = (e: SyntheticEvent) => {
    e.preventDefault();
    mutate(body);
  };

  return (
    <div className="drawer">
      <input id="menu-general" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}

        {/* <label htmlFor="menu-general" className="drawer-button btn fixed">
          <Icon icon="bars" size="2x" />
        </label> */}
        <div
          className={`w-screen h-screen flex flex-col bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(0,0,0,0.8)),url("/img/loginbackground.jpg")] bg-cover `}
        >
          <Header noShowBarMenu>
            <div className="flex-none">
              <label
                htmlFor="menu-general"
                className="btn btn-ghost drawer-button"
              >
                <Icon icon="bars" size="2x" />
              </label>
            </div>
          </Header>
          <div className="flex-grow flex items-center justify-center">
            <form
              className="h-2/4 w-11/12 sm:h-96 sm:w-96 bg-base-100/80 rounded-lg flex flex-col justify-center prose p-4 gap-4 backdrop-blur-sm"
              onSubmit={login}
            >
              <h1 className=" text-center">Iniciar sesión</h1>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  placeholder="Usuario"
                  name="user"
                  value={body.hasOwnProperty("user") ? body["user"] : ""}
                  onChange={handle}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow"
                  name="password"
                  placeholder="Contraseña"
                  value={
                    body.hasOwnProperty("password") ? body["password"] : ""
                  }
                  onChange={handle}
                />
              </label>
              <button type="submit" className="btn btn-primary">
                {isPending ? (
                  <span className="loading loading-bars loading-md" />
                ) : (
                  "Iniciar sesión"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="menu-general"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
            <NavLink to="preliquidacion">Preliquidación</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Index;
