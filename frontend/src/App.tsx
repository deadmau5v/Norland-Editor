import { useEffect } from "react";
import Aside from "./components/ui/aside";
import TitleBar from "./components/ui/title_bar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GenerateConfig from "./generateConfig";

function App() {
  // 禁用右键
  useEffect(() => {
    // const handleContextMenu = (e: MouseEvent) => {
    //   e.preventDefault();
    // };
    // document.addEventListener("contextmenu", handleContextMenu);
    // return () => {
    //   document.removeEventListener("contextmenu", handleContextMenu);
    // };
  }, []);



  const ConfigExplanation = () => {
    return <h1>配置说明</h1>
  }

  const ShareConfig = () => {
    return <h1>分享配置</h1>
  }


  //#region 渲染
  return (
    <div id="root">
      <TitleBar />

      <div className="flex w-full h-[calc(100vh-32px)]">
        <Router>
          <Aside />
          <div id="content" className="w-full h-full">
            <Routes>
              <Route path="/" element={<GenerateConfig />} />
              <Route path="/generate-config" element={<GenerateConfig />} />
              <Route path="/config-explanation" element={<ConfigExplanation />} />
              <Route path="/share-config" element={<ShareConfig />} />
            </Routes>
          </div>
        </Router>
      </div>
    </div>

  );
  //#endregion
}

export default App