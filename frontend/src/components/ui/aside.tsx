import { useState } from "react";
import { ChevronRight, ChevronLeft, Pencil, Github } from "lucide-react";
import { NavLink } from 'react-router-dom';
import { BrowserOpenURL } from "../../../wailsjs/runtime/runtime"

const cn = (...classes: string[]) => {
    return classes.join(" ");
};

function openGithub() {
    BrowserOpenURL("https://github.com/deadmau5v/Norland-Editor");
}

export default function Aside() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div id="aside" className={cn("w-[200px] h-full", isCollapsed ? "w-[60px]" : "", "p-2 flex flex-col")}>
            {/* 折叠按钮 */}
            <AsideOption
                Icon={<ChevronLeft className="w-4 h-4 text-[var(--text-100)] transition-all duration-300" />}
                IconCollapsed={<ChevronRight className="w-4 h-4 text-[var(--text-100)] transition-all duration-300" />}
                Text={"折叠"}
                onClick={() => setIsCollapsed(!isCollapsed)}
                isCollapsed={isCollapsed}
            />
            <hr className="w-full h-[1px] mt-2 mb-2 border-[var(--bg-300)]" />

            <NavLink to="/generate-config" className={({ isActive }) => cn("flex items-center justify-center w-full h-10 hover:bg-[var(--bg-300)] rounded-xl transition-all duration-300 mt-2 mb-2", isActive ? 'bg-[var(--bg-300)]' : '')}>
                {!isCollapsed ? (
                    <>
                        <Pencil className="w-4 h-4 text-[var(--text-100)] transition-all duration-300" />
                        <span className="text-[var(--text-100)] ml-2 hidden md:block text-sm whitespace-nowrap overflow-hidden transition-all duration-300">编辑配置</span>
                    </>
                ) : (
                    <Pencil className="w-4 h-4 text-[var(--text-100)] transition-all duration-300" />
                )}
            </NavLink>

            <hr className="w-full h-[1px] mt-auto mb-2 border-[var(--bg-300)]" />

            <button className={"flex items-center justify-center w-full h-10 hover:bg-[var(--bg-300)] rounded-xl transition-all duration-300 mb-2"} onClick={openGithub}>
                {!isCollapsed ? (
                    <>
                        <Github className="w-4 h-4 text-[var(--text-100)] transition-all duration-300" />
                        <span className="text-[var(--text-100)] ml-2 hidden md:block text-sm whitespace-nowrap overflow-hidden transition-all duration-300">项目地址</span>
                    </>
                ) : (
                    <Github className="w-4 h-4 text-[var(--text-100)] transition-all duration-300" />
                )}
            </button>
        </div>
    );
}


function AsideOption({ Icon, Text, onClick, isCollapsed, IconCollapsed, ClassName }: { Icon: React.ReactNode, Text: string, onClick: () => void, isCollapsed: boolean, IconCollapsed: React.ReactNode, ClassName?: string }) {

    return (
        <button className={cn("flex items-center justify-center w-full h-10 hover:bg-[var(--bg-300)] rounded-xl transition-all duration-300 mt-2 mb-2", ClassName ? ClassName : "")} onClick={onClick}>
            {isCollapsed ? IconCollapsed : Icon}
            {!isCollapsed && (
                <span className="text-[var(--text-100)] ml-2 hidden md:block text-sm whitespace-nowrap overflow-hidden transition-all duration-300"
                    style={{ width: isCollapsed ? '0' : 'auto', opacity: isCollapsed ? 0 : 1 }}>
                    {Text}
                </span>
            )}
        </button>
    )
}
