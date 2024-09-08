import { TabView, TabPanel } from "primereact/tabview";
import ImagePreview from "./ImagePreview";
import { ApiService } from "../apiService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "./Loader";

const ImageTabView = () => {
  const apiService = new ApiService();
  const [allImage, setAllImage] = useState([]);
  const [freeImage, setFreeImage] = useState([]);
  const [memberImage, setMemberImage] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    apiService
      .productList()
      .then((res) => {
        const data = res.data;
        const filterFreeImage = data.filter((item) => item.type === "free");
        const filterMemberImage = data.filter(
          (item) => item.type === "premium"
        );
        setAllImage(data);
        setFreeImage(filterFreeImage);
        setMemberImage(filterMemberImage);
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
  return (
    <div className="card" onContextMenu={(e) => e.preventDefault()}>
      {loading && <Loader />}
      <TabView>
        <TabPanel header="ALL">
          <div className="grid mt-3">
            {allImage.map((item, index) => {
              return (
                <div className="col-12 md:col-3 lg:col-3" key={index}>
                  <ImagePreview data={item} />
                </div>
              );
            })}
          </div>
        </TabPanel>
        <TabPanel header="FREE">
          <div className="grid mt-3">
            {freeImage.map((item, index) => {
              return (
                <div className="col-12 md:col-3 lg:col-3" key={index}>
                  <ImagePreview data={item} />
                </div>
              );
            })}
          </div>
        </TabPanel>
        <TabPanel header="MEMBER">
          <div className="grid mt-3">
            {memberImage.map((item, index) => {
              return (
                <div className="col-12 md:col-3 lg:col-3" key={index}>
                  <ImagePreview data={item} />
                </div>
              );
            })}
          </div>
        </TabPanel>
      </TabView>
    </div>
  );
};

export default ImageTabView;
