package com.capus.securedapi.repositary;

import com.capus.securedapi.entity.Information;

import com.capus.securedapi.repository.InformationRepository;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class InformationRepositoryIntegrationTest {
    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private InformationRepository informationRepository;

    @Test
    public void testFindAll() {
        //GIVEN
        Information information = new Information();
        information.setMessage("test");

        //WHEN
        List<Information> informations = informationRepository.findAll();

        //assert
        assertFalse(informations.isEmpty());

    }




}