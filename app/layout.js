import "./globals.css";

export const metadata = {
  title: "归星宠物殡葬 | 温柔送别每一位家人",
  description:
    "归星宠物殡葬提供宠物接运、告别仪式、独立火化与纪念留存服务，让离别过程更体面、更安心。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
