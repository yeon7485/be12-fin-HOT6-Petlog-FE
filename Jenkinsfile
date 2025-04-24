pipeline {
    agent any

    environment {
        IMAGE_NAME = 'petlog/frontend'
        IMAGE_TAG = "${BUILD_NUMBER}"
        TAG = "0.1.${BUILD_NUMBER}"
        K8S_MASTER = "test@192.0.60.11" 
    }

    stages {
        stage('Git Clone') {
            steps {
                echo "📥 Clone Repository"
                git branch: 'main', url: 'https://github.com/beyond-sw-camp/be12-fin-HOT6-Petlog-FE'
            }
        }

        stage('Build Frontend') {
            steps {
                echo "📦 Install dependencies and build"
                sh '''
                    pwd && ls -al
                    rm -rf node_modules package-lock.json dist
                    npm install
                    npm install @rollup/rollup-linux-x64-gnu --save-optional
                    npx vite build
                '''
            }
        }

        stage('Debug Build Output') {
            steps {
                echo "🔍 Checking dist directory..."
                sh 'ls -al dist'
            }
        }

        stage('Docker Build & Push') {
            steps {
                withCredentials([
                    usernamePassword(credentialsId: 'DOCKER_USER', usernameVariable: 'DOCKER_ID', passwordVariable: 'DOCKER_PW')
                ]) {
                    echo "🐳 Docker Build & Push"
                    sh """
                        docker build -t ${IMAGE_NAME}:${TAG} .
                        docker login -u $DOCKER_ID -p $DOCKER_PW
                        docker push ${IMAGE_NAME}:${TAG}
                    """
                }
            }
        }

        stage('Deploy Canary Ingress (10%)') {
            steps {
                script {
                    def ingressFile = "k8s/frontend-canary-ingress.yml"
        
                    echo "🛠 Creating 10% canary ingress for frontend-v2"
        
                    sh """#!/bin/bash
                        K8S_MASTER="${K8S_MASTER}"
                        remote_dir="/home/test/k8s/frontend"
        
                        echo "📤 Sending ingress file to \$K8S_MASTER"
                        ssh -o StrictHostKeyChecking=no \$K8S_MASTER "mkdir -p \$remote_dir"
                        scp -o StrictHostKeyChecking=no ${ingressFile} \$K8S_MASTER:\$remote_dir/
        
                        echo "🚀 Applying canary ingress"
                        ssh -o StrictHostKeyChecking=no \$K8S_MASTER "kubectl apply -f \$remote_dir/frontend-canary-ingress.yml"
                    """
                }
            }
        }


    }
}
