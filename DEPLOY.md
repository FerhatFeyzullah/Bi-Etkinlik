# Bi-Etkinlik — Production Deploy Rehberi

## Mimari

```
İnternet ──TLS──> Dış ters proxy (Coolify/Traefik)
                        │  düz HTTP
                        ▼
                  frontend:8080 (nginx, non-root)
                    ├── /        → React SPA
                    ├── /api/    → backend:7126
                    └── /chat    → backend:7126 (WebSocket/SignalR)
                                      │
                                      ▼
                                postgres:5432 (sadece internal network)
```

- TLS **dış proxy'de** sonlanır; container'lar arası iletişim düz HTTP'dir.
- Backend `UseForwardedHeaders` ile `X-Forwarded-For/Proto` okur; kodda HTTPS redirect yoktur (bilinçli).
- Postgres ve backend host'a port açmaz; dışarıya tek kapı frontend'dir.

## 1. Ortam değişkenlerini hazırla

```bash
cp .env.example .env
```

`.env` içinde doldurulması zorunlu alanlar:

| Anahtar | Açıklama |
|---|---|
| `POSTGRES_PASSWORD` | Güçlü rastgele: `openssl rand -base64 24` |
| `ConnectionStrings__Default` | `Host=postgres;Port=5432;Database=SEP_Db;Username=postgres;Password=<aynı parola>` |
| `TokenOptions__Key` | En az 64 karakter: `openssl rand -base64 64` |
| `EmailSettings__SmtpUser` / `EmailSettings__SmtpPass` | Gmail adresi + uygulama şifresi |
| `Cors__AllowedOrigins__0` | Frontend'in dışarıdan erişildiği origin (örn. `https://www.domain.com`) |
| `AllowedHosts` | API'nin kabul edeceği Host header (örn. `www.domain.com`) — `*` = hepsi |
| `VITE_API_BASE` | **Boş bırak** (aynı origin, nginx proxy) — API ayrı domain'deyse doldur |

> Coolify kullanıyorsan bu anahtarları panelin **Environment Variables** bölümünden de
> girebilirsin; compose `${POSTGRES_PASSWORD}` ve `env_file: .env` üzerinden okur.

## 2. Ayağa kaldır

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

İlk açılışta backend, EF Core migration'larını **otomatik uygular** (`Database.Migrate()`).

## 3. Domain bağlama (Coolify/Traefik)

- Proxy hedefi: **`frontend` servisi, port `8080`** (tek hedef yeterli; `/api` ve `/chat`
  yönlendirmesini frontend nginx'i yapar).
- Coolify'da: uygulamaya domain ekle → port 8080'i seç → TLS (Let's Encrypt) etkinleştir.
- WebSocket: Traefik/Coolify varsayılan olarak upgrade'i geçirir; ekstra ayar gerekmez.

## 4. Doğrulama

```bash
# Container sağlık durumları (backend/frontend Dockerfile HEALTHCHECK'leri)
docker compose -f docker-compose.prod.yml ps

# API sağlık ucu (DB bağlantısı dahil) — network içinden:
docker compose -f docker-compose.prod.yml exec backend curl -fsS http://localhost:7126/health
# Dışarıdan: https://www.domain.com/api/... ve SPA'nın açıldığını kontrol et
```

`/health` → `Healthy` dönmüyorsa önce `ConnectionStrings__Default` ve postgres loglarına bak.

## Bilinen manuel adımlar

1. **Gmail uygulama şifresi**: Eski şifre git geçmişinde kaldığı için iptal edilip
   yenisi üretilmeli ve `.env`'e yazılmalı.
2. **Admin rolü + kategoriler**: Otomatik seed yok — taze veritabanında `AspNetRoles`'e
   "Admin" rolü ve temel kategoriler elle (veya ileride eklenecek seed ile) girilmelidir.
3. **Yedekleme**: `pgdata_prod` (veritabanı) ve `uploads` (kullanıcı görselleri) named
   volume'larını yedekleme planına dahil et.
