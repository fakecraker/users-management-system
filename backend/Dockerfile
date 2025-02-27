FROM openjdk:21-jdk-slim
WORKDIR /app
COPY target/usersmanagementsystem-0.0.1-SNAPSHOT.jar backend.jar
EXPOSE 8080
CMD ["java", "-jar", "backend.jar"]