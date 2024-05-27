

 docker run   --name=docker_delivery1 -p 9020:8080 -m=400m -e JVM_ARGS="-Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=9010 -Dcom.sun.management.jmxremote.local.only=false -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false" --network pizza_app_network -d delivery_image

 docker run   --name=docker_delivery1 -p 9020:8080 -e HEAP="-Xms128m -Xmx256m" -e JVM_ARGS="-Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=9010 -Dcom.sun.management.jmxremote.local.only=false -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false" --network pizza_app_network -d delivery_image


 docker run   --name=docker_delivery1 -p 9020:8080 -e JVM_ARGS="-Xms128m -Xmx256m -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=9010 -Dcom.sun.management.jmxremote.local.only=false -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false" --network pizza_app_network -d delivery_image


