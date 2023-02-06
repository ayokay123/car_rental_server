FROM mysql:8.0.15

RUN apt-get update && \
    apt-get install -y locales && \
    echo "ja_JP UTF-8" > /etc/locale.gen && \
    locale-gen
ENV LANG="ja_JP.UTF-8"