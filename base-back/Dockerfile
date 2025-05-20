FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN ./mvnw install -DskipTests

CMD ["./mvnw", "spring-boot:run"]
