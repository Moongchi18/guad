FROM nginx
RUN mkdir /app
WORKDIR /app
RUN mkdir ./build
ADD ./guad_frontend/build ./build
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 33000
CMD ["nginx", "-g", "daemon off;"]