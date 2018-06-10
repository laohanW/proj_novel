#!/bin/bash
basepath=$(cd `dirname $0`; pwd)
service mysql status
service mysql restart
gnome-terminal -t "redis-server" -x bash -c "/usr/local/redis/src/redis-server $basepath/redis.conf;exec bash;"
gulp