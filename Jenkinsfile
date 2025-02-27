pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/fakecraker/users-management-system.git'
            }
        }

        stage('Build Backend') {
            steps {
                 dir('backend') { // Navigate to backend folder
                 sh 'chmod +x mvnw' // Ensure the Maven wrapper is executable
                 sh './mvnw clean package -DskipTests' // Build JAR file
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    sh 'cd backend && docker build -t fakecraker/backend:latest .'
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    sh 'cd frontend && docker build -t fakecraker/frontend:latest .'
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'DOCKER_CREDENTIALS', usernameVariable: 'DOCKER_HUB_USER', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                    sh 'echo $DOCKER_HUB_PASSWORD | docker login -u $DOCKER_HUB_USER --password-stdin'
                    sh 'docker push $DOCKER_HUB_USER/backend:latest'
                    sh 'docker push $DOCKER_HUB_USER/frontend:latest'
                }
            }
        }

        stage('Deploy Containers') {
            steps {
                script {
                    sh 'docker-compose down'
                    sh 'docker-compose up --build -d'
                }
            }
        }
    }
}
