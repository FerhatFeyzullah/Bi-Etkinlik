FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# copy solution and restore
COPY SmartEventPlanningSystem/SmartEventPlanningSystem.sln ./
COPY SmartEventPlanningSystem/Core/SmartEventPlanningSystem.Application/SmartEventPlanningSystem.Application.csproj Core/SmartEventPlanningSystem.Application/
COPY SmartEventPlanningSystem/Core/SmartEventPlanningSystem.Domain/SmartEventPlanningSystem.Domain.csproj Core/SmartEventPlanningSystem.Domain/
COPY SmartEventPlanningSystem/Infrastructure/SmartEventPlanningSystem.Infrastructure/SmartEventPlanningSystem.Infrastructure.csproj Infrastructure/SmartEventPlanningSystem.Infrastructure/
COPY SmartEventPlanningSystem/Infrastructure/SmartEventPlanningSystem.Persistence/SmartEventPlanningSystem.Persistence.csproj Infrastructure/SmartEventPlanningSystem.Persistence/
COPY SmartEventPlanningSystem/Presentation/SmartEventPlanningSystem.API/SmartEventPlanningSystem.API.csproj Presentation/SmartEventPlanningSystem.API/

RUN dotnet restore Presentation/SmartEventPlanningSystem.API/SmartEventPlanningSystem.API.csproj

# copy all and publish
COPY SmartEventPlanningSystem/ ./
RUN dotnet publish Presentation/SmartEventPlanningSystem.API/SmartEventPlanningSystem.API.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 7126

# Ensure ASP.NET binds to container port
ENV ASPNETCORE_URLS=http://0.0.0.0:7126

# HEALTHCHECK icin curl (tek katman, cache temizligiyle)
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/publish .

# Non-root: .NET 8 image'inin hazir 'app' kullanicisi; upload dizinine yazma izni ver
RUN mkdir -p /app/wwwroot/upload && chown -R app:app /app/wwwroot
USER app

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
    CMD curl -fsS http://localhost:7126/health || exit 1

ENTRYPOINT ["dotnet", "SmartEventPlanningSystem.API.dll"]


