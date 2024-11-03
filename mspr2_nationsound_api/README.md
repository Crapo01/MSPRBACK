# MSPR2 nationsound API MYSQL

eclipse with springboot initializer

java project, maven

dependencies:

    Spring web  
    Spring Data Jpa
    MySQL Driver
    Lombok




source: 

https://www.youtube.com/watch?v=vpf4LB54rVw

https://www.bezkoder.com/spring-boot-jwt-authentication/

## application.properties

https://stackoverflow.com/questions/71518442/cannot-load-driver-class-jdbcmysql-localhost3306-mydatabase

//connect to db  

    spring.datasource.url=jdbc:mysql://localhost:3306/nationsound  
    spring.datasource.username=root  
    spring.datasource.password=  
    spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver  
    spring.jpa.show-sql: true   
 
 

//auto create tables  

spring.jpa.hibernate.ddl-auto=update  


## SECURITY JWT

source:

https://www.bezkoder.com/spring-boot-jwt-authentication/


### Technology

    Java 17 / 11 / 8
    Spring Boot 3 / 2 (with Spring Security, Spring Web, Spring Data JPA)
    jjwt-api 0.11.5
    
### Dependencies

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
            
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.11.5</version>
    </dependency>
    
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-impl</artifactId>
        <version>0.11.5</version>
        <scope>runtime</scope>
    </dependency>
    
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-jackson</artifactId>
        <version>0.11.5</version>
        <scope>runtime</scope>
    </dependency>

    <dependency>
    <groupId>jakarta.validation</groupId>
    <artifactId>jakarta.validation-api</artifactId>
    <version>3.1.0</version>
    </dependency>

## Controller for testing Authorization

There are 4 APIs:

    – /api/test/all for public access
    – /api/test/user for users has ROLE_USER or ROLE_MODERATOR or ROLE_ADMIN
    – /api/test/mod for users has ROLE_MODERATOR
    – /api/test/admin for users has ROLE_ADMIN


