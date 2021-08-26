package uz.developer.student.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import uz.developer.student.entity.StudentEntity;

import java.awt.print.Pageable;
import java.util.List;

public interface StudentRepositary extends MongoRepository<StudentEntity,String> {

}
