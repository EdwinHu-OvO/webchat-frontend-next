import "@/styles/notfound.css";
export default function NotFound() {
  return (
    <>
      <input type="checkbox" id="toggle" hidden />
      <label htmlFor="toggle">
        <div>点击切换</div>
      </label>
      <div className="notice-area">
        <div className="notice"></div>
        <div className="notice1"></div>
      </div>
      <div className="main">
        <div className="padding">
          <center>
            <h1 className="py-[0.67em] text-[2em] font-[550]">
              <span>404</span> Already Found
            </h1>
          </center>
          <hr className="animated-text" style={{ animationDuration: "0.3s" }} />
          <center className="animated-text" style={{ animationDuration: "0.8s" }}>
            xnign
          </center>
          <br />
          <center className="animated-text" style={{ fontSize: "10px", animationDuration: "1s" }}>
            Powered by WebChat
          </center>
        </div>
      </div>
    </>
  );
}
