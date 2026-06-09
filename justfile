# Lokal geliştirme kısayolları — `just <recipe>` ile çalıştırılır.
# Lokal çalıştırma prod compose + lokal override ile yapılır.

# Compose dosyaları (prod + lokal override) — her recipe'te tekrar etmemek için
COMPOSE := "-f docker-compose.prod.yml -f docker-compose.local.yml"

# Komut listesini göster (bare `just` bunu çalıştırır)
default:
    @just --list

# Build ederek arka planda ayağa kaldır
up:
    docker compose {{COMPOSE}} up -d --build

# Build etmeden başlat (zaten build edilmişse hızlı)
start:
    docker compose {{COMPOSE}} start

# Container'ları durdur (down değil — volume/network korunur)
stop:
    docker compose {{COMPOSE}} stop

# Container'ları kaldır (down; named volume'ler korunur)
down:
    docker compose {{COMPOSE}} down

# Kod değişikliğini yansıt: kaldır + yeniden build edip ayağa kaldır (en sık kullanılan)
restart:
    docker compose {{COMPOSE}} down
    docker compose {{COMPOSE}} up -d --build

# Sadece frontend'i yeniden build edip ayağa kaldır (diğer servislere dokunmaz)
rebuild-front:
    docker compose {{COMPOSE}} up -d --build --no-deps frontend

# Sadece backend'i yeniden build edip ayağa kaldır (diğer servislere dokunmaz)
rebuild-back:
    docker compose {{COMPOSE}} up -d --build --no-deps backend

# Tüm servislerin loglarını canlı izle
logs:
    docker compose {{COMPOSE}} logs -f

# Sadece backend loglarını canlı izle
logs-back:
    docker compose {{COMPOSE}} logs -f backend

# Sadece frontend loglarını canlı izle
logs-front:
    docker compose {{COMPOSE}} logs -f frontend

# Container durumlarını göster
ps:
    docker compose {{COMPOSE}} ps

# Postgres container'ına psql ile gir (SEP_Db veritabanı, postgres kullanıcısı)
psql:
    docker compose {{COMPOSE}} exec postgres psql -U postgres -d SEP_Db

# down + dangling image ve build cache temizliği (volume'lere DOKUNMAZ)
clean:
    docker compose {{COMPOSE}} down
    docker image prune -f
    docker builder prune -f
