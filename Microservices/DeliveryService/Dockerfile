#FROM ivonet/payara:5.193.1

FROM payara/micro:5.194
USER root

# create a custom config folder
RUN mkdir ${PAYARA_HOME}/config

# copy domain_docker.xml into config to read your data sources and jndi
COPY domain_docker.xml ${PAYARA_HOME}/config/

# copy mysql pure java driver into config directory
COPY mysql-connector-java-8.0.28.jar ${PAYARA_HOME}/config

RUN chown -R payara:payara ${PAYARA_HOME}/config

USER payara

WORKDIR ${PAYARA_HOME}

# Deploy artifacts
# copy your war file into deploy directory of payara


COPY ./artifact/DeliveryService.war $DEPLOY_DIR



CMD ["--addLibs","/opt/payara/config/mysql-connector-java-8.0.28.jar", "--deploymentDir", "/opt/payara/deployments", "--rootDir", "/opt/payara/config","--domainConfig", "/opt/payara/config/domain_docker.xml"]




