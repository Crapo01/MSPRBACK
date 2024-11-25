package com.capus.securedapi.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;


import com.capus.securedapi.dto.ConcertDto;
import com.capus.securedapi.dto.InformationDto;
import com.capus.securedapi.dto.UserDetailsDto;
import com.capus.securedapi.dto.UserRoleUpdateDto;
import com.capus.securedapi.payload.request.CaptchaToken;
import com.capus.securedapi.payload.response.CaptchaResponseType;
import com.capus.securedapi.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.stream.Collectors;

import com.capus.securedapi.entity.ERole;
import jakarta.validation.Valid;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.intercept.AuthorizationFilter;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;


import com.capus.securedapi.entity.Role;
import com.capus.securedapi.entity.User;
import com.capus.securedapi.payload.request.LoginRequest;
import com.capus.securedapi.payload.request.SignupRequest;
import com.capus.securedapi.payload.response.JwtResponse;
import com.capus.securedapi.payload.response.MessageResponse;
import com.capus.securedapi.repository.RoleRepository;
import com.capus.securedapi.repository.UserRepository;
import com.capus.securedapi.security.jwt.JwtUtils;
import com.capus.securedapi.security.services.UserDetailsImpl;
import org.springframework.web.client.RestTemplate;
@Tag(name = "Authentication and admin", description = "Authentication and accounts management APIs")
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth/")
public class AuthController {

  private static final Logger logger = LoggerFactory.getLogger(AuthorizationFilter.class);

  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;


  private UserService userService;

  private static final String GOOGLE_RECAPTCHA_ENDPOINT = "https://www.google.com/recaptcha/api/siteverify";
  @Value("${capus.app.siteSecret}")
  private String siteSecret;

  public AuthController(UserService userService) {
    this.userService = userService;
  }

  @ApiResponses({
          @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
                  schema = @Schema(implementation = JwtResponse.class)) })
  })
  @Operation(
          summary = "Get user details in DB",
          description = "All access allowed.Look for user in DB and return user's details if found",
          tags = { "All access allowed" })
  @PostMapping("signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    List<String> roles = userDetails.getAuthorities().stream()
            .map(item -> item.getAuthority())
            .collect(Collectors.toList());

    return ResponseEntity.ok(new JwtResponse(jwt,
            userDetails.getId(),
            userDetails.getUsername(),
            roles));
  }

  @ApiResponses({
          @ApiResponse(responseCode = "201", description = "User registered successfully!"),
          @ApiResponse(responseCode = "400 a", description = "Error: Username is already taken!"),
          @ApiResponse(responseCode = "400 b", description = "Error: Email is already in use!")
  })
  @Operation(
          summary = "Create a new user with encrypted password in DB",
          description = "All access allowed.User registration will give \"none\" role by default and add user in DB ",
          tags = { "All access allowed" })
  @PostMapping("signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity
              .badRequest()
              .body(new MessageResponse("Error: Username is already taken!"));
    }

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity
              .badRequest()
              .body(new MessageResponse("Error: Email is already in use!"));
    }

    // Create new user's account
    User user = new User(signUpRequest.getUsername(),
            signUpRequest.getEmail(),
            encoder.encode(signUpRequest.getPassword()));

    Set<String> strRoles = signUpRequest.getRole();
    Set<Role> roles = new HashSet<>();

    if (strRoles == null) {
      Role noneRole = roleRepository.findByName(ERole.ROLE_NONE)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(noneRole);
    } else {
      strRoles.forEach(role -> {
        switch (role) {
          case "admin":
            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(adminRole);

            break;
          case "editor":
            Role editorRole = roleRepository.findByName(ERole.ROLE_EDITOR)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(editorRole);

            break;

          case "viewer":
            Role viewerRole = roleRepository.findByName(ERole.ROLE_VIEWER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(viewerRole);

            break;

          default:
            Role noneRole = roleRepository.findByName(ERole.ROLE_NONE)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(noneRole);
        }
      });
    }

    user.setRoles(roles);
    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }

  //GET ALL ACCOUNTS REST API
  @Operation(
          summary = "Get all accounts in DB",
          description = "ONLY FOR ADMINS.",
          tags = { "Admin only" })
  @GetMapping("all")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<List<UserDetailsDto>> getAll() {
    List<UserDetailsDto> user = userService.getAllUsers();
    return ResponseEntity.ok(user);
  }

  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "User deleted successfully!"),
          @ApiResponse(responseCode = "400", description = "Error: No User found!")
  })
  @Operation(
          summary = "Delete account by ID",
          description = "ONLY FOR ADMINS.",
          tags = { "Admin only" })
  @DeleteMapping("{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> deleteUser(@PathVariable Long id) {
    logger.info("delete end point reached");
    logger.info(id.toString());
    if (!userRepository.existsById(id)) {
      return ResponseEntity
              .badRequest()
              .body(new MessageResponse("Error: No User found!"));
    }
    userService.deleteUser(id);
    return ResponseEntity.ok(new MessageResponse("User deleted successfully!"));
  }

  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "User + updatedUser.getRoles().toString() +  updated successfully!"),
          @ApiResponse(responseCode = "400", description = "Error: No User found!")
  })
  @Operation(
          summary = "Update user role by ID",
          description = "ONLY FOR ADMINS.",
          tags = { "Admin only" })
  @PutMapping("{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> updateUserRole(@PathVariable Long id, @RequestBody UserRoleUpdateDto userRoleUpdateDto) {
    logger.info("update end point reached");
    logger.info(id.toString());
    if (!userRepository.existsById(id)) {
      return ResponseEntity
              .badRequest()
              .body(new MessageResponse("Error: No User found!"));
    }

    Set<String> strRoles = userRoleUpdateDto.getRole();
    Set<Role> roles = new HashSet<>();

    if (strRoles == null || strRoles.isEmpty()) {
      Role noneRole = roleRepository.findByName(ERole.ROLE_NONE)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));

      roles.add(noneRole);
    } else {
      strRoles.forEach(role -> {
        switch (role) {
          case "admin":
            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(adminRole);

            break;
          case "editor":
            Role editorRole = roleRepository.findByName(ERole.ROLE_EDITOR)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(editorRole);

            break;

          case "viewer":
            Role viewerRole = roleRepository.findByName(ERole.ROLE_VIEWER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(viewerRole);

            break;

          default:
            Role noneRole = roleRepository.findByName(ERole.ROLE_NONE)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(noneRole);
        }
      });
    }
    User updatedUser = userService.updateUser(id, roles);
    return ResponseEntity.ok(new MessageResponse("User " + updatedUser.getRoles().toString() + " updated successfully!"));
  }

  @Operation(
  summary = "Verify reCaptcha token",
  description = "All access allowed.Send reCaptcha token to google server and returns success: true/false",
  tags = { "All access allowed" })
  @PostMapping("/verify")
  public ResponseEntity<CaptchaResponseType> verifyRecaptcha(@RequestBody CaptchaToken token) {
    RestTemplate restTemplate = new RestTemplate();
    logger.info(token.getToken());
    MultiValueMap<String, String> requestMap = new LinkedMultiValueMap<>();
    requestMap.add("secret", siteSecret);
    requestMap.add("response", token.getToken());

    CaptchaResponseType apiResponse = restTemplate.postForObject(GOOGLE_RECAPTCHA_ENDPOINT, requestMap, CaptchaResponseType.class);
    
    return ResponseEntity.ok(apiResponse);
  }

}