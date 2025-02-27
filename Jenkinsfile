pipeline {
    agent { 
        docker { image 'eclipse-temurin:21-jdk' } // Official JDK 21 image
    }
    
    environment {
        DOCKER_HUB_CREDENTIALS = 'DOCKER_CREDENTIALS' // Set in Jenkins
        DOCKER_IMAGE_BACKEND = 'fakecraker/users-management-backend'
        DOCKER_IMAGE_FRONTEND = 'fakecraker/users-management-frontend'
    }
    
    stages {
        stage('Install Maven') {
            steps {
                sh 'apt update && apt install -y maven'
                sh 'mvn -version' // Verify installation
            }
        }

        
        stage('Clone Repository') {
            steps {
                git 'https://github.com/fakecraker/users-management-system.git'
            }
        }
        
        stage('Build and Test Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean install'
                }
            }
        }
        
        stage('Build and Test Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE_BACKEND ./backend'
                sh 'docker build -t $DOCKER_IMAGE_FRONTEND ./frontend'
            }
        }
        
        stage('Push Docker Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: DOCKER_HUB_CREDENTIALS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh 'docker push $DOCKER_IMAGE_BACKEND'
                    sh 'docker push $DOCKER_IMAGE_FRONTEND'
                }
            }
        }
    }
}
