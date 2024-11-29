# MSPR2 nationsound API MYSQL
eclipse with springboot initializer  
java project, maven  

dependencies:

Spring web  
Spring Data Jpa  
MySQL Driver  
Lombok  

source: https://www.youtube.com/watch?v=vpf4LB54rVw


## application.properties

https://stackoverflow.com/questions/71518442/cannot-load-driver-class-jdbcmysql-localhost3306-mydatabase
//connect to db  

spring.application.name=secured_api

spring.jpa.hibernate.ddl-auto=update  
spring.datasource.url=jdbc:mysql://localhost:3306/securityjwt  
spring.datasource.username= "db username here" 
spring.datasource.password= "db password here"  
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.show-sql= true


//auto create tables  
spring.jpa.hibernate.ddl-auto=update

## SECURITY JWT

https://www.bezkoder.com/spring-boot-jwt-authentication/  




## PUSH NOTIFICATIONS

    <!-- https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-websocket -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-websocket</artifactId>
        <version>3.3.5</version>
    </dependency>

resource:

[send-push-from-spring-boot-backend-to-react](https://hpcodes.medium.com/send-messages-from-spring-boot-backend-to-reactjs-app-using-websocket-4120f6979c9b)

## SWAGGER

    <!-- https://mvnrepository.com/artifact/org.springdoc/springdoc-openapi-starter-webmvc-ui -->
		<dependency>
			<groupId>org.springdoc</groupId>
			<artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
			<version>2.7.0-RC1</version>
		</dependency>

### resource:
documentation:  
https://bell-sw.com/blog/documenting-rest-api-with-swagger-in-spring-boot-3/  
https://springdoc.org/   
https://www.bezkoder.com/swagger-3-annotations/    
https://bell-sw.com/blog/documenting-rest-api-with-swagger-in-spring-boot-3/#mcetoc_1heq9ft3o1r  


[springboot with swagger doc](https://bell-sw.com/blog/documenting-rest-api-with-swagger-in-spring-boot-3/)

Navigate to http://localhost:8080/swagger-ui.html

## TDD and Junit tests

    <!-- https://mvnrepository.com/artifact/junit/junit -->
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.13.2</version>
        <scope>test</scope>
    </dependency>


https://www.jetbrains.com/help/idea/tests-in-ide.html


documentation:  
https://www.linkedin.com/learning/spring-test-driven-development-with-junit/write-integration-tests-for-service?resume=false&u=56745737   




