package com.capus.securedapi.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.capus.securedapi.dto.InformationDto;
import com.capus.securedapi.dto.UserRoleUpdateDto;
import com.capus.securedapi.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.stream.Collectors;

import com.capus.securedapi.entity.ERole;
import jakarta.validation.Valid;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.intercept.AuthorizationFilter;
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

  public AuthController(UserService userService) {
    this.userService = userService;
  }

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
                         userDetails.getEmail(), 
                         roles));
  }

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
      Role viewerRole = roleRepository.findByName(ERole.ROLE_VIEWER)
          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(viewerRole);
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
        default:
          Role viewerRole = roleRepository.findByName(ERole.ROLE_VIEWER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(viewerRole);
        }
      });
    }

    user.setRoles(roles);
    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }

  //GET ALL ACCOUNTS REST API
  @GetMapping("all")
  // ALL authorized
  public ResponseEntity<List<UserRoleUpdateDto>> getAll() {
    List<UserRoleUpdateDto> user = userService.getAllUsers();
    return ResponseEntity.ok(user);
  }

  @DeleteMapping("{id}")
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

  @PutMapping("{id}")
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

    if (strRoles == null || strRoles.isEmpty() ) {
      Role viewerRole = roleRepository.findByName(ERole.ROLE_VIEWER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(viewerRole);

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
          default:
            Role viewerRole = roleRepository.findByName(ERole.ROLE_VIEWER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(viewerRole);
        }
      });
    }
    UserRoleUpdateDto updatedDto = userService.updateUser(id,roles);
    return ResponseEntity.ok(new MessageResponse("User "+updatedDto.getUsername()+" updated successfully!"));
  }

}
