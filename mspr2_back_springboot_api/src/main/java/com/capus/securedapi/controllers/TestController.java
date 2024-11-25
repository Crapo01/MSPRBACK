package com.capus.securedapi.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "User roles", description = "User's roles test APIs")
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {

  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "All access allowed")
  })
  @Operation(
          summary = "Return access status",
          description = "All access allowed.The response is a string describing user's access rights.",
          tags = { "All access allowed" })
  @GetMapping("/all")
  public String allAccess() {
    return "Public Content.";
  }

  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "Viewer Content."),
          @ApiResponse(responseCode = "401")
  })
  @Operation(
          summary = "Return access status",
          description = "ONLY FOR VIEWERS.The response is a string describing user's access rights.",
          tags = { "Viewer only" })
  @GetMapping("/viewer")
  @PreAuthorize("hasRole('VIEWER')")
  public String viewerAccess() {
    return "Viewer Content.";
  }

  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "Editor Content."),
          @ApiResponse(responseCode = "401")
  })
  @Operation(
          summary = "Return access status",
          description = "ONLY FOR EDITORS.The response is a string describing user's access rights.",
          tags = { "Editor only" })
  @GetMapping("/editor")
  @PreAuthorize("hasRole('EDITOR')")
  public String editorAccess() {
    return "Editor Content.";
  }

  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "Admin Content."),
          @ApiResponse(responseCode = "401")
  })
  @Operation(
          summary = "Return access status",
          description = "ONLY FOR ADMINS.The response is a string describing user's access rights.",
          tags = { "Admin only" })
  @GetMapping("/admin")
  @PreAuthorize("hasRole('ADMIN')")
  public String adminAccess() {
    return "Admin Content.";
  }
}
