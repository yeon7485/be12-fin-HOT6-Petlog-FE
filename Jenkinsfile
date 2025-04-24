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

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    def targetVersion = (BUILD_NUMBER.toInteger() % 2 == 0) ? 'v2' : 'v1'
                    def oppositeVersion = (targetVersion == 'v2') ? 'v1' : 'v2'
                    def deployName = "frontend-${targetVersion}"
                    def ingressName = "canary-${targetVersion}"
                    def serviceName = "frontend-${targetVersion}-service"
                    def imageTag = "0.1.${BUILD_NUMBER}"
        
                    echo "🔀 BUILD_NUMBER: ${BUILD_NUMBER} → Deploying to ${targetVersion} (Image: ${imageTag})"
        
                    sh """#!/bin/bash
                        module="frontend"
                        local_dir="k8s"
                        remote_dir="/home/test/k8s/\$module"
                        K8S_MASTER="test@192.0.60.11"
        
                        echo "📤 Sending YAMLs to \$K8S_MASTER"
                        ssh -o StrictHostKeyChecking=no \$K8S_MASTER "mkdir -p \$remote_dir"
        
                        for file in \$local_dir/*.yml; do
                          filename=\$(basename \$file)
                          echo "📤 Copying \$filename"
                          scp -o StrictHostKeyChecking=no \$file \$K8S_MASTER:\$remote_dir/
                          echo "🛠 Updating tag"
                          ssh -o StrictHostKeyChecking=no \$K8S_MASTER "sed -i 's/latest/${imageTag}/g' \$remote_dir/\$filename"
                          echo "🚀 Applying \$filename"
                          ssh -o StrictHostKeyChecking=no \$K8S_MASTER "kubectl apply -f \$remote_dir/\$filename"
                        done
        
                        echo "🕹 Starting Canary rollout to ${deployName}"
                        ssh -o StrictHostKeyChecking=no \$K8S_MASTER "kubectl patch ingress ${ingressName} -p '{\"metadata\":{\"annotations\":{\"nginx.ingress.kubernetes.io/canary-weight\":\"50\"}}}'"
                        sleep 5
                        ssh -o StrictHostKeyChecking=no \$K8S_MASTER "kubectl patch ingress ${ingressName} -p '{\"metadata\":{\"annotations\":{\"nginx.ingress.kubernetes.io/canary-weight\":\"100\"}}}'"
                        sleep 5
                        ssh -o StrictHostKeyChecking=no \$K8S_MASTER "kubectl patch ingress ${ingressName} -p '{\"metadata\":{\"annotations\":{\"nginx.ingress.kubernetes.io/canary\":\"false\"}}}'"
        
                        echo "🧹 Scaling down ${oppositeVersion}"
                        ssh -o StrictHostKeyChecking=no \$K8S_MASTER "kubectl scale deployment frontend-${oppositeVersion} --replicas=0"
                    """
                }
            }
        }

    }
}
