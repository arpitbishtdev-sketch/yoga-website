import "./Loader.css";

export default function Loader() {
  return (
    <div className="loader-screen">
      <div className="loader-box">
        <h1 style={{ color: "#1cdb2c", letterSpacing: "6px" }}>
          IRON PARADISE
        </h1>
        <div className="loader-line" />
      </div>
    </div>
  );
}
