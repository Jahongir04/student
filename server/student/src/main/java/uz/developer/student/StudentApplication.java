package uz.developer.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import uz.developer.student.repository.StudentRepositary;

@SpringBootApplication
public class StudentApplication{

    private final StudentRepositary studentRepositary;

    @Autowired
    public StudentApplication(StudentRepositary studentRepositary) {
        this.studentRepositary = studentRepositary;
    }


    public static void main(String[] args) {
        SpringApplication.run(StudentApplication.class, args);
    }
}
