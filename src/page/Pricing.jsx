import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ApiService } from "../apiService";
import Loader from "./Loader";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const apiService = new ApiService();
  const navigate = useNavigate();
  const [plan, setPlan] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    apiService
      .planList()
      .then((res) => {
        setPlan(res.data);

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          title: error.response?.data?.message || error.message,
          icon: "error",
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const accept = (id) => {
    setLoading(true);
    apiService
      .planPurchase({
        planId: id,
      })
      .then((res) => {
        sessionStorage.setItem("data", JSON.stringify(res.data));
        setLoading(false);
        Swal.fire({
          title: res.message,
          icon: "success",
        });
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          title: error.response?.data?.message || error.message,
          icon: "error",
        });
      });
  };

  const reject = () => {};

  const confirm = (e) => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: () => accept(e._id),
      reject,
    });
  };
  return (
    <div className="surface-0">
      {loading && <Loader />}
      <ConfirmDialog />
      <div className="text-900 font-bold text-6xl mb-4 text-center">
        Pricing Plans
      </div>
      <div className="text-700 text-xl mb-6 text-center line-height-3">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam
        eligendi quos.
      </div>

      <div className="grid">
        {plan.map((item, index) => {
          return (
            <div className="col-12 lg:col-4" key={index}>
              <div className="p-3 h-full">
                <div
                  className="shadow-2 p-3 h-full flex flex-column"
                  style={{ borderRadius: "6px" }}
                >
                  <div className="text-900 font-medium text-xl mb-2">
                    {item.name}
                  </div>
                  <div className="text-600">Plan description</div>
                  <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                  <div className="flex align-items-center">
                    <span className="font-bold text-2xl text-900">
                      ${item.price}
                    </span>
                    <span className="ml-2 font-medium text-600">per month</span>
                  </div>
                  <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                  <ul className="list-none p-0 m-0 flex-grow-1">
                    {item.features.map((elm, ind) => {
                      return (
                        <li className="flex align-items-center mb-3" key={ind}>
                          <i className="pi pi-check-circle text-green-500 mr-2"></i>
                          <span>{elm}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto" />
                  <Button
                    label="Buy Now"
                    className="p-3 w-full mt-auto"
                    onClick={() => {
                      token === null ? navigate("/login") : confirm(item);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pricing;
