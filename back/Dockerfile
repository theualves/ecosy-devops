# --- ETAPA 1: BUILD ---
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copia dependências e código
COPY pom.xml .
COPY src ./src

# Compila o projeto e gera o .jar (Pula testes para ser rápido)
RUN mvn clean package -DskipTests

# --- ETAPA 2: RUN ---
FROM eclipse-temurin:21-jre
WORKDIR /app

# Pega apenas o JAR gerado na etapa anterior
COPY --from=build /app/target/*.jar app.jar

# Define variáveis de ambiente padrão (serão sobrescritas pelo docker-compose)
ENV DB_HOST=localhost
ENV DB_USER=root
ENV DB_PASSWORD=root

# Expõe a porta 8080
EXPOSE 8080

# Roda o app
ENTRYPOINT ["java", "-jar", "app.jar"]