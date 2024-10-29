package com.capus.repository;

import com.capus.entity.Information;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InformationRepository extends JpaRepository<Information, Long> {

}
