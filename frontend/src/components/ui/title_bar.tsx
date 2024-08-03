import { Quit, WindowMinimise } from "../../../wailsjs/runtime/runtime";
import logo from "../../assets/appicon.png";

export default function TitleBar() {

    const minimizeHandler = () => {
        WindowMinimise()
    }

    const closeHandler = () => {
        try {
            Quit()
        } catch (error) {
            console.error("Error closing the application:", error);
        }
    }


    return <div id="title-bar" className="flex items-center justify-end p-0 bg-[var(--bg-200)]">
        {/* 应用图标 */}
        <div className="absolute flex items-center justify-start w-12 h-8 left-5">
            <img src={logo} alt="logo" className="w-6 h-6" />
        </div>

        {/* 应用标题 */}
        <div className="absolute flex items-center justify-center h-8 transform -translate-x-1/2 left-1/2">
            <span className="font-bold text-l text-[var(--text-100)]">Nroland 配置编辑器</span>
        </div>
        
        {/* 最小化 */}
        <button className="title-bar-controls flex items-center justify-center w-12 h-8 hover:bg-[var(--bg-300)]" onClick={minimizeHandler}>
            <svg className="w-4 h-4 text-[var(--text-100)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
        {/* 关闭 */}
        <button className="title-bar-controls flex items-center justify-center w-12 h-8 hover:bg-[var(--accent-100)] hover:text-[var(--text-100)]" onClick={closeHandler}>
            <svg className="w-4 h-4 text-[var(--text-100)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
    </div>
}