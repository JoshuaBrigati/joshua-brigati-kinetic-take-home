const BackgroundBlobs = () => {
  return (
    <>
      <div
        style={{
          background: "radial-gradient(30.8% 30.8% at 57.79% 54.71%, rgba(225, 64, 164, .24) 0, rgba(2, 172, 210, .24) 48.71%, rgba(225, 61, 162, .2) 78.16%, rgba(225, 64, 164, .24) 100%)",
          filter: "blur(100px)",
          height: "327.27px",
          left: "-100px",
          position: "absolute",
          rotate: "45deg",
          top: "65.41px",
          width: "328.92px",
          zIndex: "-1",
        }}
      ></div>
      <div
        style={{
          background: "linear-gradient(137.64deg, rgba(255, 61, 142, .4) 26.68%, rgba(255, 61, 142, .3) 55.42%, rgba(225, 61, 162, .2) 72.8%, rgba(93, 106, 167, .7) 85.68%)",
          filter: "blur(75px)",
          height: "110.13px",
          position: "absolute",
          right: "50px",
          top: "0",
          transform: "matrix(-1, 0, 0, 1, 0, 0)",
          width: "177.99px",
          zIndex: "-1",
        }}
      ></div>
      <div
        style={{
          background: "linear-gradient(137.64deg, rgba(255, 61, 142, .4) 26.68%, rgba(255, 61, 142, .3) 55.42%, rgba(225, 61, 162, .3) 72.8%, rgba(93, 106, 167, .7) 85.68%)",
          filter: "blur(75px)",
          height: "110.13px",
          position: "absolute",
          right: "50px",
          bottom: "0",
          transform: "matrix(-1, 0, 0, 1, 0, 0)",
          width: "177.99px",
          zIndex: "-1",
        }}
      ></div>
    </>
  );
}

export default BackgroundBlobs;
