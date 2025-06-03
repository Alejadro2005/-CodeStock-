FROM jenkins/jenkins:lts

USER root

# Instalar dependencias necesarias
RUN apt-get update && apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    && rm -rf /var/lib/apt/lists/*
 
# Instalar Docker CLI
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg \
    && echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null \
    && apt-get update \
    && apt-get install -y docker-ce-cli \
    && rm -rf /var/lib/apt/lists/*

# Configurar Jenkins
ENV CASC_JENKINS_CONFIG=/usr/local/casc.yaml
ENV JAVA_OPTS=-Djenkins.install.runSetupWizard=false

# Copiar configuración y plugins
COPY k8s/jenkins-casc-configmap.yaml /usr/local/casc.yaml
COPY plugins.txt /usr/share/jenkins/ref/plugins.txt

# Instalar plugins
RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt 

# Volver al usuario jenkins
USER jenkins 