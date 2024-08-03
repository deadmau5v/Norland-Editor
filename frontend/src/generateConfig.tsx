import { useState, useEffect } from "react";
import orgData from "./lib/game_data"
// import { RefreshCcw } from "lucide-react";

export default function GenerateConfig() {
    const [data, setData] = useState(orgData);
    const filterKeys = (keys: string[], exclude: string[]) => keys.filter(key => !exclude.some(ex => key.includes(ex)));
    const [buttonText, setButtonText] = useState("生成配置");

    interface DataSchema {
        [key: string]: any;
    }

    useEffect(() => {
        setData({ ...orgData });
    }, []);

    const getDataProperty = (data: DataSchema, key: string, prefix: string) => {
        const fullKey = `${prefix}${key}`;
        return data[fullKey];
    }

    const getNestedKeys = (data: DataSchema, key: string) => {
        const item = data[key];
        return filterKeys(Object.keys(item), ["__desc__", "__type__"]);
    }

    // const reloadOrgData = () => {
    //     import("./lib/game_data").then((module) => {
    //         setData({ ...module.default });
    //     });
    // }

    const changeData = (e: React.ChangeEvent<HTMLInputElement>, _: string, subKey: string, path: string[]) => {
        setData((prevData: DataSchema) => {
            let newData: DataSchema = { ...prevData };
            let current = newData;
            for (const segment of path) {
                if (!current[segment]) {
                    current[segment] = {};
                }
                current = current[segment];
            }
            const numericValue = parseFloat(e.target.value);
            if (!isNaN(numericValue)) {
                current[subKey] = numericValue;
            }
            return newData as unknown as typeof data;
        });
    }

    const renderNestedData = (data: DataSchema, key: string, path: string[] = []) => {
        const subItems = getNestedKeys(data, key);
        return subItems.map(subKey => {
            const subItemType = getDataProperty(data[key], subKey, "__type__");
            const subItemDesc = getDataProperty(data[key], subKey, "__desc__");
            const subItemValue = data[key][subKey];

            return (
                <div key={subKey} className="p-2 m-2 rounded-xl bg-[rgb(0,0,0,0.05)]">
                    <div className="text-sm text-[--text-200]">
                        <span className="font-semibold text-[--text-100] text-base p-1 rounded-sm">{subItemDesc}</span>
                        <div className="m-1 ml-4">
                            {subItemType === "object" ? renderNestedData(data[key], subKey, [...path, key]) : (
                                <div>
                                    {subItemType === "number" ? (
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            value={subItemValue}
                                            onChange={(e) => changeData(e, key, subKey, [...path, key])}
                                            className="w-full p-1 rounded shadow-sm bg-[var(--bg-200)] text-[var(--text-100)] h-10"
                                        />
                                    ) : (
                                        <span>{subItemValue}</span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );
        });
    };

    const mainKeys = filterKeys(Object.keys(data), ["__desc__", "__type__"]);

    const stripMetaData = (data: DataSchema) => {
        const result = JSON.parse(JSON.stringify(data));
        const stripKeys = (obj: any) => {
            Object.keys(obj).forEach(key => {
                if (key.includes("__desc__") || key.includes("__type__")) {
                    delete obj[key];
                } else if (typeof obj[key] === 'object') {
                    stripKeys(obj[key]);
                }
            });
        };
        stripKeys(result);
        return result;
    };

    return (
        <div id="generate-config">
            {mainKeys.map(key => (
                <div key={key} className="p-4 mb-2 bg-[--bg-300] rounded-lg shadow">
                    <div className="text-xl font-semibold">{getDataProperty(data, key, "__desc__")}</div>
                    <div>{renderNestedData(data, key)}</div>
                </div>
            ))}
            <div className="fixed bottom-0 right-0 p-4 ml-2">
                <div className="flex flex-row items-center">
                    <button
                        className="p-2 text-[var(--text-100)] bg-[var(--bg-200)] rounded border border-[var(--text-200)] shadow download-btn ml-2 mb-2"
                        onClick={() => {
                            const strippedData = stripMetaData(data);
                            navigator.clipboard.writeText(JSON.stringify(strippedData));
                            setButtonText("👌已复制到剪贴板");
                            setTimeout(() => {
                                setButtonText("生成配置");
                            }, 1000);
                        }}
                    >
                        {buttonText}
                    </button>
                    {/* <button
                        className="p-2 text-[var(--text-100)] bg-[var(--bg-200)] rounded border border-[var(--text-200)] shadow download-btn ml-2 mb-2"
                        onClick={() => {
                            reloadOrgData();
                        }}
                    >
                        <RefreshCcw className="w-6 h-6" />
                    </button> */}
                </div>
            </div>
        </div>
    );
}