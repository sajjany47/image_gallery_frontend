/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Image as PrimeImage } from "primereact/image";
import { Card } from "primereact/card";
import { SplitButton } from "primereact/splitbutton";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import { ApiService } from "../apiService";
import Swal from "sweetalert2";
import Loader from "./Loader";
import { Tag } from "primereact/tag";

const ImagePreview = ({ data }) => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const apiService = new ApiService();
  const token = sessionStorage.getItem("token");
  const [resolution, setResolution] = useState("720p");
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem("data"));

  useEffect(() => {
    setResolution(
      userData?.plan === "Bronze"
        ? "720p"
        : userData?.plan === "Silver"
        ? "1440p"
        : userData?.plan === "Gold"
        ? "4k"
        : "720p"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resolutions = {
    "720p": { width: 1280, height: 720 },
    "1080p": { width: 1920, height: 1080 },
    "1440p": { width: 2560, height: 1440 },
    "4k": { width: 3840, height: 2160 },
  };
  const items = [
    {
      label: "720p",
      command: () => {
        save(data, "720p");
      },
    },
    {
      label:
        token === null || userData?.plan === "Bronze" ? (
          <>
            1080p <Tag value="Upgrade Plan" severity="warning" />
          </>
        ) : (
          "1080p"
        ),
      command: () => {
        token === null || userData?.plan === "Bronze"
          ? navigate("/pricing")
          : save(data, "1080p");
      },
    },
    {
      label:
        token === null || userData?.plan === "Bronze" ? (
          <>
            1440p <Tag value="Upgrade Plan" severity="warning" />
          </>
        ) : (
          "1440p"
        ),
      command: () => {
        token === null || userData?.plan === "Bronze"
          ? navigate("/pricing")
          : save(data, "1440p");
      },
    },
    {
      label:
        token === null ||
        userData?.plan === "Silver" ||
        userData?.plan === "Bronze" ? (
          <>
            4K <Tag value="Upgrade Plan" severity="warning" />
          </>
        ) : (
          "4K"
        ),
      command: () => {
        token === null ||
        userData?.plan === "Silver" ||
        userData?.plan === "Bronze"
          ? navigate("/pricing")
          : save(data, "4k");
      },
    },
  ];
  const imageResize = (value, ratio) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new window.Image();

    img.crossOrigin = "anonymous";
    img.src = value.url;

    img.onload = () => {
      const { width, height } = resolutions[ratio];
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);
      if (userData?.plan === "Bronze" || token === null) {
        ctx.font = "bold 24px Arial";
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        const watermarkX = width / 2;
        const watermarkY = height * 0.9;

        ctx.fillText("Click by Lion", watermarkX, watermarkY);
      }

      canvas.toBlob(
        (blob) => saveAs(blob, `${value.name}-${ratio}.jpg`),
        "image/jpeg"
      );
    };
  };
  const save = (e, ratio) => {
    setLoading(true);
    if (e.type === "free") {
      imageResize(e, ratio);
      setLoading(false);
    } else {
      apiService
        .imageDownload({ productId: e._id })
        .then(() => {
          imageResize(e, ratio);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          Swal.fire({
            title: error.response?.data?.message || error.message,
            icon: "error",
          });
        });
    }
  };

  const header = (
    <div className="watermarked-image-container">
      <PrimeImage
        src={data.url}
        alt="Image"
        width="150"
        height="250"
        crossOrigin=""
      />
      <div className="watermark">Click By Lion</div>
      {data.type === "premium" && (
        <span
          className="p-badge p-badge-warning"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1,
          }}
        >
          Premium
        </span>
      )}
    </div>
  );
  const footer = (
    <>
      <SplitButton
        label="Download"
        onClick={() => {
          data.type === "premium" && token === null
            ? navigate("/login")
            : save(data, resolution);
        }}
        model={items}
      />
    </>
  );
  return (
    <>
      {loading && <Loader />}
      <Card
        title={data.name}
        footer={footer}
        header={header}
        className="md:w-20rem"
      />
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </>
  );
};

export default ImagePreview;
