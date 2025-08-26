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

# Optionally set environment variables for DB if desired (override appsettings in compose)
# ENV ConnectionStrings__Default="Host=postgres;Database=SEP_Db;Username=postgres;Password=vavi;Port=5432"

COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "SmartEventPlanningSystem.API.dll"]


