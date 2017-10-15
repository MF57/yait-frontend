FROM ubuntu

RUN apt-get update

RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN apt-get install -y git
RUN cd usr/bin; ln -s nodejs node; cd ../..

RUN apt-get install -y ruby-full rubygems-integration
RUN gem install sass -v 3.2.19
RUN gem install compass

COPY . .


RUN npm install -g bower grunt-cli
RUN npm install
RUN bower install --allow-root


EXPOSE 9000
CMD ["grunt", "serve"]