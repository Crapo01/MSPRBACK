package com.capus.securedapi.repository;

import com.capus.securedapi.entity.Information;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InformationRepository extends JpaRepository<Information, Long> {

}
