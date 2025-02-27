pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'your-dockerhub-username'
        DOCKER_HUB_PASSWORD = 'your-dockerhub-password'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/your-username/fullstack-app.git'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    sh 'cd backend && docker build -t $DOCKER_HUB_USER/backend:latest .'
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    sh 'cd frontend && docker build -t $DOCKER_HUB_USER/frontend:latest .'
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                script {
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
