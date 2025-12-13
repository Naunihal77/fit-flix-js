import Link from "next/link";

export default function ProgramsPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000",
        paddingTop: "120px",
        paddingInline: "20px",
      }}
    >
      <section style={{ maxWidth: "520px", margin: "0 auto" }}>
        <h1
          style={{
            color: "#FFD700",
            fontSize: "2.2rem",
            fontWeight: 900,
            marginBottom: "24px",
          }}
        >
          Programs
        </h1>

        {/* LABEL LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                display: "block",
                padding: "14px 18px",
                borderRadius: "10px",
                background: "#111",
                color: "#fff",
                fontWeight: 700,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                border: "1px solid #222",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#FF8C00";
                e.currentTarget.style.color = "#000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#111";
                e.currentTarget.style.color = "#fff";
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
