import { Heading } from "@/components/elements/Heading";

export default function EnvPage() {
    const H3 = ({ children }: { children: React.ReactNode }) => Heading({ level: 3, children });
    const H2 = ({ children }: { children: React.ReactNode }) => Heading({ level: 2, children });

    return (
        <div className="w-full md:w-1/2">
            <H2>環境</H2>
            <H3>メインPC-1</H3>
            <PCEnvTable
                spec={[
                    { key: "MB", value: "X670E Steel Legend" },
                    { key: "CPU", value: "Ryzen 9 7900X 4.7Ghz 12C24T" },
                    { key: "GPU", value: "AMD Radeon Vega 56" },
                    { key: "RAM", value: "DDR5-5600 16GB x2" },
                    { key: "OS", value: "Arch Linux + Windows 11 Pro" },
                ]}
            />
            <H3>メインPC-2</H3>
            <p>クズゴミさんありがとうございました。</p>
            <PCEnvTable
                spec={[
                    { key: "MB", value: "Z77M-D3H" },
                    { key: "CPU", value: "Intel Xeon E3-1275 3.4Ghz 4C8T" },
                    { key: "GPU", value: "NVIDIA GTX 960 Ti" },
                    { key: "RAM", value: "DDR3-1666 4GB x4" },
                    { key: "OS", value: "Arch Linux" },
                ]}
            />
            <H3>NAS</H3>
            <PCEnvTable
                spec={[
                    { key: "Model", value: "Synology DS220+" },
                    { key: "RAM", value: "2GB" },
                    { key: "HDD", value: "WD HDD 8TB x2" },
                ]}
            />
            <H3>Server</H3>
            <PCEnvTable
                spec={[
                    { key: "CPU", value: "Xeon E3-1220 3.4Ghz 4C4T" },
                    { key: "RAM", value: "DDR3-1666 4GB x2" },
                    { key: "HDD", value: "4TB + 2TB" },
                    { key: "SSD", value: "128GB" },
                    { key: "OS", value: "Manjaro" },
                ]}
            />
        </div>
    );
}

interface PCEnvProps {
    spec: {
        key: string;
        value: string;
    }[];
}
function PCEnvTable({ spec }: PCEnvProps) {
    //console.log(spec);
    return (
        <table className="table">
            <tbody>
                {spec.map((line, index) => {
                    //console.log(line);
                    return (
                        <tr key={index}>
                            <td className="w-28">{line.key}</td>
                            <td>{line.value}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
