import { Menubar } from "primereact/menubar";
import { Avatar } from "primereact/avatar";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

export default function Topbar() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => {
        navigate("/");
      },
    },
    {
      label: "Pricing",
      icon: "pi pi-star",
      command: () => {
        navigate("/pricing");
      },
    },
  ];

  const end = (
    <div className="flex align-items-center gap-2">
      {token === null ? (
        <>
          <Button label="Login" text onClick={() => navigate("/login")} />
          <Button
            label="Register"
            severity="secondary"
            text
            onClick={() => navigate("/register")}
          />
        </>
      ) : (
        <Avatar
          image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
          shape="circle"
        />
      )}
    </div>
  );

  return (
    <div className="card">
      <Menubar model={items} end={end} />
    </div>
  );
}
