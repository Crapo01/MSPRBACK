package com.capus.repository;

import com.capus.entity.Pointeur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PointeurRepositary extends JpaRepository<Pointeur, Long> {
}