export default function Layout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", gap: "24px" }}>
      <aside style={{ width: 250 }}>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}

