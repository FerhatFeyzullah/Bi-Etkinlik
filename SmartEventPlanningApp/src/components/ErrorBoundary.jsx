import React from "react";

// Global hata sınırı: alt ağaçta render/reducer sırasında bir hata fırlatılırsa
// tüm uygulamanın beyaz sayfaya düşmesini önler, kullanıcıya kurtarma ekranı gösterir.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Debug edilebilmesi için hatayı console'a logla
    console.error("ErrorBoundary bir hata yakaladı:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Stil inline tutuluyor: bu fallback, MUI/Redux/i18n çökse bile çalışmalı.
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            padding: "24px",
            textAlign: "center",
            fontFamily: "sans-serif",
            color: "#333",
            backgroundColor: "#fafafa",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", margin: 0 }}>Bir şeyler ters gitti</h1>
          <p style={{ maxWidth: "420px", color: "#666", margin: 0 }}>
            Beklenmeyen bir hata oluştu. Lütfen sayfayı yenileyin. Sorun devam
            ederse daha sonra tekrar deneyin.
          </p>
          <button
            onClick={this.handleReload}
            style={{
              padding: "10px 20px",
              fontSize: "1rem",
              color: "#fff",
              backgroundColor: "#1976d2",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Sayfayı Yenile
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
