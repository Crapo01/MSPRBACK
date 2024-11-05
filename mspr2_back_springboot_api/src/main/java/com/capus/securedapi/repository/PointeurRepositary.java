package com.capus.securedapi.repository;

import com.capus.securedapi.entity.Pointeur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PointeurRepositary extends JpaRepository<Pointeur, Long> {
}
