package com.capus.securedapi.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
  @GetMapping("/all")
  public String allAccess() {
    return "Public Content.";
  }

  @GetMapping("/viewer")
  @PreAuthorize("hasRole('VIEWER') or hasRole('EDITOR') or hasRole('ADMIN')")
  public String viewerAccess() {
    return "Viewer Content.";
  }

  @GetMapping("/editor")
  @PreAuthorize("hasRole('EDITOR') or hasRole('ADMIN')")
  public String editorAccess() {
    return "Editor Content.";
  }

  @GetMapping("/admin")
  @PreAuthorize("hasRole('ADMIN')")
  public String adminAccess() {
    return "Admin Content.";
  }
}
