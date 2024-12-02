package com.capus.securedapi.controllers;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.authenticated;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;




@SpringBootTest
@AutoConfigureMockMvc
public class InformationControllerTest {

    protected Long sharedId;

    @Autowired
    private MockMvc mockMvc;

    @WithMockUser(username = "user1", roles = "EDITOR")
    @Test
    public void testCreateInfo() throws Exception {
        // Arrange
        String infoJson = "{\"message\":\"Test unit test\"}";

        // Act
        ResultActions result = mockMvc.perform(post("/api/informations/")
                .contentType(MediaType.APPLICATION_JSON)
                .content(infoJson));

        // Assert
        result.andExpect(
                status().isCreated())
                .andExpect(content().contentType(MediaType. APPLICATION_JSON))
                .andExpect(jsonPath("$.message").value("Information created"))
                .andExpect(authenticated());
    }

    @Test
    public void testUpdateInfo_HappyPath() throws Exception {
        // Arrange
        long userId = 40L;
        String infoJson = "{\"message\":\"Test unit test\"}";

        // Act
        ResultActions result = mockMvc.perform(put("/api/informations/update/{id}", userId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(infoJson));

        // Assert
        result.andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType. APPLICATION_JSON))
                .andExpect(jsonPath("$.message").value("Information updated"));
    }

    @Test
    public void testDeleteInfo_HappyPath() throws Exception {
        // Arrange
        long Id = 40L;

        // Act
        ResultActions result = mockMvc.perform(delete("/api/informations/{id}", Id));

        // Assert
        result.andExpect(status().isOk());
    }
    @Test
    public void testDeleteInfo_NoInfoFound() throws Exception {
        // Arrange
        long Id = 0L;

        // Act
        ResultActions result = mockMvc.perform(delete("/api/informations/{id}", Id));

        // Assert
        result.andExpect(status().isNotFound());
    }
}