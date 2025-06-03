pipeline {
    agent {
        kubernetes {
            yaml '''
apiVersion: v1
kind: Pod
metadata:
  labels:
    jenkins-agent: codestock
spec:
  containers:
  - name: kaniko
    image: gcr.io/kaniko-project/executor:debug
    command:
    - sleep
    args:
    - infinity
    tty: true
    resources:
      requests:
        memory: "2Gi"
        cpu: "1000m"
      limits:
        memory: "4Gi"
        cpu: "2000m"
    volumeMounts:
      - name: kaniko-secret
        mountPath: /kaniko/.docker-config
      - name: npm-cache
        mountPath: /root/.npm
  - name: jnlp
    image: jenkins/inbound-agent:latest
    resources:
      requests:
        memory: "512Mi"
        cpu: "200m"
      limits:
        memory: "1Gi"
        cpu: "1000m"
  volumes:
    - name: kaniko-secret
      secret:
        secretName: regcred
    - name: npm-cache
      emptyDir: {}
'''
            defaultContainer 'kaniko'
        }
    }
    environment {
        BACKEND_IMAGE = "docker.io/alejandromons/codestock-backend:latest"
        FRONTEND_IMAGE = "docker.io/alejandromons/codestock-frontend:latest"
        DOCKER_CREDENTIALS = credentials('docker-hub-credentials')
        NODE_OPTIONS = "--max-old-space-size=4096"
    }
    stages {
        stage('Build & Push Backend') {
            steps {
                container('kaniko') {
                    sh '''
                        mkdir -p /kaniko/.docker
                        cp /kaniko/.docker-config/config.json /kaniko/.docker/config.json
                        /kaniko/executor --dockerfile=backend/Dockerfile --context=./backend --destination=$BACKEND_IMAGE --cache=true
                    '''
                }
            }
        }
        stage('Build & Push Frontend') {
            steps {
                container('kaniko') {
                    sh '''
                        mkdir -p /kaniko/.docker
                        cp /kaniko/.docker-config/config.json /kaniko/.docker/config.json
                        /kaniko/executor --dockerfile=frontend/Dockerfile --context=./frontend --destination=$FRONTEND_IMAGE --cache=true
                    '''
                }
            }
        }
    }
    post {
        always {
            deleteDir()
        }
    }
} 