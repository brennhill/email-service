FROM amazonlinux:latest

COPY . /mailservice
WORKDIR /mailservice

# Install C and wget, in case addons need to be added later.
RUN yum install gcc44 gcc-c++ libgcc44 cmake wget tar gzip make -y
RUN curl -sL https://rpm.nodesource.com/setup_8.x | bash -
RUN yum install -y nodejs

ENV NODE_ENV 8.10.0
ENV EMAIL_MICROSERVICE_PORT=8888
RUN npm install
EXPOSE 8888
ENTRYPOINT npm start